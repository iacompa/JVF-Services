# JVF Services accessibility QA record

Review date: August 25, 2026  
Build: local Next.js production build  
Automated browser: Playwright Chromium  
Visual browser: Codex in-app Chromium  
Viewports observed: 1440×1000, 390×844, and 320×720; overflow automation also covered 1280, 1024, and 768 pixels wide.

This record contains no customer form data. The form journeys used obviously synthetic QA values and the redacted local demo adapter.

## Completed checks

| Check | Result | Evidence |
| --- | --- | --- |
| Skip link | Pass | First keyboard stop; becomes visible and targets `#main-content`. |
| Desktop Services disclosure | Pass | Opens with Enter, closes with Escape, and returns focus to trigger. |
| Mobile menu | Pass | Opens by keyboard/click, exposes grouped service links, closes with Escape, and returns focus. |
| Page-preserving language switch | Pass | Notary route changes between English and Spanish; document language changes to `es` on Spanish navigation. |
| All dynamic form branches | Pass | Housekeeping, notary, interpreting, decoration, and general configurations covered by unit/schema tests; three complete demo journeys covered in Chromium. |
| Linked field-error summary | Pass | Invalid after-hours in-person interpretation focuses the summary and links to the time field. |
| Failure-state preservation | Pass | Common and dynamic fields remain populated after an invalid response. |
| Live success status | Pass | Successful local demo delivery is announced by a polite status region. |
| Direct call and text alternatives | Pass | Links resolve to `tel:+17167489117` and `sms:+17167489117`. |
| 320px reflow | Pass | English/Spanish pages report no horizontal document overflow. |
| Reduced-motion implementation | Pass by code/automation | Global reduced-motion media query shortens animation and transition duration and disables smooth scrolling. |
| Axe critical/serious scan | Pass | All 22 English and Spanish public routes pass. |
| Lighthouse accessibility | Pass | 100 on all 8 representative desktop/mobile audits. |

## Human checks required before public launch

| Check | Status | Launch requirement |
| --- | --- | --- |
| Safari at 200% browser zoom | Not run | Confirm content reflows without clipping and every focused item stays visible. |
| Safari + VoiceOver | Not run | Verify heading, landmark, link, service-menu, and complete form traversal with spoken names, errors, and statuses. |
| Voice Control / switch control | Not run | Recommended with a person who uses the technology. |
| Final logo, photos, and owner portrait | Blocked on assets | Review localized alternative text and contrast after real assets replace placeholders. |
| User testing by people with disabilities | Not run | Recommended before launch and after major content/integration changes. |

Automated checks reduce risk but do not prove ADA compliance or replace review by qualified accessibility and legal professionals.
