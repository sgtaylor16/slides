# Lightweight Slides

This folder contains a tiny section-based slide deck for a single HTML document. It is designed to stay close to plain HTML, CSS, and a small amount of JavaScript.

## How It Works

Each slide is a top-level `section` element with the class `slide` inside the `main.deck` container. Only one slide is visible at a time.

The current implementation supports:

- keyboard navigation with `ArrowRight`, `ArrowDown`, and `Space`
- moving backward with `ArrowLeft` and `ArrowUp`
- restoring the current slide from the URL hash
- images and bulleted lists using normal HTML markup

## Open It

Open [index.html](index.html) in a browser. The page can be used directly from disk with no build step.

## Files

- [index.html](index.html) contains the slide content and loads the stylesheet and script.
- [styles.css](styles.css) controls slide layout, typography, spacing, and visibility.
- [slides.js](slides.js) handles keyboard input, active-slide state, and hash syncing.

## Writing Slides

Create one `section.slide` per slide. Keep the content inside a `.slide-content` wrapper when you want the default panel styling.

Example:

```html
<section class="slide" aria-label="My slide">
  <div class="slide-content stack">
    <h2>My heading</h2>
    <ul>
      <li>First point</li>
      <li>Second point</li>
    </ul>
  </div>
</section>
```

Images work as normal `<img>` tags. Bulleted lists work as normal `<ul>` and `<li>` elements.

## Navigation

- `ArrowRight`, `ArrowDown`, or `Space` advances to the next slide.
- `ArrowLeft` or `ArrowUp` goes back.
- Clicking anywhere on the page also advances one slide.

The current slide is stored in the URL hash, so reloading the page returns to the same slide.

## Customizing

You can change the look by editing `styles.css`:

- update the background colors in `:root`
- change the font stack in `body`
- adjust the card styling in `.slide-content`
- tune image sizing in `img`

If you want a different content layout, you can also remove the `.slide-content` wrapper and style the slide body directly.

## Notes

- This is intentionally lightweight and does not try to match Reveal.js feature-for-feature.
- Hidden slides are removed from view so only one section is shown at a time.
- The current version is best suited for simple presentations, demos, and documentation-style decks.