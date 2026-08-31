# JVF Services web application

The Next.js application for the JVF Services local-review website.

Run commands from this directory:

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Until the public Google links are configured, the contact and consultation pages show call, text, and email fallbacks instead of pretending a request was submitted.

## Google service requests and consultation booking

Create a bilingual Google Form for service requests and a 15-minute Google Calendar appointment schedule. Then add the two public HTTPS links to local `.env.local` and the Vercel Production environment:

```bash
NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/your-form/viewform
NEXT_PUBLIC_GOOGLE_BOOKING_URL=https://calendar.google.com/calendar/appointments/schedules/your-schedule
```

Redeploy after saving the Vercel variables. These are public destination links, not secrets. The website validates that the form and booking destinations use the expected secure Google domains.

## Google reviews

The home page keeps migrated testimonials labeled as reviews from the previous website. It can also display every review returned by the verified Google Business Profile Reviews API and send visitors to Google to submit a new review.

To enable it:

1. Claim and verify the JVF Services Business Profile in the Google account that will manage it.
2. Request Google Business Profile API access, create OAuth credentials with the `business.manage` scope, and obtain the account ID, location ID, and refresh token.
3. Add the seven `GOOGLE_*` values documented in `.env.example` to Vercel as sensitive Production environment variables, then redeploy.

The OAuth values are read only on the server. Review data is cached for six hours, well under Google's 30-day storage limit. If Google is unavailable or the variables are incomplete, the page safely falls back to the previous-site testimonials.

For complete setup, QA evidence, and public-launch gates, see the [workspace README](../README.md) and [launch checklist](../docs/launch/checklist.md).
