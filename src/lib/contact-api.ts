export type ContactField = "name" | "email" | "message" | "projectType";
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  subject: string;
  extra: { projectType: string };
  website: string;
};

export class ContactApiError extends Error {
  constructor(message: string, public readonly fieldErrors: ContactFieldErrors = {}) {
    super(message);
    this.name = "ContactApiError";
  }
}

export function contactEndpoint(
  base = process.env.NEXT_PUBLIC_CONTACT_API_URL || "http://localhost:5000/api",
  siteKey = process.env.NEXT_PUBLIC_CONTACT_SITE_KEY || "3mo",
): string {
  if (!/^[a-z0-9-]+$/.test(siteKey)) throw new ContactApiError("The contact site key is not configured correctly.");
  try {
    const url = new URL(base.trim());
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
      throw new Error("Invalid contact API URL");
    }
    return `${url.toString().replace(/\/+$/, "")}/contact/${siteKey}`;
  } catch {
    throw new ContactApiError("The contact API URL is not configured correctly.");
  }
}

export function buildContactPayload(formData: FormData): ContactPayload {
  const value = (name: string) => String(formData.get(name) ?? "").trim();
  const name = value("name");
  const email = value("email");
  const message = value("message");
  const projectType = value("projectType");
  const errors: ContactFieldErrors = {};
  if (name.length < 2 || name.length > 100) errors.name = "Use a name between 2 and 100 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 150) errors.email = "Enter a valid email address (up to 150 characters).";
  if (message.length < 5 || message.length > 2000) errors.message = "Your message must be between 5 and 2,000 characters.";
  if (!projectType || projectType.length > 80) errors.projectType = "Please choose a project type.";
  if (Object.keys(errors).length) throw new ContactApiError("Please check the highlighted fields.", errors);
  return {
    name,
    email,
    message,
    subject: `New project inquiry — ${projectType}`,
    extra: { projectType },
    website: value("website"),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseFieldErrors(body: unknown): ContactFieldErrors {
  const result: ContactFieldErrors = {};
  if (!isRecord(body) || !Array.isArray(body.errors)) return result;
  for (const error of body.errors) {
    if (!isRecord(error) || typeof error.field !== "string" || typeof error.message !== "string") continue;
    const field = error.field === "extra.projectType" || error.field === "subject" ? "projectType" : error.field;
    if (["name", "email", "message", "projectType"].includes(field)) result[field as ContactField] = error.message;
  }
  return result;
}

export async function submitContact(payload: ContactPayload, endpoint = contactEndpoint()): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      credentials: "omit",
      cache: "no-store",
    });
    const body: unknown = await response.json().catch(() => null);
    if (response.ok && isRecord(body) && body.success === true) return;
    if (response.status === 400) throw new ContactApiError("Please check the highlighted fields and try again.", parseFieldErrors(body));
    if (response.status === 403) throw new ContactApiError("This website is not allowed by the contact server yet. Please check the site's allowed origins.");
    if (response.status === 404) throw new ContactApiError("The contact service for 3Mo is not configured yet. Please check the site key and API URL.");
    if (response.status === 429) throw new ContactApiError("Too many messages have been sent. Please wait 15 minutes before trying again.");
    throw new ContactApiError("The server could not confirm your message. Please try again later.");
  } catch (error) {
    if (error instanceof ContactApiError) throw error;
    if (controller.signal.aborted) throw new ContactApiError("We could not confirm receipt in time. Check your connection before trying again.");
    throw new ContactApiError("Could not reach the contact server. For local testing, make sure the backend is running and CORS allows this website.");
  } finally {
    clearTimeout(timeout);
  }
}
