# JVF HomeWorks Pro public assets

The `jvf/` directory contains the logo and selected images migrated from the owner-identified existing JVF HomeWorks Pro website on August 25, 2026. They are bundled locally so the Next.js site does not depend on the previous host at runtime.

| File                              | Required format and size  | Intended use                          |
| --------------------------------- | ------------------------- | ------------------------------------- |
| `jvf/jvf-services-logo.png`       | `1376×768` transparent PNG | Header and footer brand mark           |
| `jvf/jvf-homeworks-pro-logo.png`  | `300×195` transparent PNG  | Previous brand mark (retained archive) |
| `jvf/cleaning-hero.jpg`           | `1600×1000` JPEG          | Home hero and housekeeping page       |
| `jvf/decoration-chair.png`        | `626×416` transparent PNG | Housekeeping card and decoration page |
| `jvf/remodeling-team.png`         | `413×374` transparent PNG | Remodeling service card               |
| `jvf/decoration-cabinet.png`      | `452×444` transparent PNG | Decoration service card               |
| `jvf/project-basement-wide.jpg`   | `948×706` JPEG            | About and Gallery pages               |
| `jvf/project-basement-detail.jpg` | `1290×948` JPEG           | Remodeling and Gallery pages          |
| `favicon-source.png`              | `512×512`, transparent    | Favicon source                        |
| `owner-portrait.jpg`              | `800×1000` (4:5)          | About page                            |

Before adding an asset:

1. Confirm that JVF HomeWorks Pro owns the image or has written permission to publish it.
2. Optimize the file without baking words or logos into photography.
3. Replace the matching CSS placeholder with `next/image` and preserve the listed aspect ratio.
4. Add meaningful localized English and Spanish alternative text when the image communicates information. Use empty alternative text only when it is genuinely decorative.
5. Never describe a stock, AI-generated, or placeholder image as completed JVF work.
6. Re-run responsive, performance, and accessibility checks after every asset change.
