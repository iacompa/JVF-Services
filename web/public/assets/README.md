# JVF Services public asset handoff

The current site deliberately renders accessible CSS placeholders when these files are absent. Do not rename the files: the names and dimensions form the future asset contract.

| File | Required format and size | Intended use |
| --- | --- | --- |
| `logo-horizontal.svg` | Vector preferred; `1200×360` transparent PNG fallback (10:3) | Header and footer wordmark |
| `favicon-source.png` | `512×512`, transparent | Favicon source |
| `hero-home.jpg` | `1600×1200` (4:3) | Home-page hero |
| `service-housekeeping.jpg` | `1200×900` (4:3) | Housekeeping page |
| `service-decoration.jpg` | `1200×900` (4:3) | Decoration page |
| `service-notary.jpg` | `1200×900` (4:3) | Notary page |
| `service-interpreting.jpg` | `1200×900` (4:3) | Interpreting page |
| `owner-portrait.jpg` | `800×1000` (4:5) | About page |

Before adding an asset:

1. Confirm that JVF Services owns the image or has written permission to publish it.
2. Optimize the file without baking words or logos into photography.
3. Replace the matching CSS placeholder with `next/image` and preserve the listed aspect ratio.
4. Add meaningful localized English and Spanish alternative text when the image communicates information. Use empty alternative text only when it is genuinely decorative.
5. Never describe a stock, AI-generated, or placeholder image as completed JVF work.
6. Re-run responsive, performance, and accessibility checks after every asset change.
