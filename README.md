# Jingxuan Li — academic website

Personal website for Jingxuan Li, PhD student in Statistics and Data Science at Northwestern University.

Live site: https://candy26i.github.io/

## Edit the content

- `contents/home.md`: introduction and research interests
- `contents/publications.md`: publication titles, authors, venues, summaries, and links
- `contents/research.md`: research experience
- `contents/education.md`: education
- `contents/experience.md`: industry experience
- `contents/awards.md`: honors
- `contents/config.yml`: contact information, page metadata, CV path, and update dates
- `layout.html`: page structure
- `static/css/main.css`: responsive styles

Run this after editing the source files (Node.js required; no package installation):

```sh
node scripts/build.cjs
```

The build reuses the Markdown and YAML parsers already bundled with this repository. Commit the generated `index.html` together with the edited sources. GitHub Pages serves it directly, so all text, navigation, publication entries, and links work without JavaScript or external fonts.

To check that the generated HTML is current:

```sh
node scripts/build.cjs --check
```

## Preview locally

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/. The generated page can also be opened directly as a local file. Keep the existing GitHub Pages configuration; this update requires no new hosting service or deployment framework.

## CV

The page links to `Jingxuan_Li_CV.pdf`, the two-page October 2026 CV. When replacing it in the future, update `cv_version` in `contents/config.yml` and rebuild.

## Content notes

The MARGENT author list follows the October 24, 2026 OpenReview submission revision; its venue is the NeurIPS 2026 **Workshop on Resource-Aware Agentic AI**, not the main conference. Value-Spectrum follows the [official ACL Anthology record](https://aclanthology.org/2025.acl-long.472/), including the full title and equal-contribution note. MARGENT’s equal-contribution markers for Yuning Yang and Jingxuan Li were confirmed by Jingxuan Li. Publication summaries describe the research rather than claiming unverified individual performance gains.

Original template by Sen Li, under the [MIT license](LICENSE). Existing legacy assets and PDF filenames are retained so previously shared links continue to work.
