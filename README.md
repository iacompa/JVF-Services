# JVF HomeWorks Pro website

An accessible, bilingual Next.js website for JVF HomeWorks Pro. It presents housekeeping, home remodeling, home decoration, Ohio notary, and Spanish-English interpreting services in English and Spanish, plus an owner-provided project gallery.

The project is a local review build. It is not connected to Vercel, a public domain, a database, or an email provider.

## Start locally

Requirements: Node.js 20 or newer and npm.

```bash
cp web/.env.example web/.env.local
npm install --prefix web
npm run dev --prefix web
```

Open [http://localhost:3000](http://localhost:3000). Spanish pages begin at [http://localhost:3000/es](http://localhost:3000/es).

## Current contact behavior

The request form is intentionally in `demo` delivery mode. Valid submissions receive an on-screen demo confirmation, but no email is sent and no customer record is stored. Server logs contain only redacted operational metadata: a generated submission ID, service type, locale, submission time, and field names. They do not contain customer field values or message text.

Do not deploy this build as a live customer intake site. A real business inbox and production `QuoteDelivery` adapter must be added first, including a failure-path test proving that a delivery failure never displays a success message.

## Quality commands

```bash
npm run check --prefix web
npm run test:e2e --prefix web
```

The current automated results and the human accessibility checks still required before launch are documented in [docs/qa/automated-results.md](docs/qa/automated-results.md) and [docs/qa/accessibility-manual-checks.md](docs/qa/accessibility-manual-checks.md).

## Project notes

- The source lives in `web/` and uses the Next.js App Router, React, and TypeScript.
- English pages use root routes; Spanish equivalents use `/es`.
- The public phone number is `(716) 748-9117`.
- The phone, email, mailing address, logo, selected photos, service descriptions, and starting prices were migrated from the owner-identified existing website. The Denver mailing address still requires separate verification before it is used for an Ohio filing or Google Business Profile.
- The final favicon, owner story, qualifications, any additional photographs, and reviews are still required.
- Deployment to Vercel is explicitly deferred until the owner approves the local experience and completes the launch checklist.
