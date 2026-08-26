# JVF HomeWorks Pro launch-readiness checklist

This checklist is for a future public release. The current site is a local demo and must not be deployed or used to collect real customer requests yet.

## Hard launch gates

- [ ] Replace `CONTACT_DELIVERY_MODE=demo` with a production delivery mode and a real monitored JVF business inbox.
- [ ] Implement the production `QuoteDelivery` adapter without placing secrets in browser code or source control.
- [ ] Test successful delivery, provider rejection, timeout, retry, and duplicate-submission handling.
- [ ] Prove with an automated failure-path test that the website never shows a success message when delivery fails.
- [ ] Configure the sending domain, SPF, DKIM, DMARC, and provider suppression/bounce handling.
- [ ] Confirm someone owns the response workflow, notification coverage, and urgent interpreting callback process.
- [ ] Do not deploy until every item above is complete.

## Business identity and content

- [ ] Confirm that `JVF HomeWorks Pro` is the final public name and complete Ohio name-availability and trademark review; the website does not claim that the name is registered.
- [ ] Confirm continued ownership of `jvfhomeworkspro.com` before updating canonical URLs, structured data, sitemap, and environment settings.
- [x] Migrate the owner-identified horizontal logo from the existing JVF website.
- [ ] Provide a square favicon and one-color logo variation.
- [x] Migrate selected owner-identified images from the existing JVF website and add localized alternative text.
- [ ] Provide an owner portrait and confirm permission and context for every additional image before publication.
- [ ] Approve the owner name, story, qualifications, and claims.
- [ ] Add reviews only with the customer's permission and exact, verifiable wording. Do not fabricate or imply that stock imagery shows JVF work.
- [ ] Have a fluent owner or professional reviewer approve every Spanish page, form label, legal page, and confirmation message.

## Ohio LLC and address decision

- [ ] Consult the Ohio Secretary of State resources and, when needed, an Ohio attorney or qualified filing professional before filing.
- [ ] Select a real statutory agent who is eligible and has an eligible Ohio street address. The owner must authorize its use.
- [ ] Do not use a made-up address, P.O. box, rented private mailbox/CMRA, or an address found online merely to complete the filing.
- [ ] Verify that JVF is authorized to publish and receive mail at `2590 Walnut St, Denver, CO 80205`, which was migrated from the existing public website.
- [ ] Decide whether the Denver address is only a mailing address. It is not represented by this project as an Ohio statutory-agent address, storefront, or customer service location.
- [ ] Update or remove the public mailing address immediately if verification fails; a statutory-agent address is not automatically the right public customer address.

Current official Ohio guidance says an entity must maintain a statutory agent. An individual agent must be an Ohio resident; an entity agent must qualify and have an Ohio business address. The agent address must be an Ohio street address such as the agent's primary residence or usual place of business, with an authorized person available during normal hours; a P.O. box or private mailbox/CMRA is not allowed. Review the [Ohio Secretary of State business FAQ](https://www.ohiosos.gov/business/ohio-business-roadmap/frequently-asked-questions) and the current [Ohio LLC filing instructions](https://www.ohiosos.gov/globalassets/business/forms/610_instructions.pdf). This is launch guidance, not legal advice.

## Google Business Profile

- [ ] Create or claim a profile only after the public name, phone, service area, ownership, and eligible real-world base are confirmed.
- [ ] If customers are not received at the base, configure JVF as a service-area business and hide the street address from the public profile.
- [ ] Do not use a virtual office merely to obtain a Google listing. A displayed storefront must be a real, staffed, customer-facing location with qualifying signage during stated hours.
- [ ] Define only service areas JVF can realistically serve and keep business hours consistent with the website.

Google specifically identifies cleaning services as service-area businesses and directs businesses that do not receive customers at their address to remove the public address and show the service area instead. Review Google's current [Business Profile representation guidelines](https://support.google.com/business/answer/3038177) and [service-area guidance](https://support.google.com/business/answer/9157481) before verification.

## Service and legal review

- [ ] Verify the owner's active Ohio notary commission and approved public wording before launch.
- [ ] Confirm that `$5 per in-person notarial act` remains accurate; confirm how travel fees are calculated, quoted, and accepted.
- [ ] Confirm that no wording implies legal advice, document selection, certified interpreting, licensed interior design, remote online notarization, or guaranteed availability.
- [ ] Confirm the service area, ordinary cleaning/decoration hours, appointment policy, cancellations, travel rules, and excluded work.
- [ ] Confirm that the migrated starting rates remain current: housekeeping $39/hour, remodeling $59/hour, and decoration $59/hour.
- [ ] Confirm interpreting operations: virtual/phone/Zoom requests are accepted 24/7; in-person interpreting is offered only from 8:00 a.m. to 6:00 p.m. Eastern Time; after 6:00 p.m. service is virtual only.
- [ ] Have qualified counsel review the Terms, Privacy Notice, accessibility language, form consent, business claims, and intended customer-data handling.
- [ ] Review the accessibility-demand letter with qualified counsel, calendar every response deadline, and preserve the letter plus remediation/QA records.

## Accessibility and content QA

- [ ] Keep semantic HTML, keyboard operation, visible focus, skip navigation, text alternatives, error-summary links, status announcements, reduced-motion support, and 320 px reflow intact when editing.
- [ ] Complete the human checks listed in `docs/qa/accessibility-manual-checks.md`, including Safari at 200% zoom and Safari with VoiceOver.
- [ ] Test with voice control or switch control and, where possible, people with disabilities.
- [ ] Commission an independent accessibility audit before launch and remediate reported issues.
- [ ] Recheck contrast and alternative text after final logo and photographs are installed.
- [ ] Keep an accessible contact path available for reporting barriers and establish a response/remediation process.

Automated results help prevent regressions, but they do not establish legal compliance or replace disabled-user testing, a professional accessibility audit, or legal advice.

## Hosting, security, and operations

- [ ] Obtain owner approval before connecting the repository, domain, or account to Vercel.
- [ ] Use a production-capable Vercel plan appropriate for a commercial business and confirm current pricing and limits at setup time.
- [ ] Configure separate local, preview/staging, and production environments; scope secrets to the minimum environment and rotate test credentials.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin and verify canonical URLs, sitemap, robots file, English/Spanish alternates, metadata, and structured data.
- [ ] Configure a Vercel Firewall/WAF rule for the contact POST endpoint. Begin in log-only mode, review normal traffic, then rate-limit repeated requests from the same IP without blocking ordinary customers or assistive technology.
- [ ] Keep server logs free of form values. Set retention, access control, incident response, and deletion expectations before accepting personal information.
- [ ] Add spam protection that remains keyboard- and screen-reader-accessible; provide a usable fallback when protection fails.
- [ ] Add privacy-respecting production monitoring for availability, form-delivery failures, and elevated rejection/rate-limit rates. Do not place customer messages in analytics.
- [ ] Verify custom 404/error behavior, provider outage messaging, slow-network behavior, and direct phone/text fallbacks.
- [ ] Back up configuration and document who can access the domain, hosting, email provider, analytics, and Google Business Profile.

## Release acceptance

- [ ] Run `npm run check --prefix web` with no failures.
- [ ] Run `npm run test:e2e --prefix web` with no failures against the release candidate.
- [ ] Complete a production Lighthouse review on representative English and Spanish pages.
- [ ] Review every page on desktop and mobile, then complete one real test request per service through the monitored inbox.
- [ ] Obtain final owner sign-off on appearance, bilingual content, pricing, hours, privacy, legal language, accessibility, and contact delivery.
- [ ] Record the production URL, release date, responsible owner, and rollback procedure.
