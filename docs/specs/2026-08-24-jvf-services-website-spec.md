# JVF Services Website Specification

## Product and audience

JVF Services is a bilingual English/Spanish lead-generation website for Ohio households, small offices, and customers seeking mobile notary or Spanish-English interpreting services. The primary conversion is a request for a personalized quote, with direct call and text actions to `(716) 748-9117` always visible.

The concept must run locally for review before any Vercel project, domain, email provider, Google Business Profile, payment service, or production deployment is connected.

## Brand and experience

- Public brand: `JVF Services`; do not use `JVF HomeWorks Pro` or an `LLC` suffix.
- Visual direction: warm premium, forest green, sage, warm ivory, graphite text, generous whitespace, restrained motion, no blue.
- The supplied JVF flyer is visual inspiration only. Preserve the general home/service/sparkle idea but do not copy the existing logo.
- The supplied proposal contributes applicable scope ideas only. Do not copy its black-and-white visual style, agency details, confidentiality text, prices, timelines, landscaping, remodeling, payment, or admin-dashboard promises.
- The first concept uses explicit asset placeholders with fixed dimensions for the logo, favicon, owner portrait, service photography, and future testimonials. Never present stock imagery or fabricated reviews as JVF work.
- Later content insertion uses structured local content files, not a CMS or authenticated editor.

## Services and operating rules

### Housekeeping

- Homes and small offices.
- Standard, deep, recurring, move-in/move-out, and one-time cleaning may be presented.
- Exclude hazardous and biohazard work.
- Ohio inquiries are accepted case by case; travel feasibility and price are confirmed after inquiry.

### Home decoration

- Residential room styling, decor selection, arrangement, and setup.
- Do not claim licensed interior-design services.
- Do not ask for a budget in the initial form.
- Ohio inquiries are accepted case by case.

### Ohio notary

- Use the phrase `Ohio-commissioned Notary Public` as a user-asserted credential statement.
- In-person service only, by confirmed appointment; do not imply remote-online authorization.
- Public price: `$5 per in-person notarial act; any mobile travel fee is quoted and agreed in advance.`
- Describe the service generally rather than publishing a menu of notarial acts.
- State that the signer must appear in person with acceptable identification and that JVF does not provide legal advice or choose the notarial act for the customer.
- Accept requests 24/7 but confirm the appointment personally.

### Spanish-English interpreting

- Describe the service as professional, not certified.
- Any setting may be considered by request; acceptance depends on suitability and availability.
- In-person interpreting: 8:00 a.m.-6:00 p.m. Eastern Time.
- Phone, Zoom, and other virtual interpreting: available 24/7.
- After 6:00 p.m., only phone/virtual modes may be requested.
- If the line is engaged or unanswered, direct the visitor to text or submit an urgent callback request.

## Information architecture

English uses root URLs; every page has an equivalent Spanish route under `/es` using the same slug structure.

- `/` and `/es`
- `/services` and `/es/services`
- `/services/housekeeping` and `/es/services/housekeeping`
- `/services/home-decoration` and `/es/services/home-decoration`
- `/services/notary` and `/es/services/notary`
- `/services/interpreting` and `/es/services/interpreting`
- `/about` and `/es/about`
- `/contact` and `/es/contact`
- `/terms` and `/es/terms`
- `/privacy` and `/es/privacy`
- `/accessibility` and `/es/accessibility`

The header contains one click- and keyboard-operated Services panel grouped under Home Services and Professional Services. The language switch preserves the equivalent route. Legal and accessibility routes live in the footer.

The About page is owner-led but initially uses explicit fields/placeholders for the owner name, story, portrait, verified qualifications, real reviews, and service photography. Unverified claims and empty testimonials remain hidden.

## Quote and contact flow

All service CTAs lead to the combined Contact/Request a Quote page with the service preselected. The page also exposes tap-to-call and tap-to-text actions.

Every submission requires:

- name
- phone
- email
- page language
- selected service
- city
- ZIP code
- acknowledgement that no documents, identification numbers, medical records, or confidential legal details will be submitted
- an invisible honeypot and form-start timestamp

Service-specific data:

- Housekeeping: home/small office, cleaning type, frequency, desired date, bedrooms/bathrooms for homes or square footage for offices, short non-sensitive note.
- Decoration: rooms/areas, styling goal, desired date, short non-sensitive note; no budget.
- Notary: desired date/time and short non-sensitive note; reinforce in-person-only service and acceptable-ID requirement.
- Interpreting: phone/Zoom/virtual/in-person, Spanish-to-English/English-to-Spanish/both, setting category, urgent/scheduled, desired date/time, expected duration, city/ZIP for in-person work, short non-sensitive note. Reject in-person times outside 8:00 a.m.-6:00 p.m. ET.
- General: contact reason and short non-sensitive note.

No full street addresses, uploads, customer accounts, database records, automated customer emails, or SMS messages are created. The selected production email provider will later receive validated submissions. Until then, demo mode returns realistic success/error states and logs only redacted event metadata (submission id, locale, service, timestamp), never form contents.

If delivery fails, preserve the visitor's entered fields, announce the error in an accessible live region, and show direct call/text actions. Never show success unless the configured delivery adapter reports success.

## Architecture and integrations

- Next.js `16.3.2` App Router, React/React DOM `19.2.8`, strict TypeScript `7.0.2`, Tailwind CSS `4.3.3`.
- Static-first Server Components; Client Components only for navigation disclosures, language switching state, and the dynamic form.
- Structured, type-checked English and Spanish content with parity tests.
- Zod `4.4.3` discriminated-union validation for quote submissions.
- Provider-neutral `QuoteDelivery` interface with a safe demo adapter and an explicitly unconfigured production adapter.
- No authentication, CMS, database, scheduling, pricing calculator, payments, photo storage, service-area page, or deployment in the concept phase.
- Vercel Web Analytics `2.0.1` and platform logs; never send or log form contents to analytics.
- Invisible form defense: server validation, honeypot, minimum completion time, and deployment-time Vercel WAF rate limiting for contact POST traffic. Do not add CAPTCHA/overlay controls unless observed abuse requires an accessible challenge.
- Eventual public hosting requires Vercel Pro; no Vercel project is connected during the concept build.

## Accessibility, privacy, and quality

- WCAG 2.2 Level AA is the engineering target; do not claim guaranteed ADA compliance.
- Standards-first implementation: semantic landmarks/headings, skip link, keyboard-only operation, visible focus, 200% zoom/reflow, screen-reader names/descriptions, accessible errors/status, 44px touch targets where applicable, reduced-motion support, and color contrast that does not depend on color alone.
- No accessibility overlay. Include an Accessibility Statement with phone contact and a future email field.
- Validate with ESLint, TypeScript, unit/component tests, Playwright, Axe, manual keyboard testing, VoiceOver on Safari, responsive review, production build, and Lighthouse.
- Fetch and apply the latest Vercel Web Interface Guidelines to the finished UI; fix findings before handoff.
- Vercel Web Analytics must be disclosed in the Privacy page. Terms, Privacy, and Accessibility copy are concept drafts requiring legal review before public launch.

## Deferred launch inputs and blockers

- Original accessible logo plus favicon source.
- Real owner name/story/portrait, service photos, and approved testimonials.
- Owner approval of all Spanish copy.
- Domain and business email; email provider selection and credentials.
- Ohio business-name availability, LLC formation, valid Ohio statutory agent/address, and any legal review.
- Real operating base for Google Business Profile verification; do not use a fabricated, mailbox, or unstaffed virtual-office address.
- Review of the prior accessibility letter, its deadline, and any counsel-directed remediation or external audit.
- Verification of the active Ohio notary commission and any business insurance/bonding claims before publication.

