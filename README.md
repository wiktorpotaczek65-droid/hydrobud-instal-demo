# HydroBud Instal — demo

Strona demo dla firmy hydraulicznej **HydroBud Instal** (Kraków).
Statyczna witryna wizytówkowa: jeden ekran przewijany, sześć sekcji, formularz kontaktowy z optymistycznym stanem powodzenia.

## Stack

- `index.html` — semantyczna struktura
- `styles.css` — design tokens, animacje, layouty (CSS Grid + bento)
- `app.js` — IntersectionObserver (scroll reveal + sticky nav), obsługa formularza, smooth scroll

Bez frameworka. Bez build-stepu. Działa po prostu z hostowania plików statycznych — Vercel/Netlify/Cloudflare Pages.

## Filozofia projektu

Sklejone według zasad design engineeringu Emila Kowalskiego:

- animacje tylko na `transform` i `opacity` (hardware-accelerated),
- własne krzywe `cubic-bezier(0.23, 1, 0.32, 1)` zamiast słabego `ease-out`,
- `scale(0.97)` na `:active` na każdym przycisku — natychmiastowy feedback,
- żadnych animacji od `scale(0)` — wszystko startuje z `scale(0.985)` + `opacity: 0`,
- `prefers-reduced-motion` wyłącza ruch, zostawia tylko fade,
- `@media (hover: hover)` blokuje hover-stany na ekranach dotykowych.

## Uruchomienie lokalne

```bash
npx serve .
# lub po prostu otwórz index.html w przeglądarce
```

## Deploy

Repozytorium jest połączone z Vercelem.
Każdy push do `main` triggeruje produkcyjny deploy.
