# JVF Services Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Design, build, verify, and run a polished bilingual JVF Services lead-generation website locally without connecting production hosting, a domain, or a real email provider.

> **Execution amendment — 2026-08-25:** At the user's direction, Superdesign is removed from this implementation. Tasks 1-2 are superseded and require no external design approval. The product specification, the supplied flyer as loose visual inspiration, and the locked warm-premium design tokens below are the visual source of truth. Implementation proceeds directly under the executing-plans workflow.

> **Toolchain compatibility note — 2026-08-25:** TypeScript 7.0 ships without the compiler API required by `typescript-eslint`. Keep the pinned TypeScript 7.0.2 CLI as `@typescript/native` and install Microsoft's `@typescript/typescript6` compatibility package under the `typescript` alias for ESLint, following Microsoft's documented side-by-side configuration. `npm run typecheck` invokes the TypeScript 7 `tsc` binary; Next's build uses the TypeScript 6 API via `experimental.useTypeScriptCli: false`. Local production builds use Next's documented `--webpack` option because this managed sandbox blocks the ephemeral worker port Turbopack uses while processing CSS.

> **Lint compatibility note — 2026-08-25:** `eslint-config-next@16.3.2` bundles React lint plugins that fail under ESLint 10.9.1. Pin ESLint 9.39.5 until the bundled plugins support ESLint 10; Next.js 16 uses the direct ESLint CLI and flat configuration with this compatible version.

**Architecture:** Implement a static-first Next.js App Router application under `web/` from the approved product specification and locked design system. English and Spanish pages share typed content and page templates; a discriminated-union quote form submits to a provider-neutral delivery interface that runs in safe demo mode until launch configuration exists.

**Tech Stack:** Next.js 16.3.2, React 19.2.8, TypeScript 7.0.2, Tailwind CSS 4.3.3, Zod 4.4.3, Vercel Web Analytics 2.0.1, Vitest 4.1.11, Testing Library 16.3.2, Playwright 1.62.1, Axe 4.13.0, Lighthouse 13.4.1.

**Spec:** `docs/specs/2026-08-24-jvf-services-website-spec.md`

## Global Constraints

- Public name is exactly `JVF Services`; do not use `JVF HomeWorks Pro` or an `LLC` suffix.
- Public phone/text number is exactly `(716) 748-9117`.
- No blue; use the approved forest-green, sage, ivory, and graphite design system.
- English uses root routes and Spanish mirrors use `/es` with the same slugs.
- No production deployment, domain, email provider, database, authentication, CMS, scheduling, payments, uploads, or customer auto-replies in this implementation.
- Do not publish a street address, fabricated review, stock photo presented as JVF work, unverified credential, or certified-interpreter claim.
- Notary is in-person only, by appointment, at `$5 per in-person notarial act` plus a travel fee agreed in advance.
- Interpreting is in person from 8:00 a.m.-6:00 p.m. ET and phone/virtual 24/7; after 6:00 p.m. ET, in-person requests are invalid.
- WCAG 2.2 AA is an engineering target; do not claim guaranteed ADA compliance.
- The approved product specification and this plan's locked design tokens are the visual source of truth. Superdesign is explicitly out of scope for this execution.

---

## Planned file structure

```text
.
├── .superdesign/
│   ├── design-system.md
│   └── resume.json
├── docs/
│   ├── brand/logo-generation-prompt.md
│   ├── launch/checklist.md
│   ├── qa/accessibility-manual-checks.md
│   ├── specs/2026-08-24-jvf-services-website-spec.md
│   └── superpowers/plans/2026-08-24-jvf-services-website.md
└── web/
    ├── public/assets/README.md
    ├── src/app/                         # English routes and /es mirrors
    ├── src/components/layout/           # Header, menus, footer, language switcher
    ├── src/components/ui/               # Buttons, cards, asset slots, form fields
    ├── src/content/                     # Typed English/Spanish copy and business facts
    ├── src/features/contact/            # Schema, field configuration, form, server action
    ├── src/features/pages/              # Shared page templates
    ├── src/lib/                         # Routes, locale helpers, metadata, logging
    └── tests/                           # Unit, component, and Playwright tests
```

### Task 1: Create and approve the Superdesign homepage direction

**Files:**
- Create: `.superdesign/design-system.md`
- Create: `.superdesign/resume.json`
- Commit: `docs/specs/2026-08-24-jvf-services-website-spec.md`
- Commit: `docs/superpowers/plans/2026-08-24-jvf-services-website.md`

**Interfaces:**
- Consumes: the product spec and `IMG_9490.jpeg` as temporary visual inspiration.
- Produces: an approved homepage draft id, project id, canvas URL, and persisted resume record used by Task 2.

- [ ] **Step 1: Initialize version control for the empty workspace**

Run:

```bash
git init
git add docs/specs/2026-08-24-jvf-services-website-spec.md docs/superpowers/plans/2026-08-24-jvf-services-website.md
git commit -m "docs: add JVF Services product spec and implementation plan"
```

Expected: one initial documentation commit and no application code.

- [ ] **Step 2: Run the required Superdesign preflight**

Run:

```bash
npx --yes @superdesign/cli@latest
```

Expected: an `auth:` line and recent projects. If unauthenticated, run `npx --yes @superdesign/cli@latest login`, wait for successful authentication, then run the preflight once more.

- [ ] **Step 3: Select one library style prompt without blending competing styles**

Run:

```bash
npx --yes @superdesign/cli@latest search-prompts --tags "style"
```

Choose the returned warm, editorial, service-business prompt that best supports generous whitespace and accessible typography. Confirm its slug and fetch only that prompt:

```bash
npx --yes @superdesign/cli@latest get-prompts --slugs "$JVF_STYLE_SLUG"
npx --yes @superdesign/cli@latest get-prompts --slugs "$JVF_STYLE_SLUG" --full
```

Expected: one prompt source. Do not add a second style prompt and do not use the proposal PDF as a style source.

- [ ] **Step 4: Write the project design system**

Create `.superdesign/design-system.md` with the spec plus these locked visual tokens:

```markdown
# JVF Services Design System

## Direction
Warm-premium Ohio service business: trustworthy, calm, human, and practical. Use generous whitespace, clear conversion hierarchy, real-service-photo slots, subtle home/cleaning motifs, and restrained motion. Never use blue.

## Color
- Evergreen 900: #0D352B
- Forest 700: #174C3C
- Forest 600: #21634F
- Sage 300: #B9D0BD
- Sage 100: #EAF2EA
- Ivory: #FBF8F0
- White: #FFFFFF
- Graphite: #1F2925
- Muted graphite: #59635E
- Error: #9B2C2C

All text/background pairs must meet WCAG 2.2 AA. Focus uses a 3px evergreen outline with a 3px ivory offset and is never removed.

## Type
- Display/headings: Newsreader, Georgia, serif
- Body/UI: Inter, Arial, sans-serif
- Body minimum: 16px; line height 1.6
- No all-caps paragraphs or low-contrast thin text

## Shape and spacing
- 8px spacing unit; section gaps 64-112px responsive
- Cards 20px radius; buttons 999px radius; fields 12px radius
- Shadows are soft and sparse; borders remain visible in high contrast
- Interactive targets are at least 44x44px where practical

## Motion
- 160-240ms opacity/transform transitions only
- Disable non-essential motion under prefers-reduced-motion

## Required pages
Homepage, Services overview, Housekeeping, Home Decoration, Ohio Notary Public, Spanish-English Interpreting, About, Contact/Quote, Terms, Privacy, Accessibility. English and Spanish share identical composition.

## Asset policy
Use explicit neutral placeholders for the future logo, favicon, owner portrait, service photos, and testimonials. Do not invent a logo, owner portrait, review, certification badge, or project photograph.
```

Append the single selected library prompt under `## Library style source`, then reconcile it to the locked tokens; the locked tokens win every conflict.

- [ ] **Step 5: Create the Superdesign project and upload the flyer as a temporary reference**

Run:

```bash
npx --yes @superdesign/cli@latest create-project --title "JVF Services"
npx --yes @superdesign/cli@latest upload-asset '/Users/thismac/Library/Messages/Attachments/95/05/AFFED5EE-8361-420A-AD3F-AB5A13E109E0/IMG_9490.jpeg' --project-id "$JVF_SD_PROJECT_ID" --purpose reference --key "jvf-flyer-inspiration" --description "Temporary inspiration: home roofline, cleaning sparkle, clear local-service hierarchy. Do not copy the old logo, blue color, text, or layout."
```

Record the returned `projectId`, reference `nodeId`, and canvas URL in `.superdesign/resume.json`. Do not upload the PDF; the spec already carries its applicable scope.

- [ ] **Step 6: Select the current high-quality web UI model and create one homepage draft**

Run `npx --yes @superdesign/cli@latest list-models`, select the highest-quality available general web UI model, and tell the user the choice and tradeoff before generation.

Run one draft prompt:

```bash
npx --yes @superdesign/cli@latest create-design-draft --project-id "$JVF_SD_PROJECT_ID" --title "JVF Services Homepage" --model "$JVF_SD_MODEL" --device desktop -p "Design the English JVF Services homepage for an Ohio service business. Create an accessible click-oriented header with Home, a grouped Services disclosure, About, Contact, a persistent language switch, and prominent Call, Text, and Request a Quote actions. The hero must introduce housekeeping, home decoration, in-person Ohio notary, and 24/7 phone/virtual Spanish-English interpreting without blue. Use explicit labeled slots for the future logo and real hero image. Include service cards, a concise availability band, a trust section containing only verified facts, a quote CTA, and a footer with Terms, Privacy, and Accessibility. Keep the phone number (716) 748-9117 visible. Use ONLY the fonts, colors, spacing, and component styles defined in the design system. Do not introduce any fonts, colors, credentials, testimonials, addresses, prices, or visual styles not in the design system." --context-file .superdesign/design-system.md --reference-id "$JVF_FLYER_REFERENCE_ID"
```

- [ ] **Step 7: Inspect the generated homepage and persist resume state**

Run:

```bash
npx --yes @superdesign/cli@latest get-design --draft-id "$JVF_SD_HOME_DRAFT_ID" --json
```

Verify: no blue; correct name and phone; no old logo; no fabricated photo/review/address/credential; correct four services; notary is in-person only; interpreting modes/hours are correct; keyboard-operable composition is feasible; logo/photo slots are explicit. Correct literal defects with `get-design --output` plus `import-design-draft --into`; use `iterate-design-draft --mode replace` only when correction requires visual judgment.

Store project id, active draft id/version, canvas/preview URLs, selected model, reference id, and design-system hash in `.superdesign/resume.json`.

- [ ] **Step 8: Present the canvas and stop for homepage approval**

Open/surface the returned canvas URL with `?live=1`. Do not scaffold Next.js until the user explicitly selects and approves the homepage direction.

- [ ] **Step 9: Commit the approved design foundation**

Run:

```bash
git add .superdesign/design-system.md .superdesign/resume.json
git commit -m "design: approve JVF Services homepage direction"
```

### Task 2: Generate and approve the complete page flow

**Files:**
- Modify: `.superdesign/resume.json`

**Interfaces:**
- Consumes: approved homepage draft id and design system from Task 1.
- Produces: approved designs for all ten remaining English page templates; Spanish reuses the same compositions.

- [ ] **Step 1: Read the approved homepage before extending it**

Run:

```bash
npx --yes @superdesign/cli@latest get-design --draft-id "$JVF_SD_HOME_DRAFT_ID" --json
```

Expected: the current approved homepage version and its canvas URLs.

- [ ] **Step 2: Present and confirm this exact page-flow payload**

Use this page list without adding routes:

```json
[
  {"title":"Services Overview","prompt":"Overview with two accessible groups: Home Services (Housekeeping, Home Decoration) and Professional Services (Ohio Notary Public, Spanish-English Interpreting). Each card has verified scope, availability, and a tailored CTA."},
  {"title":"Housekeeping","prompt":"Homes and small offices; standard, deep, recurring, move-in/move-out, and one-time cleaning; exclude hazardous/biohazard work; Ohio travel confirmed case by case; quote CTA and no public prices."},
  {"title":"Home Decoration","prompt":"Residential room styling, decor selection, arrangement, and setup; no licensed-interior-design claim; no public prices or budget form; quote CTA."},
  {"title":"Ohio Notary Public","prompt":"General in-person mobile notary service by appointment; $5 per in-person notarial act plus travel agreed in advance; signer appearance and acceptable ID; no remote notarization and no legal advice; request appointment and call CTAs."},
  {"title":"Spanish-English Interpreting","prompt":"Professional, not certified; any setting considered by request; in-person 8 a.m.-6 p.m. ET; phone, Zoom, and virtual 24/7; after 6 p.m. virtual/phone only; call now plus urgent callback CTAs."},
  {"title":"About","prompt":"Owner-led composition with explicit future owner-name, portrait, and story slots; show mission and service standards now; hide reviews and unverified trust claims."},
  {"title":"Contact and Request a Quote","prompt":"Combined contact/quote page with call/text cards and a dynamic accessible form. Show service-specific field groups, city and ZIP only, no uploads, no decoration budget, and a warning against confidential details."},
  {"title":"Terms","prompt":"Readable legal-content layout marked as a concept draft; include service confirmation, quote, availability, no-payment, notary, interpreting, and governing-law sections without a street address."},
  {"title":"Privacy","prompt":"Readable privacy layout describing contact form data, Vercel hosting/analytics, no database, no uploads, no customer auto-replies, retention through the future email inbox, user choices, and future contact email."},
  {"title":"Accessibility","prompt":"Readable accessibility statement: WCAG 2.2 AA engineering target, keyboard/screen-reader support, no overlay, feedback by phone and future email, known limitations for placeholder assets, and no guarantee of legal compliance."}
]
```

- [ ] **Step 3: Generate all flow pages from the approved homepage**

Run `execute-flow-pages` with the exact JSON above, the approved homepage draft id, and `.superdesign/design-system.md` as context. Append this fidelity sentence to every prompt: `Use ONLY the fonts, colors, spacing, and component styles defined in the design system. Do not introduce any new colors, fonts, credentials, addresses, testimonials, or services.`

- [ ] **Step 4: Inspect every returned design**

For each returned draft id, run `get-design --json` and verify service facts, CTA routing, asset slots, no blue, no fabricated content, and consistent header/footer. Persist every page as its own target in `.superdesign/resume.json`.

- [ ] **Step 5: Present the canvas and stop for full-flow approval**

Do not write application code until the user approves the whole flow or gives page-specific corrections. Route visual corrections through replace mode and exact copy defects through direct import into the same draft id.

- [ ] **Step 6: Commit approved flow state**

```bash
git add .superdesign/resume.json
git commit -m "design: approve JVF Services page flow"
```

### Task 3: Scaffold the pinned Next.js application and test harness

**Files:**
- Create: `web/package.json`
- Create: `web/vitest.config.ts`
- Create: `web/playwright.config.ts`
- Create: `web/src/test/setup.ts`
- Create: `web/src/app/page.test.tsx`
- Modify: `web/tsconfig.json`

**Interfaces:**
- Consumes: approved Superdesign flow.
- Produces: pinned build/test toolchain used by every code task.

- [ ] **Step 1: Scaffold the application without a nested Git repository**

Run:

```bash
npx --yes create-next-app@16.3.2 web --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --empty --agents-md --disable-git --yes
```

- [ ] **Step 2: Pin runtime and test dependencies**

Run from `web/`:

```bash
npm install --save-exact next@16.3.2 react@19.2.8 react-dom@19.2.8 zod@4.4.3 @vercel/analytics@2.0.1
npm install --save-dev --save-exact typescript@7.0.2 eslint@10.9.1 eslint-config-next@16.3.2 prettier@3.9.6 vitest@4.1.11 jsdom@30.0.1 @testing-library/react@16.3.2 @testing-library/user-event@14.6.6 @testing-library/jest-dom@7.0.1 @playwright/test@1.62.1 @axe-core/playwright@4.13.0 lighthouse@13.4.1
npx playwright install chromium
```

- [ ] **Step 3: Write the failing smoke test**

Create `web/src/app/page.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import Home from './page';

test('renders the JVF Services concept', () => {
  render(<Home />);
  expect(screen.getByRole('heading', { name: /JVF Services/i })).toBeInTheDocument();
});
```

- [ ] **Step 4: Configure Vitest and scripts, then verify the test fails**

Configure `vitest.config.ts` for `jsdom`, `@/*` aliases, and `src/test/setup.ts` importing `@testing-library/jest-dom/vitest`. Add scripts:

```json
{
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "check": "npm run lint && npm run typecheck && npm run test && npm run build"
}
```

Run `npm test -- page.test.tsx`. Expected: FAIL because the empty scaffold does not yet render the required heading.

- [ ] **Step 5: Implement the minimal branded smoke page and pass the test**

Render a semantic `<main><h1>JVF Services</h1></main>` in `src/app/page.tsx`. Run `npm test -- page.test.tsx`; expected PASS.

- [ ] **Step 6: Commit the scaffold**

```bash
git add web
git commit -m "build: scaffold pinned Next.js application"
```

### Task 4: Add typed business content, locales, and route mapping

**Files:**
- Create: `web/src/content/types.ts`
- Create: `web/src/content/business.ts`
- Create: `web/src/content/en.ts`
- Create: `web/src/content/es.ts`
- Create: `web/src/lib/i18n.ts`
- Create: `web/src/lib/routes.ts`
- Create: `web/src/content/content.test.ts`

**Interfaces:**
- Produces: `Locale`, `RouteKey`, `SiteContent`, `getContent(locale)`, `localizedHref(route, locale)`, and immutable `businessFacts`.

- [ ] **Step 1: Write failing parity and business-fact tests**

Test that English and Spanish expose identical keys, all route keys resolve in both locales, the phone is `(716) 748-9117`, public name is `JVF Services`, email/address are `null`, reviews are empty, and no content contains `JVF HomeWorks Pro`, `landscaping`, `remodeling`, or `certified interpreter`.

- [ ] **Step 2: Run the content tests and verify failure**

Run `npm test -- content.test.ts`. Expected: FAIL because content modules do not exist.

- [ ] **Step 3: Implement route and locale types**

Use these public interfaces:

```ts
export type Locale = 'en' | 'es';
export type RouteKey =
  | 'home' | 'services' | 'housekeeping' | 'decoration' | 'notary'
  | 'interpreting' | 'about' | 'contact' | 'terms' | 'privacy' | 'accessibility';

export const routePaths: Record<RouteKey, string> = {
  home: '/', services: '/services', housekeeping: '/services/housekeeping',
  decoration: '/services/home-decoration', notary: '/services/notary',
  interpreting: '/services/interpreting', about: '/about', contact: '/contact',
  terms: '/terms', privacy: '/privacy', accessibility: '/accessibility',
};
```

`localizedHref` returns the root path for English and prefixes Spanish with `/es`, with `/es` rather than `/es/` for the Spanish homepage.

- [ ] **Step 4: Implement immutable business facts and bilingual content**

`businessFacts` must contain the exact service rules from the spec, `email: null`, `address: null`, `legalEntitySuffix: null`, `owner: null`, `reviews: []`, and phone/SMS hrefs `tel:+17167489117` and `sms:+17167489117`.

Author natural English and equivalent Spanish copy from the approved design. Mark the Spanish module `reviewStatus: 'owner-review-required'`; do not publish claims absent from the spec.

- [ ] **Step 5: Run parity tests**

Run `npm test -- content.test.ts`. Expected: PASS with no missing locale keys or prohibited claims.

- [ ] **Step 6: Commit content foundations**

```bash
git add web/src/content web/src/lib/i18n.ts web/src/lib/routes.ts
git commit -m "feat: add bilingual typed site content"
```

### Task 5: Build the accessible shell, tokens, navigation, and language switcher

**Files:**
- Create: `web/src/app/fonts.ts`
- Modify: `web/src/app/globals.css`
- Modify: `web/src/app/layout.tsx`
- Create: `web/src/components/layout/site-header.tsx`
- Create: `web/src/components/layout/services-menu.tsx`
- Create: `web/src/components/layout/mobile-nav.tsx`
- Create: `web/src/components/layout/language-switcher.tsx`
- Create: `web/src/components/layout/site-footer.tsx`
- Create: `web/src/components/layout/layout.test.tsx`

**Interfaces:**
- Consumes: `Locale`, `routePaths`, `localizedHref`, and localized navigation content.
- Produces: `SiteHeader({ locale, route })`, `SiteFooter({ locale })`, and the shared layout shell.

- [ ] **Step 1: Write failing navigation accessibility tests**

Test that the skip link targets `#main-content`, the Services button exposes `aria-expanded`, Enter opens it, Escape closes it and restores focus, all four service links are reachable by keyboard, mobile navigation uses a labeled disclosure, and the language switch maps `/services/notary` to `/es/services/notary` and back.

- [ ] **Step 2: Run the layout tests and verify failure**

Run `npm test -- layout.test.tsx`. Expected: FAIL because shell components do not exist.

- [ ] **Step 3: Implement fonts and locked CSS tokens**

Use `next/font/google` with Newsreader for headings and Inter for body copy. Define the exact color tokens from `.superdesign/design-system.md`, 44px minimum primary controls, 3px evergreen focus outlines with ivory offset, reduced-motion overrides, and responsive container widths. Never use `outline: none` without an equivalent visible focus treatment.

- [ ] **Step 4: Implement desktop and mobile navigation**

Use a real `<button>` for Services, one controlled panel grouped by Home Services and Professional Services, click and keyboard activation, Escape/outside-click closure, and focus restoration. Do not implement hover-only or nested submenus. Mobile uses one disclosure with the same link groups.

- [ ] **Step 5: Implement the language switch and footer**

The switcher must have explicit `English` and `Español` labels, preserve the equivalent route, and set `aria-current` on the active language. Footer links Terms, Privacy, Accessibility, call, and text; omit address and email while their values are null.

- [ ] **Step 6: Run tests and commit**

Run `npm test -- layout.test.tsx` and `npm run typecheck`; expected PASS.

```bash
git add web/src/app web/src/components/layout
git commit -m "feat: add accessible bilingual site shell"
```

### Task 6: Implement page templates, routes, metadata, and structured data

**Files:**
- Create: `web/src/features/pages/home-page.tsx`
- Create: `web/src/features/pages/services-page.tsx`
- Create: `web/src/features/pages/service-detail-page.tsx`
- Create: `web/src/features/pages/about-page.tsx`
- Create: `web/src/features/pages/legal-page.tsx`
- Create: `web/src/components/ui/asset-slot.tsx`
- Create: `web/src/components/ui/service-card.tsx`
- Create: `web/src/components/ui/call-to-action.tsx`
- Create: `web/src/lib/metadata.ts`
- Create: `web/src/app/sitemap.ts`
- Create: `web/src/app/robots.ts`
- Create: English and Spanish route entrypoints listed in the spec
- Create: `web/src/features/pages/pages.test.tsx`

**Interfaces:**
- Consumes: approved Superdesign drafts, `SiteContent`, `RouteKey`, and shared layout.
- Produces: all public GET routes, `buildPageMetadata`, sitemap entries, and schema.org `ProfessionalService` JSON-LD.

- [ ] **Step 1: Write failing page and metadata tests**

Test all 22 routes, one `<h1>` per page, service-specific CTA labels, notary price/mode, interpreter hours/modes, absence of an address and `LLC`, English/Spanish alternate URLs, and JSON-LD containing `areaServed: Ohio` without `PostalAddress`.

- [ ] **Step 2: Run tests and verify failure**

Run `npm test -- pages.test.tsx`. Expected: FAIL because templates/routes do not exist.

- [ ] **Step 3: Implement shared templates from the approved designs**

Keep route files thin: each passes a locale and page/service key to a shared template. Match approved composition, spacing, hierarchy, placeholder slots, and responsive behavior. Service CTAs use the exact query values `housekeeping`, `decoration`, `notary`, or `interpreting`, for example `/contact?service=notary` and `/es/contact?service=notary`; interpreting also exposes immediate call/text actions.

- [ ] **Step 4: Implement the About placeholder behavior**

When owner name/story/portrait are null, render a polished brand mission and a visibly labeled `Owner story and portrait will be added before launch` asset slot. When reviews are empty, render no testimonial heading, carousel, or empty region.

- [ ] **Step 5: Implement metadata and structured data**

Generate localized title/description, canonical URL, `hreflang` alternates, Open Graph defaults, sitemap, and robots metadata. Use `NEXT_PUBLIC_SITE_URL` when defined and `http://localhost:3000` only in local development. JSON-LD uses `ProfessionalService`, exact name/phone, four service types, and Ohio as `areaServed`; omit email and address.

- [ ] **Step 6: Run tests, build, and commit**

Run `npm test -- pages.test.tsx`, `npm run typecheck`, and `npm run build`; expected PASS.

```bash
git add web/src/app web/src/features/pages web/src/components/ui web/src/lib/metadata.ts
git commit -m "feat: add bilingual public pages and SEO metadata"
```

### Task 7: Define and validate the dynamic quote-request model

**Files:**
- Create: `web/src/features/contact/types.ts`
- Create: `web/src/features/contact/schema.ts`
- Create: `web/src/features/contact/field-config.ts`
- Create: `web/src/features/contact/schema.test.ts`

**Interfaces:**
- Produces: `ServiceId`, `QuoteRequest`, `QuoteFormValues`, `quoteRequestSchema`, `parseQuoteRequest(formData)`, and service-specific field configuration.

- [ ] **Step 1: Write failing schema tests for every service branch**

Cover valid housekeeping home/office requests; required phone and email; valid US ZIP; decoration without budget; in-person notary only; interpreter phone/Zoom/virtual at any hour; interpreter in-person accepted at 08:00 and 18:00 ET but rejected at 07:59 and 18:01; maximum note length; honeypot rejection; completion under two seconds; and absence of file/full-address fields.

- [ ] **Step 2: Run schema tests and verify failure**

Run `npm test -- schema.test.ts`. Expected: FAIL because the schema does not exist.

- [ ] **Step 3: Implement the discriminated union**

Use this public shape:

```ts
export type ServiceId = 'housekeeping' | 'decoration' | 'notary' | 'interpreting' | 'general';

export type QuoteRequest =
  | HousekeepingRequest
  | DecorationRequest
  | NotaryRequest
  | InterpretingRequest
  | GeneralRequest;
```

Every branch includes `service`, `locale`, `name`, `phone`, `email`, `city`, `zip`, `note`, `privacyAcknowledged`, `startedAt`, and empty `website` honeypot. Trim strings, normalize email, cap names/city at 100 characters and notes at 1,000, and never accept unknown keys into the parsed result.

- [ ] **Step 4: Implement service field definitions and time validation**

Represent in-person interpreter time as ET `HH:mm`; convert to minutes and require `480 <= minutes <= 1080`. Phone/Zoom/virtual have no time restriction. Notary mode is a constant `in-person` value. Housekeeping uses bedrooms/bathrooms for `home` and square feet for `small-office`.

- [ ] **Step 5: Pass schema tests and commit**

Run `npm test -- schema.test.ts`; expected PASS.

```bash
git add web/src/features/contact
git commit -m "feat: validate service-specific quote requests"
```

### Task 8: Build the accessible form, demo delivery adapter, and failure recovery

**Files:**
- Create: `web/src/features/contact/delivery.ts`
- Create: `web/src/features/contact/demo-delivery.ts`
- Create: `web/src/features/contact/actions.ts`
- Create: `web/src/features/contact/contact-form.tsx`
- Create: `web/src/features/contact/contact-form.test.tsx`
- Create: `web/.env.example`

**Interfaces:**
- Produces: `QuoteDelivery`, `DeliveryResult`, `DemoQuoteDelivery`, `submitQuote`, and `ContactForm`.

- [ ] **Step 1: Write failing delivery and form tests**

Test service preselection from query input; dynamic field changes; keyboard operation; labeled required fields; error summary linked to invalid fields; `aria-live` success/failure; no reset on delivery failure; reset on success; direct call/text fallback; no customer email; and redacted demo logging that excludes name, phone, email, city, ZIP, and note.

- [ ] **Step 2: Run tests and verify failure**

Run `npm test -- contact-form.test.tsx`. Expected: FAIL because delivery/form modules do not exist.

- [ ] **Step 3: Implement the provider-neutral delivery contract**

```ts
export type DeliveryResult =
  | { ok: true; submissionId: string }
  | { ok: false; code: 'UNCONFIGURED' | 'DELIVERY_FAILED' };

export interface QuoteDelivery {
  deliver(request: QuoteRequest): Promise<DeliveryResult>;
}
```

`DemoQuoteDelivery` generates a UUID and logs only `{ event: 'demo_quote', submissionId, locale, service, timestamp }`. A non-demo mode without a configured adapter returns `UNCONFIGURED`; it never pretends to send email.

- [ ] **Step 4: Implement the server action**

`submitQuote(previousState, formData)` parses with Zod, returns localized field errors, rejects bot/timing failures without logging form contents, selects `DemoQuoteDelivery` only when `CONTACT_DELIVERY_MODE=demo`, and returns success only when `delivery.ok` is true.

- [ ] **Step 5: Implement the dynamic accessible form**

Use React 19 `useActionState`. Keep common fields mounted, render only the selected service fields, preserve user input when failure state returns, focus the error summary after invalid submission, announce status in a polite live region, and disable the submit button only while pending. Do not add upload, address, decoration-budget, payment, scheduling, CAPTCHA, or customer-confirmation controls.

- [ ] **Step 6: Document safe local configuration**

Create `web/.env.example`:

```dotenv
CONTACT_DELIVERY_MODE=demo
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Do not add real secrets.

- [ ] **Step 7: Run tests and commit**

Run `npm test -- contact-form.test.tsx`, `npm run typecheck`, and `npm run build`; expected PASS.

```bash
git add web/src/features/contact web/.env.example
git commit -m "feat: add accessible demo quote workflow"
```

### Task 9: Add legal, privacy, accessibility, and analytics behavior

**Files:**
- Modify: `web/src/content/en.ts`
- Modify: `web/src/content/es.ts`
- Modify: `web/src/app/layout.tsx`
- Create: `web/src/features/pages/legal-pages.test.tsx`

**Interfaces:**
- Consumes: `businessFacts` and the legal page template.
- Produces: concept Terms, Privacy, Accessibility pages and Vercel Web Analytics integration.

- [ ] **Step 1: Write failing legal-content tests**

Assert every legal page is marked `Draft for review — not yet published`; Privacy discloses required form data, demo mode, future email delivery, Vercel hosting/analytics, no database/uploads/customer auto-replies, and no sale of form data; Accessibility describes WCAG 2.2 AA as a target, keyboard/screen-reader support, no overlay, phone feedback, future email, and no legal guarantee; Terms contains quote/service-confirmation, availability, notary, interpreting, no-payment, and Ohio-law sections.

- [ ] **Step 2: Run tests and verify failure**

Run `npm test -- legal-pages.test.tsx`. Expected: FAIL until exact localized content is added.

- [ ] **Step 3: Add equivalent English and Spanish legal content**

Keep paragraphs plain-language, heading-navigable, and free of a physical address or active email. Link official Ohio notary information where helpful, but do not turn the page into legal advice.

- [ ] **Step 4: Add Vercel Web Analytics without form events**

Mount `<Analytics />` once in the root layout. Do not call `track()` for form fields, service messages, phone/email values, or submissions. Disable analytics in tests.

- [ ] **Step 5: Run tests and commit**

Run `npm test -- legal-pages.test.tsx` and `npm run build`; expected PASS.

```bash
git add web/src/content web/src/app/layout.tsx web/src/features/pages/legal-pages.test.tsx
git commit -m "feat: add legal accessibility and privacy pages"
```

### Task 10: Finish approved visual polish and asset handoff requirements

**Files:**
- Create: `docs/brand/logo-generation-prompt.md`
- Create: `web/public/assets/README.md`
- Modify: approved page/component styles under `web/src/`
- Create: `web/src/components/ui/asset-slot.test.tsx`

**Interfaces:**
- Produces: exact future asset slots and a user-ready logo generation prompt.

- [ ] **Step 1: Write the asset-slot test**

Test that every missing visual renders a visible, screen-reader-readable label; slots do not use empty image `src`; logo slots preserve 10:3 aspect ratio; service/hero slots use 4:3; owner portrait uses 4:5; and no placeholder is announced as real JVF work.

- [ ] **Step 2: Run the test and verify failure**

Run `npm test -- asset-slot.test.tsx`. Expected: FAIL until exact asset behavior is implemented.

- [ ] **Step 3: Implement fixed asset contracts**

Document and enforce:

```text
logo-horizontal.svg       vector preferred; 1200x360 PNG fallback
favicon-source.png        512x512 transparent source
hero-home.jpg             1600x1200, 4:3
service-housekeeping.jpg  1200x900, 4:3
service-decoration.jpg    1200x900, 4:3
service-notary.jpg        1200x900, 4:3
service-interpreting.jpg  1200x900, 4:3
owner-portrait.jpg        800x1000, 4:5
```

When files are absent, use CSS asset slots rather than broken `<img>` elements. When files arrive, use `next/image` with meaningful localized alt text or empty alt for purely decorative imagery.

- [ ] **Step 4: Create the exact external logo-generation prompt**

Write this prompt to `docs/brand/logo-generation-prompt.md`:

```text
Create an original premium vector-style logo for a professional Ohio service business named exactly “JVF Services.” Take high-level inspiration from the idea of a clean home roofline, a subtle housekeeping sparkle, and a smooth service/swoosh gesture, but do not copy any existing logo, roof silhouette, font, or arrangement. Use a warm premium palette of deep forest green (#174C3C), evergreen (#0D352B), sage (#B9D0BD), warm ivory (#FBF8F0), and white only—absolutely no blue. The mark must feel trustworthy, calm, accessible, and professional rather than playful or cartoonish. Make the words “JVF Services” highly legible at small sizes. Avoid tiny details, gradients, shadows, mockups, badges, generic clip art, cleaning-product bottles, people, and extra text. Produce: (1) a horizontal logo with symbol plus wordmark on a transparent background, (2) a square symbol-only version suitable for a favicon, and (3) a one-color forest-green version. Keep clean vector edges and balanced negative space. Spell “JVF Services” exactly.
```

- [ ] **Step 5: Match the approved responsive designs**

Verify approved desktop composition at 1440px and responsive states at 1280px, 1024px, 768px, 390px, and 320px. No horizontal scroll, clipped focus ring, hidden legal link, hover-only content, or text baked into imagery.

- [ ] **Step 6: Pass tests and commit**

Run `npm test -- asset-slot.test.tsx` and `npm run build`; expected PASS.

```bash
git add docs/brand web/public/assets web/src
git commit -m "style: finish approved JVF visual system and asset handoff"
```

### Task 11: Complete automated and manual quality gates

**Files:**
- Create: `web/tests/e2e/site.spec.ts`
- Create: `web/tests/e2e/accessibility.spec.ts`
- Create: `docs/qa/accessibility-manual-checks.md`
- Create: `docs/qa/web-interface-guidelines-audit.md`

**Interfaces:**
- Consumes: complete local application.
- Produces: evidence that routes, forms, keyboard flow, responsive behavior, and accessibility checks pass before handoff.

- [ ] **Step 1: Write Playwright journey tests**

Cover English and Spanish homepage navigation; Services menu keyboard behavior; page-preserving language switch; preselected service form; valid housekeeping/notary/interpreter demo submissions; after-hours in-person interpreter rejection; server failure preserving fields; call/text hrefs; and 320px no-horizontal-overflow checks.

- [ ] **Step 2: Write Axe tests for every page template**

For each of the 11 English and 11 Spanish URLs, run Axe and fail on `critical` or `serious` violations. Separately assert one H1, named landmarks, unique form labels, visible focus, and success/error live regions.

- [ ] **Step 3: Run the full automated gate**

Run from `web/`:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Expected: every command exits 0.

- [ ] **Step 4: Run Lighthouse against the production build**

Run `npm run build`, serve with `npm start`, and audit `/`, `/services/notary`, `/contact`, and `/es/contact`. Require Accessibility >= 95, Best Practices >= 95, SEO >= 95, and Performance >= 90 on desktop and mobile profiles. Fix regressions rather than lowering thresholds.

- [ ] **Step 5: Complete manual keyboard and VoiceOver review**

Document date, browser, viewport, and result for: skip link; grouped Services menu; mobile menu; language switch; all form branches; field-error navigation; live success/failure messages; call/text actions; zoom to 200%; reduced motion; and Safari VoiceOver heading/landmark/form traversal. Record only pass/fail and defect references—never form PII.

- [ ] **Step 6: Apply the fresh Web Interface Guidelines review**

Fetch `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`, audit `web/src/**/*.tsx` and `web/src/app/globals.css`, and record findings in terse `file:line` format in `docs/qa/web-interface-guidelines-audit.md`. Fix every actionable finding, rerun affected tests, then record `No remaining actionable findings` with the review date.

- [ ] **Step 7: Commit verification evidence**

```bash
git add web/tests docs/qa web/src
git commit -m "test: verify accessibility and customer journeys"
```

### Task 12: Document deferred launch work and open the localhost preview

**Files:**
- Create: `README.md`
- Create: `docs/launch/checklist.md`

**Interfaces:**
- Produces: reproducible local startup instructions, production blockers, and a running user-review URL.

- [ ] **Step 1: Write local development instructions**

Document:

```bash
cp web/.env.example web/.env.local
npm install --prefix web
npm run dev --prefix web
```

State that demo submissions send no email and log only redacted event metadata.

- [ ] **Step 2: Write the launch checklist with explicit blockers**

Include unchecked gates for: user-approved logo/favicon/photos/owner story/reviews; Spanish owner review; JVF Services name and domain availability; Ohio LLC/statutory-agent address; real Google verification base with hidden service-area address; Vercel Pro; production site URL; business inbox and selected `QuoteDelivery` adapter; email deliverability records; Vercel WAF rate rule for contact POST requests (start in log mode, then rate-limit repeated IP traffic); legal review of Terms/Privacy/Accessibility; prior accessibility-letter review/deadline; notary commission verification; and final external accessibility audit recommendation.

Explicitly prohibit deployment until email delivery replaces demo mode and a failed adapter test proves the UI does not show false success.

- [ ] **Step 3: Run the final clean verification**

Run:

```bash
npm run check --prefix web
npm run test:e2e --prefix web
git status --short
```

Expected: all checks pass; Git status shows only intentionally uncommitted local environment files, never `.env.local`.

- [ ] **Step 4: Commit documentation**

```bash
git add README.md docs/launch/checklist.md
git commit -m "docs: add local review and launch readiness guide"
```

- [ ] **Step 5: Start localhost and hand off for visual review**

Run `npm run dev --prefix web`, keep the process alive, and provide the exact local URL (normally `http://localhost:3000`). Ask the user to review desktop/mobile layout, English/Spanish copy, service facts, placeholders, and the dynamic form. Do not connect or deploy to Vercel.
