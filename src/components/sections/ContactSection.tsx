"use client";

import { type FormEvent, useId, useRef, useState } from "react";
import { buildContactPayload, ContactApiError, type ContactFieldErrors, submitContact } from "@/lib/contact-api";
import { useI18n } from "@/components/i18n/LanguageProvider";

const contactEmail = "hello@3mo.studio";
const controlClass = "h-11 w-full border-0 border-b border-[#102511]/25 bg-transparent px-0 text-base text-[#102511] outline-none placeholder:text-[#102511]/45 focus:border-[#315c36] focus:ring-0";
const labelClass = "mb-2 block text-[11px] uppercase tracking-[0.12em] text-[#102511]/75";

export default function ContactSection() {
  const { t, locale } = useI18n();
  const id = useId();
  const submittingRef = useRef(false);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  function fieldErrorText(message: string) {
    const translated = t(message);
    return locale === "ar" && translated === message && !/[\u0600-\u06ff]/.test(message)
      ? t("Please check this field.")
      : translated;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    const form = event.currentTarget;
    submittingRef.current = true;
    setFieldErrors({});
    setStatus("submitting");
    setStatusMessage("Sending your inquiry…");
    try {
      const payload = buildContactPayload(new FormData(form));
      await submitContact(payload);
      form.reset();
      setStatus("success");
      setStatusMessage("Your inquiry has been received. Thank you for getting in touch with 3Mo.");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (error) {
      const apiError = error instanceof ContactApiError ? error : new ContactApiError("Something went wrong. Please try again later.");
      setFieldErrors(apiError.fieldErrors);
      setStatus("error");
      setStatusMessage(apiError.message);
      const field = Object.keys(apiError.fieldErrors)[0];
      requestAnimationFrame(() => {
        if (field) (form.elements.namedItem(field) as HTMLElement | null)?.focus();
        else statusRef.current?.focus();
      });
    } finally {
      submittingRef.current = false;
    }
  }

  function handleInput() {
    if (submittingRef.current) return;
    setFieldErrors({});
    setStatus("idle");
    setStatusMessage("");
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#f3f0e7] px-6 py-8 text-[#102511] sm:px-10 sm:py-10 lg:px-[clamp(48px,7vw,112px)] lg:py-12">
      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1800px] grid-cols-1 items-center gap-12 sm:min-h-[calc(100svh-5rem)] lg:grid-cols-2 lg:gap-[8vw]">
        <div className="max-w-[560px]">
          <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-[#58844d] sm:text-[10px]">{t("FOR THE NEXT GOOD THING")}</p>
          <h2 id="contact-title" className="max-w-[560px] text-[clamp(40px,5.2vw,76px)] font-semibold leading-[1.02] tracking-[-0.035em]">
            {t("Together, let's shape")}<br /><span className="font-medium text-[#315c36]">{t("what comes next.")}</span>
          </h2>

          <form onSubmit={handleSubmit} onInput={handleInput} className="mt-8 space-y-5 sm:mt-10" aria-busy={status === "submitting"}>
            <fieldset disabled={status === "submitting"} className="min-w-0 space-y-5 disabled:opacity-70">
              <legend className="sr-only">{t("Project inquiry details")}</legend>
              <label className="block">
                <span className={labelClass}>{t("Project type")}</span>
                <select name="projectType" defaultValue="" required aria-invalid={!!fieldErrors.projectType} aria-describedby={fieldErrors.projectType ? `${id}-project-error` : undefined} className={`${controlClass} appearance-none border-[#102511]/45`}>
                  <option value="" disabled>{t("Select a service")}</option>
                  <option value="Marketing & Ads">{t("Marketing & Ads")}</option><option value="Brand Identity">{t("Brand Identity")}</option><option value="Web & E-commerce">{t("Web & E-commerce")}</option><option value="Mobile Apps">{t("Mobile Apps")}</option><option value="Custom Software">{t("Custom Software")}</option><option value="ERP & Integrations">{t("ERP & Integrations")}</option><option value="Something else">{t("Something else")}</option>
                </select>
                {fieldErrors.projectType && <span id={`${id}-project-error`} className="mt-2 block text-sm text-red-800">{fieldErrorText(fieldErrors.projectType)}</span>}
              </label>
              <label className="block">
                <span className={labelClass}>{t("Name")}</span>
                <input name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder={t("Your name")} aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? `${id}-name-error` : undefined} className={controlClass} />
                {fieldErrors.name && <span id={`${id}-name-error`} className="mt-2 block text-sm text-red-800">{fieldErrorText(fieldErrors.name)}</span>}
              </label>
              <label className="block">
                <span className={labelClass}>{t("Email address")}</span>
                <input name="email" type="email" autoComplete="email" required maxLength={150} dir="ltr" placeholder={t("you@company.com")} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? `${id}-email-error` : undefined} className={`${controlClass} text-start`} />
                {fieldErrors.email && <span id={`${id}-email-error`} className="mt-2 block text-sm text-red-800">{fieldErrorText(fieldErrors.email)}</span>}
              </label>
              <label className="block">
                <span className={labelClass}>{t("Tell us about it")}</span>
                <textarea name="message" required minLength={5} maxLength={2000} rows={4} placeholder={t("A little about your idea, timeline, or goals...")} aria-invalid={!!fieldErrors.message} aria-describedby={`${id}-message-help${fieldErrors.message ? ` ${id}-message-error` : ""}`} className="mt-1 block w-full resize-y border-0 border-b border-[#102511]/25 bg-transparent px-0 py-2 text-base leading-relaxed text-[#102511] outline-none placeholder:text-[#102511]/45 focus:border-[#315c36] focus:ring-0" />
                <span id={`${id}-message-help`} className="mt-2 block text-xs text-[#102511]/65">{t("5–2,000 characters.")}</span>
                {fieldErrors.message && <span id={`${id}-message-error`} className="mt-2 block text-sm text-red-800">{fieldErrorText(fieldErrors.message)}</span>}
              </label>
              <div className="absolute -left-[10000px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
                <label>{t("Leave this field empty")}<input name="website" type="text" autoComplete="off" tabIndex={-1} maxLength={200} /></label>
              </div>
              <button type="submit" disabled={status === "submitting"} className="inline-flex min-h-11 items-center gap-4 bg-[#102511] px-5 py-3 text-[11px] uppercase tracking-[0.15em] text-[#f3f0e7] transition-colors hover:bg-[#315c36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#71bc70] disabled:cursor-wait disabled:opacity-60">
                {status === "submitting" ? t("Sending…") : t("Send inquiry")}<span aria-hidden="true" className="text-sm">↗</span>
              </button>
            </fieldset>
            <p ref={statusRef} tabIndex={-1} role={status === "error" ? "alert" : "status"} aria-live={status === "error" ? "assertive" : "polite"} aria-atomic="true" className={`min-h-5 text-sm leading-relaxed ${status === "error" ? "text-red-800" : "text-[#315c36]"}`}>{t(statusMessage)}</p>
          </form>
        </div>
        <aside className="relative pt-1 lg:pt-[clamp(36px,8vh,100px)]">
          <p className="mb-5 text-[11px] uppercase tracking-[0.16em] text-[#102511]/60 sm:text-[10px]">{t("HAVE A PROJECT IN MIND?")}</p>
          <a href={`mailto:${contactEmail}`} className="group inline-flex max-w-full items-start gap-3 text-[clamp(29px,5.1vw,72px)] font-medium leading-[1.02] tracking-[-0.035em] text-[#102511] transition-colors hover:text-[#315c36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c36]">
            {t("Let's talk")}<span aria-hidden="true" className="mt-[0.08em] inline-block text-[0.76em] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </a>
          <p className="mt-5 max-w-[240px] text-[11px] uppercase leading-[1.6] tracking-[0.08em] text-[#102511]/65 sm:text-[10px]">{t("FOR COLLABORATIONS, NEW PROJECTS, OR ANY OTHER INQUIRIES.")}</p>
          <div aria-hidden="true" className={`mt-12 hidden h-px w-full origin-left rotate-[-7deg] bg-[#315c36]/70 lg:block ${locale === "ar" ? "translate-y-6" : ""}`} />
          <p className="mt-9 max-w-[300px] text-[14px] leading-relaxed text-[#102511]/65 sm:text-[15px] lg:mt-16">{t("Good things start with a conversation. Tell us what you're building, and we'll help find the right way forward.")}</p>
        </aside>
      </div>
    </section>
  );
}
