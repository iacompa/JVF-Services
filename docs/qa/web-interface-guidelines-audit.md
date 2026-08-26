# Web Interface Guidelines audit

Reviewed August 25, 2026 against the current [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).

## `web/src/app/globals.css`

- `web/src/app/globals.css:55` - intentional tap feedback and `touch-action: manipulation` retained
- `web/src/app/globals.css:65` - visible global `:focus-visible` outline retained
- `web/src/app/globals.css:79` - balanced headings and pretty body wrapping retained
- `web/src/app/globals.css:84` - heading anchors retain sticky-header scroll margin
- `web/src/app/globals.css:946` - service cards use accessible high-contrast green surfaces and 46 px actions
- `web/src/app/globals.css:1147` - scroll motion uses transform only and is limited to `prefers-reduced-motion: no-preference`
- `web/src/app/globals.css:2196` - home hero primary action meets WCAG AA contrast

## `web/src/components/motion/scroll-reveal.tsx`

- `web/src/components/motion/scroll-reveal.tsx:14` - reduced-motion and unsupported-browser fallbacks leave content visible
- `web/src/components/motion/scroll-reveal.tsx:27` - the observer only adds visual state and never changes focusability or assistive-technology visibility

## `web/src/components/ui/featured-service-card.tsx`

- `web/src/components/ui/featured-service-card.tsx:44` - each service uses one semantic article, hierarchical heading, descriptive links, decorative artwork hiding, and explicit image dimensions

## `web/src/features/contact/contact-form.tsx`

- `web/src/features/contact/contact-form.tsx:144` - error recovery restores values after React form reset and focuses the linked summary
- `web/src/features/contact/contact-form.tsx:161` - warns before abandoning a dirty browser form
- `web/src/features/contact/contact-form.tsx:261` - service control has explicit autocomplete behavior
- `web/src/features/contact/contact-form.tsx:286` - native input types, autocomplete, input modes, and email spellcheck are explicit
- `web/src/features/contact/contact-form.tsx:335` - dynamic fields retain names, labels, required state, and autocomplete behavior

## `web/src/app/layout.tsx`

- `web/src/app/layout.tsx:15` - theme color matches the dark green browser chrome
- `web/src/app/layout.tsx:23` - initial document language is set before interaction; client navigation keeps it synchronized
- `web/src/app/layout.tsx:29` - one global reveal controller avoids per-card observers

## `web/src/components/layout/site-header.tsx`

- `web/src/components/layout/site-header.tsx:28` - brand wordmark is protected from automatic translation

No remaining actionable findings.
