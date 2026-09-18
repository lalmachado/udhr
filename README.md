# Universal Declaration of Human Rights

A single-page, scroll-driven presentation of the Universal Declaration of Human Rights: the preamble and all thirty articles, adopted by the United Nations General Assembly in Paris on 10 December 1948.

Built with Next.js (App Router), TypeScript, Tailwind CSS and [Motion](https://motion.dev). It exports to plain static files and deploys to Netlify with no server runtime.

## Structure

The page reads top to bottom:

1. **Hero** with the title, date and an index strip: one bar per article, coloured by part and sized by the length of its text.
2. **Preamble**: the seven "Whereas" recitals, each brightening as it reaches the reading line, followed by the proclamation.
3. **Five parts** (Dignity, Safety, Liberty, Community, Foundations), each opened by a full-bleed colour section and followed by its articles. Articles show their number, an editorial title, and the full text with numbered clauses where the original has them.
4. **Closing** with the resolution details and a link to the official text.
5. **Footer** with an index of all thirty articles.

Fixed chrome follows the reader: a progress bar along the top, a part navigation on the right (desktop), and an "Article n of 30" indicator at the bottom. All three take the colour of the part currently being read.

## Content

All text lives in [`data/articles.ts`](data/articles.ts) as a typed array (`UDHRArticle`) plus the preamble string. Presentation metadata for the five parts (names, colours, introductions) lives in [`data/groups.ts`](data/groups.ts). Clause splitting and preamble parsing happen at render time in [`lib/text.ts`](lib/text.ts), so the source text stays verbatim.

The groupings, article titles and part introductions are editorial and are not part of the Declaration.

## Accessibility

- Semantic landmarks and heading order: `h1` for the title, `h2` for the preamble, each part, the closing and the index, `h3` for every article.
- A skip link, visible focus rings on every interactive element, and a full keyboard-reachable article index in the footer.
- `prefers-reduced-motion` is honoured twice: Motion's `reducedMotion="user"` drops transform animations globally, and scroll-linked parallax is bypassed in each component.
- Decorative elements (giant numerals, the index strip, the floating indicator) are hidden from assistive technology.
- Reveal animations start hidden but a `<noscript>` stylesheet forces everything visible without JavaScript.
- Colour pairings were checked against WCAG AA for text.

## Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # static export to ./out
npm run lint
```

## Deploying to Netlify

The repo ships a [`netlify.toml`](netlify.toml) that runs `npm run build` and publishes the `out` directory. Push to GitHub, then in Netlify choose **Add new site → Import an existing project**, pick the repository and accept the detected settings.

## Licence

Code is released under the MIT licence (see [`LICENSE`](LICENSE)). The text of the Declaration is reproduced from the United Nations, which makes it freely available; this site is an independent presentation and is not affiliated with the United Nations.
