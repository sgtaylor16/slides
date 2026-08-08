# Lightweight Slides

This folder contains a tiny section-based slide deck for a single HTML document. It is designed to stay close to plain HTML, CSS, and a small amount of JavaScript.

## How It Works

Each slide is a top-level `section` element with the class `slide` inside the `main.deck` container. Only one slide is visible at a time.

The current implementation supports:

- two-level navigation: main slides and optional sub-slides within each main slide
- `ArrowDown` / `ArrowUp` to move between main slides
- `ArrowRight` / `ArrowLeft` to step through sub-slides within the current main slide
- `Space` or click to smart-advance (step sub-slides first, then move to the next main slide)
- restoring the current position from the URL hash (`#main` or `#main/sub`)
- images and bulleted lists using normal HTML markup

## Open It

Open [index.html](index.html) in a browser. The page can be used directly from disk with no build step.

## Files

- [index.html](index.html) contains the slide content and loads the stylesheet and script.
- [styles.css](styles.css) controls slide layout, typography, spacing, and visibility.
- [slides.js](slides.js) handles keyboard input, active-slide state, and hash syncing.

## Writing Slides

### Flat slide (no sub-slides)

Create one `section.slide` per slide. Keep the content inside a `.slide-content` wrapper when you want the default panel styling.

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

### Slide with sub-slides

Nest `section.subslide` elements directly inside a `section.slide`. Each sub-slide holds its own content and is navigated with `ArrowRight` / `ArrowLeft`.

```html
<section class="slide" aria-label="My topic">
  <section class="subslide" aria-label="Step 1">
    <div class="slide-content stack">
      <h2>Step 1</h2>
      <p>First sub-slide content.</p>
    </div>
  </section>
  <section class="subslide" aria-label="Step 2">
    <div class="slide-content stack">
      <h2>Step 2</h2>
      <p>Second sub-slide content.</p>
    </div>
  </section>
</section>
```

## Navigation

| Key / action | Effect |
|---|---|
| `ArrowDown` | Move to the next main slide |
| `ArrowUp` | Move to the previous main slide |
| `ArrowRight` | Advance to the next sub-slide (if any) |
| `ArrowLeft` | Go back to the previous sub-slide (if any) |
| `Space` or click | Smart advance: step sub-slides first, then move to next main slide |

The current position is stored in the URL hash as `#slide` or `#slide/sub`, so reloading the page returns to the same location.

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