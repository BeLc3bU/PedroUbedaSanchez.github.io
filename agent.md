# Agent Context for "Currículum Interactivo SPA"

## 1. Project Goal

This project is a high-performance, framework-less Single-Page Application (SPA) that serves as the interactive online CV for Pedro Úbeda Sánchez. The primary goals are:
- **Modern UX:** Fast, seamless navigation without page reloads.
- **Performance:** Optimized for speed with techniques like code minification, asset preloading, and advanced caching.
- **Accessibility (a11y):** ARIA roles, focus management, and semantic HTML.
- **SEO:** Dynamic meta tag updates for each "page" and structured data.
- **PWA:** Installable and offline-capable using a Service Worker.

## 2. Core Technologies

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3.
- **Styling:** Tailwind CSS, processed with PostCSS (`cssnano` for minification).
- **Routing:** Custom client-side router built with the **History API** (`pushState`, `popstate`).
- **Animations:** **View Transitions API** for native, animated page transitions.
- **PWA/Offline:** **Service Worker API** (`sw.js`) with Network-First and Stale-While-Revalidate caching strategies.
- **Forms:** AJAX submission via Fetch API to FormSubmit, with reCAPTCHA v3 protection.
- **Testing:** End-to-End (E2E) tests using Cypress.
- **Build Tools:** `npm scripts`, `terser` (JS minify), `postcss-cli`, `browser-sync`.

## 3. Project Structure & Key Files

- `index.html`: The main application shell. It contains the `<header>`, `<main id="main-content">`, and `<footer>`. The content inside `#main-content` is dynamically replaced by the router.
- `*.html` (e.g., `experiencia.html`, `contacto.html`): These are **HTML fragments**, not full pages. The router fetches them and injects their content into `#main-content`. They also contain the specific `<title>` and `<meta>` tags for their respective sections, which are dynamically updated in the main document's `<head>`.
- `assets/js/main.js`: **The core of the application.** It contains:
  - The SPA router logic (`loadPageContent`).
  - Page content caching (`pageCache`).
  - Dynamic `<head>` meta-tag updates (`updateMetaTag`).
  - Initialization for all UI components (mobile menu, form validation, etc.).
  - Event listeners for navigation.
- `sw.js`: The Service Worker script that handles caching and offline functionality.
- `curriculum.html`: A separate, self-contained, printer-friendly version of the CV. It is loaded into a hidden `iframe` from the SPA to be printed without navigating away.
- `404.html`: A clever workaround for static hosting (like GitHub Pages). It catches direct requests to SPA routes (e.g., `site.com/experiencia`), and uses a script to redirect to `site.com/?p=/experiencia`. `main.js` then reads the `p` parameter and uses `history.replaceState` to clean the URL, effectively simulating server-side routing.
- `cypress/`: Contains Cypress E2E tests.
- `dist/`: The production-ready build output folder.

## 4. Key Logic Flow: SPA Navigation

1.  A user clicks a local link (e.g., `<a href="/experiencia">`).
2.  The main click listener in `main.js` intercepts the click, calls `event.preventDefault()`, and uses `history.pushState()` to update the URL without a page reload.
3.  The `loadPageContent(path)` function is called.
4.  It checks if the content for `/experiencia` is in the `pageCache`.
5.  If not, it displays a skeleton loader, `fetch`es `/experiencia.html`, parses the fragment, and extracts its `<section>`, `<title>`, and `<meta>` tags.
6.  The content is stored in the cache.
7.  The HTML from the fragment replaces the content of `#main-content`.
8.  The `<head>` of `index.html` is updated with the new title and meta tags.
9.  Page-specific scripts (like form validation for `contacto.html`) are initialized.
10. The `View Transitions API` is used to animate the content change smoothly.