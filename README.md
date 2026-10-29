# 3Mo — Creative Technology Studio

**Three minds. One direction.**

A creative studio website that brings strategy, branding, marketing, and digital development together through a cinematic introduction and a focused portfolio experience.

Built with Next.js, React, and TypeScript, the project combines responsive layouts, interactive motion, search-friendly static pages, and contact form integration with a separate Contact Hub backend.

## Project Highlights

The homepage opens with a four-scene introduction:

**Origin → Signal → Field Kit → Closing Frame**

Visitors can skip or replay the introduction, explore the 3Mo method and services, browse selected work, and submit a project inquiry.

The projects page includes category filters and reuses the homepage navigation: the 3Mo logo on the left and the menu toggle on the right.

The entire site uses the natural **DM Sans** typeface for a consistent visual identity.

The “From idea to impact” section extends the video's background with a gradient sampled from the video itself. Soft edge blending removes the previous visible circular boundary while preserving the original animation.

## Technology Stack

| Technology | Purpose |
| --- | --- |
| Next.js 15 — App Router | Routing, metadata, and static HTML generation |
| React 19 | Interactive components and form state |
| TypeScript | Type-safe application code |
| Tailwind CSS | Styling and responsive layouts |
| GSAP | Hero animation and scene transitions |
| Contact Hub API | Contact submission, database storage, and email forwarding |

The frontend is configured with `output: "export"`. It can be hosted as a static website; contact requests are sent directly to the separately hosted backend.

## Pages

| Route | Content |
| --- | --- |
| `/` | Introduction, studio overview, method, services, selected work, and contact form |
| `/projects/` | Filterable portfolio gallery |
| `/contact/` | Dedicated project inquiry page |

The build also generates `robots.txt`, `sitemap.xml`, and a custom `404.html` page.

## Getting Started

### Requirements

Use **Node.js 22 or later** and **pnpm 11.25.0** for the frontend.

The Contact Hub backend requires Node.js, MongoDB, and SMTP credentials.

### Install the Frontend

Run these commands from the frontend repository root:

```bash
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile
cp .env.example .env.local
```

On Windows, you can copy `.env.example` to `.env.local` using your editor or file manager.

### Configure the Frontend

Edit `.env.local` to connect to the backend on **port 4000**:

```dotenv
NEXT_PUBLIC_CONTACT_API_URL=http://localhost:4000/api
NEXT_PUBLIC_CONTACT_SITE_KEY=3mo
NEXT_PUBLIC_SITE_URL=
```

`NEXT_PUBLIC_CONTACT_API_URL` is the API base URL **including `/api`**, not the complete contact endpoint.

With these values, the form submits to:

```text
POST http://localhost:4000/api/contact/3mo
```

Keep `NEXT_PUBLIC_SITE_URL` empty during local development. Before deployment, set it to the real frontend origin to enable canonical URLs, absolute social metadata, and sitemap entries.

> Set the API URL explicitly. Earlier project defaults and `.env.example` files use port 5000; the configuration above overrides them with port 4000 without changing the form component.

### Start the Frontend

```bash
pnpm dev
```

Open **http://localhost:3000**.

Restart the development server after changing environment variables.

## Contact Hub Backend

The frontend integrates with [Contact Hub Backend](https://github.com/Mohamed-Samy199/contact-hub-backend ), a separate Express application using Mongoose, Joi, and Nodemailer.

### Install the Backend

From the backend repository root:

```bash
npm ci
cp .env.example .env
```

### Configure the Backend

Edit the backend `.env` file:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/contact-hub
EMAIL_USER=your-gmail-account@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=4000
NODE_ENV=development
```

Replace the email placeholders with real credentials.

Use a Gmail **App Password**, not the account's regular password. Start MongoDB before seeding or running the API.

### Allow the Frontend Origin

In `src/sites.seed.js`, ensure that the existing `3mo` site allows the frontend origins:

```js
allowedOrigins: [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]
```

Keep the site's existing `receiverEmail` unless you intentionally want to change the destination inbox.

Apply site configuration updates and start the backend:

```bash
npm run seed
npm run dev
```

Verify the API is available at:

```text
http://localhost:4000/api/health
```

> CORS must allow the **frontend origin on port 3000**, not the backend origin on port 4000.

> A GitHub repository URL is not an API URL. If you are using the original backend repository, apply `backend-3mo.patch` or make the site configuration changes above. The included backend updates were not pushed to the remote repository.

### Form Contract

The contact form sends JSON to `/api/contact/3mo`:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Tell us about your project and goals.",
  "subject": "New project inquiry — Brand Identity",
  "extra": {
    "projectType": "Brand Identity"
  },
  "website": ""
}
```

The Budget field has been removed. Project type is stored in `extra.projectType`, while `website` is an empty honeypot field for spam protection.

The form validates:

| Field | Validation |
| --- | --- |
| Name | Between 2 and 100 characters |
| Email | Valid email address, up to 150 characters |
| Message | Between 5 and 2,000 characters |
| Project type | Required selection |
| Website | Must remain empty |

Repeated submissions are disabled while a request is pending. The form displays submission, success, and error states.

Failed requests preserve the visitor's input and are not retried automatically.

A successful response means that the backend accepted the inquiry. Contact Hub saves messages before forwarding email. SMTP failures can still return HTTP 201 while recording `emailStatus: "failed"`.

The frontend does not claim that an email has been delivered.

## SEO, Accessibility, and Performance

### SEO

Each public page is exported as meaningful HTML with a page-specific title and description, one primary H1, social metadata, and relevant JSON-LD.

Canonical URLs, absolute social image URLs, and populated sitemap entries depend on a valid `NEXT_PUBLIC_SITE_URL`.

The missing-page view is marked `noindex`.

### Accessibility and Responsive Design

Navigation and detail dialogs support Escape, focus trapping, focus restoration, and background scroll locking.

Motion respects reduced-motion preferences.

Responsive refinements cover small-screen typography, touch targets, form fields, and navigation spacing.

### Performance

Unused components and media have been removed, and selected images have been converted to WebP.

Video posters are derived from the original videos. The interactive mascot video is loaded near its section rather than immediately on page load.

These improvements provide a sound technical foundation for discoverability and usability. They do not guarantee search rankings or a specific performance score.

## Project Structure

```text
src/
├── app/                   # Pages, layout, metadata, robots, sitemap, and 404
├── components/
│   ├── scenes/            # Four-scene introduction and video components
│   ├── sections/          # Studio, method, services, projects, and contact
│   ├── transitions/       # Scene transitions
│   └── ui/                # Shared logo and navigation
├── config/                # Scene asset configuration
├── hooks/                 # Animation, video interaction, and dialog focus
└── lib/                   # Project data, SEO helpers, and contact API client
public/                    # Active images, video assets, and route manifest
scripts/serve.mjs          # Local server for the exported production site
```

The removed `scene-04-robots` is no longer part of the hero.

The filename `scene-05-closing-robot.mp4` is retained for the fourth, closing scene.

`scene-06.mp4` belongs to the method section and is not an additional hero scene.

## Available Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the frontend development server |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm lint` | Run ESLint |
| `pnpm check` | Run TypeScript and ESLint checks together |
| `pnpm build` | Generate the production export in `out/` |
| `pnpm start` | Serve the existing production export locally |

Run `pnpm build` before `pnpm start`.

The included static server supports missing-page responses and video Range requests. Its port can be configured through `PORT`.

## Deployment

### Configure Production Environment Variables

Before building for production, replace local settings with your real HTTPS domains:

```dotenv
NEXT_PUBLIC_CONTACT_API_URL=https://api.example.com/api
NEXT_PUBLIC_CONTACT_SITE_KEY=3mo
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

The domains above are placeholders.

Add the actual frontend origin to the backend's `3mo.allowedOrigins`, rerun the seed, and configure MongoDB and SMTP on the backend host.

### Build the Frontend

```bash
pnpm check
pnpm build
```

Deploy **`out/`** to a static hosting provider.

Preserve the exported directory structure and return HTTP 404 with `404.html` for missing routes instead of redirecting every request to the homepage.

### Important Deployment Notes

`NEXT_PUBLIC_*` values are embedded in the frontend during the build.

Changing environment values after uploading `out/` will not update the deployed JavaScript. Rebuild and redeploy after changing API or site URLs.

Use HTTPS for both services in production.

Do not deploy with a `localhost` API URL: it points to each visitor's own device.

Phone testing on a local network similarly requires a reachable machine address and the corresponding explicit CORS origin.

## Security and Validation Notes

MongoDB credentials and SMTP passwords belong only in the backend `.env`.

Never put secrets in `NEXT_PUBLIC_*` variables or commit real environment files.

Keep explicit CORS origins, input validation, the honeypot, and rate limits enabled.

TypeScript, ESLint, and production builds passed for the updated frontend.

Contact requests, validation responses, CORS rejection, the honeypot, and rate limiting were checked using the real backend routes with isolated persistence and mail adapters.

These tests did **not** verify a live MongoDB deployment or real SMTP delivery. Verify both with your own configuration before launch.

## Additional Documentation

Further implementation details are available in:

- `CONTACT_SETUP.md` — Local integration and hosting configuration.
- `CHANGELOG.md` — Summary of project updates.
- `VALIDATION.md` — Validation results and testing limitations.
