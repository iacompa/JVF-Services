# Web Interface Guidelines audit

Reviewed August 25, 2026 against the current [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).

## `web/src/app/globals.css`

`web/src/app/globals.css:48` - fixed touch feedback with intentional tap highlight and `touch-action: manipulation`  
`web/src/app/globals.css:59` - visible `:focus-visible` outline retained globally  
`web/src/app/globals.css:74` - balanced headings and pretty body wrapping added  
`web/src/app/globals.css:79` - heading anchors receive sticky-header scroll margin  
`web/src/app/globals.css:502` - fixed pale `24/7` text contrast; Axe now passes

## `web/src/features/contact/contact-form.tsx`

`web/src/features/contact/contact-form.tsx:144` - error recovery restores values after React form reset and focuses the linked summary  
`web/src/features/contact/contact-form.tsx:161` - warns before abandoning a dirty browser form  
`web/src/features/contact/contact-form.tsx:261` - service control has explicit autocomplete behavior  
`web/src/features/contact/contact-form.tsx:286` - native input types, autocomplete, input modes, and email spellcheck are explicit  
`web/src/features/contact/contact-form.tsx:335` - dynamic fields retain names, labels, required state, and autocomplete behavior

## `web/src/app/layout.tsx`

`web/src/app/layout.tsx:14` - theme color matches the warm ivory page surface  
`web/src/app/layout.tsx:26` - initial document language is set before interaction; client navigation keeps it synchronized

## `web/src/components/layout/site-header.tsx`

`web/src/components/layout/site-header.tsx:28` - brand wordmark is protected from automatic translation

No remaining actionable findings.
