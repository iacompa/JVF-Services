# Automated QA results

Run date: August 25, 2026

## Test gates

- ESLint: pass, 0 errors and 0 warnings.
- TypeScript: pass.
- Vitest: 9 files, 51 tests passed.
- Playwright: 54 tests passed, including 22-route Axe coverage, keyboard navigation, three successful service submissions, invalid after-hours handling, and responsive overflow checks.
- Next.js production build: pass, 26 generated routes.

## Lighthouse production scores

| Route | Profile | Performance | Accessibility | Best Practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| `/` | Desktop | 100 | 100 | 96 | 100 |
| `/services/notary` | Desktop | 100 | 100 | 96 | 100 |
| `/contact` | Desktop | 100 | 100 | 96 | 100 |
| `/es/contact` | Desktop | 100 | 100 | 96 | 100 |
| `/` | Mobile | 96 | 100 | 96 | 100 |
| `/services/notary` | Mobile | 97 | 100 | 96 | 100 |
| `/contact` | Mobile | 96 | 100 | 96 | 100 |
| `/es/contact` | Mobile | 97 | 100 | 96 | 100 |

All measured scores exceed the project gates: Performance ≥90, Accessibility ≥95, Best Practices ≥95, and SEO ≥95.
