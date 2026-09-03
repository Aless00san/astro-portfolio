# Astro Portfolio

A modern, single-page developer portfolio built with [Astro](https://astro.build/) and [Bulma](https://bulma.io/).

## ✨ Features

- **Hero** — name, tagline, and call-to-action buttons
- **About** — portrait and bio, plus an animated tech-logo carousel
- **Experience** — responsive timeline of roles and technologies
- **Projects** — card grid with descriptions and tech tags
- **Contact** — Formspree-powered contact form

## 🧰 Tech Stack

- [Astro](https://astro.build/) — static site generator
- [Bulma](https://bulma.io/) — CSS framework
- CSS custom properties for a centralized design system

## 🧞 Commands

All commands run from the root of the project, from a terminal:

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `pnpm install`  | Installs dependencies                       |
| `pnpm dev`      | Starts local dev server at `localhost:4321` |
| `pnpm build`    | Build your production site to `./dist/`     |
| `pnpm preview`  | Preview your build locally before deploying |
| `pnpm astro …`  | Run CLI commands like `astro add`           |

## 🚀 Deployment (GitHub Pages)

The site deploys automatically to GitHub Pages via the workflow in
`.github/workflows/deploy.yml`. It is a **project site**, so it is served
under the `/astro-portfolio/` base path.

To publish:

1. Push to the `master` branch — the build/deploy workflow runs automatically.
2. Ensure **Settings → Pages → Source** is set to **"GitHub Actions"**.
3. Your site will be available at
   `https://<your-username>.github.io/astro-portfolio/`.