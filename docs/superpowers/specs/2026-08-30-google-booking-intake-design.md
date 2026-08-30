# JVF Services Google Booking and Intake Design

Date: 2026-08-30
Status: Approved direction; awaiting Google account setup details

## Objective

Add an accessible, low-cost workflow that lets visitors submit a service request and book a confirmed phone consultation. Google owns the form responses and calendar appointments; the existing Next.js website on Vercel presents the customer-facing experience.

## Scope

### Included

- One bilingual Google service-request form owned by `services.jvf@gmail.com`.
- One Google Calendar appointment schedule for a 15-minute JVF Services phone consultation.
- Google Sheets as the response destination for the intake form.
- English and Spanish website entry points, embedded experiences, and direct-link fallbacks.
- Clear separation between an unconfirmed service request and a confirmed calendar appointment.
- Privacy, accessibility, error, and manual-contact fallbacks.

### Excluded from the first release

- A custom calendar UI or direct Google Calendar API integration.
- Automatic creation of confirmed calendar events from Google Form submissions.
- Online payments, customer accounts, document uploads, or storage of sensitive documents.
- Separate booking schedules for every service.
- Microsoft Bookings unless JVF Services later chooses Microsoft 365 as its primary calendar platform.

## Product Rules

- Google Calendar is the source of truth for confirmed appointments.
- Google Forms and its linked Sheet are the source of truth for service requests.
- Submitting a form does not reserve a time.
- A time is reserved only after the customer completes the Google Calendar booking flow.
- The form must not request identification numbers, medical records, financial account information, confidential legal details, or document uploads.
- In-person interpretation is available only through 6 PM Eastern Time. After 6 PM, interpretation is phone or virtual only.
- The single free booking schedule is a phone consultation. Service work that requires pricing, travel, or scope review remains a request until JVF Services confirms it.

## Customer Journeys

### Request service

1. The visitor selects Request Service in English or Spanish.
2. The website explains that the form is a request and not a confirmed appointment.
3. The visitor completes the bilingual Google Form.
4. Google saves the response to the linked Google Sheet.
5. The visitor sees a confirmation message with clear next steps and a link to book a phone consultation if desired.
6. JVF Services reviews the request and contacts the customer.

### Book a consultation

1. The visitor selects Book Appointment.
2. The website explains the purpose, duration, meeting method, time zone behavior, and privacy expectations.
3. The visitor uses the embedded Google appointment schedule or its direct-link fallback.
4. Google shows only available times and collects the required booking information.
5. Google creates the event on the JVF Services calendar and sends confirmation information.
6. The appointment appears in the calendar owned by `services.jvf@gmail.com`.

## Form Design

The Google Form uses bilingual labels and service-based sections while keeping one response destination. It collects:

- Name
- Phone number
- Email address
- Preferred language
- Requested service
- City and ZIP code
- Preferred date and time
- Phone, virtual, or in-person preference when relevant
- Limited service-specific details
- Accessibility accommodation request
- Short non-confidential message
- Privacy acknowledgment

Responses are linked to a Google Sheet. New-response email notifications are enabled for the business owner. Access to the Form, Sheet, and Calendar is limited to authorized business personnel.

## Calendar Design

The first release uses one 15-minute schedule titled `JVF Services — 15-Minute Phone Consultation`. The booking form includes name, email, phone number, requested service, preferred language, and a short non-confidential note. The schedule uses America/New_York as its operating time zone while allowing Google to display appointment times in the visitor's local time zone.

The public Google account name and profile photo must represent JVF Services because Google displays them on the booking page. Buffer time, minimum lead time, maximum advance booking, daily limits, cancellation policy, and exact weekly availability are business settings that JVF Services confirms before publication.

## Website Architecture

The Next.js application receives public Google Form and appointment-schedule URLs or embed snippets as configuration. No Google credential is exposed to the browser, and no Google API secret is required for the first release.

The website adds:

- `/book` and `/es/book` routes.
- Book Appointment links in desktop and mobile navigation.
- A responsive appointment-schedule embed with a direct-link fallback.
- A bilingual service-request form embed or dedicated form route with a direct-link fallback.
- Clear request-versus-booking language.
- Existing phone, text, and email alternatives.

The existing demo-only quote delivery is removed from the public customer path or clearly disabled when the Google workflow launches so visitors never receive a false delivery confirmation.

## Accessibility

- Every iframe has a descriptive title.
- Each embedded experience has a prominent direct-link alternative.
- The surrounding page remains operable by keyboard and screen reader.
- Focus order, focus visibility, text reflow, zoom, mobile layout, error messaging, and reduced-motion behavior are tested.
- Phone and text alternatives remain available for visitors who cannot complete the online flows.
- English and Spanish instructions explain any Google-hosted transition.

## Privacy and Security

- The privacy notice identifies Google Forms, Sheets, and Calendar as service providers used for intake and scheduling.
- Only minimum contact and scheduling information is collected.
- No documents or sensitive case details are accepted.
- The Google account uses a unique password and two-step verification.
- Form, Sheet, and Calendar edit access is restricted to authorized users.
- JVF Services adopts a 12-month default retention period for unneeded intake responses unless legal or operational requirements require a different period.
- Booking-page account name, photo, descriptions, and public fields are reviewed before publication.

## Error Handling

- If an embed is blocked or fails to load, the direct Google link remains usable.
- If Google is unavailable, visitors can call, text, or email JVF Services.
- A form submission never claims that an appointment is confirmed.
- A booking confirmation is shown only by Google after calendar creation succeeds.
- JVF Services performs a daily calendar and response-sheet check during the initial rollout.

## Verification

- Submit English and Spanish test requests and confirm they appear in the Sheet.
- Book, reschedule, and cancel test appointments.
- Verify that busy times and already-booked slots cannot be selected again.
- Verify Eastern Time and a second time zone.
- Test desktop and mobile layouts in current Chrome, Firefox, Safari, and Edge.
- Complete keyboard-only and automated accessibility checks on both language routes.
- Confirm after-hours copy does not imply in-person service after 6 PM.
- Confirm no sensitive form values are sent to Vercel Analytics or application logs.

## Rollout

1. JVF Services creates and secures the Google-owned assets.
2. JVF Services supplies the two direct links and two embed snippets.
3. The website integration is implemented behind a preview deployment.
4. JVF Services completes a real test request and booking in preview.
5. Privacy and accessibility language is reviewed.
6. The integration is deployed to production.
7. The old demo request path is removed or redirected.

## Assumptions

- `services.jvf@gmail.com` is the intended owner account.
- JVF Services wants the zero-additional-cost Google option first.
- A single consultation schedule is acceptable for the first release.
- The website remains hosted on Vercel and deployed from the existing GitHub repository.
- Twelve months is an acceptable initial intake-response retention period, subject to business approval.

## Open Business Settings

- Weekly consultation availability
- Whether the consultation schedule should accept overnight bookings
- Minimum notice before a booking
- Maximum days a customer may book in advance
- Buffer time between consultations
- Cancellation and rescheduling deadline
- Final response-retention period
