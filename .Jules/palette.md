## 2026-04-08 - Added Keyboard Accessibility to Experience Timeline Cards
**Learning:** Custom interactive elements designed as cards (like the experience timeline accordions) often lack keyboard support (`tabIndex`, `role`, and `onKeyDown`) out of the box, rendering them unusable for keyboard and screen reader users. Simply adding an `onClick` handler to a `<div>` or custom UI card is insufficient for a11y.
**Action:** Always ensure that custom interactive elements acting as buttons have `role="button"`, `tabIndex={0}`, keyboard event handlers (for `Enter` and `Space`), and proper `aria-expanded`/`aria-controls` attributes if they toggle content. Ensure focus states are clear using `focus-visible`. Update click handler types (e.g. from `React.MouseEvent` to `React.SyntheticEvent`) to safely handle both mouse and keyboard inputs.
## 2026-04-09 - Accessible State-Driven Icon Buttons
**Learning:** Icon-only buttons that toggle states (like a "Like" button) or handle asynchronous operations (like "Delete") are often inaccessible without explicit properties. Screen readers ignore standard text when `aria-label` is present or might not announce the visual state of the button (e.g. toggled active or loading).
**Action:** When implementing state-driven icon buttons:
1. Include `aria-pressed={boolean}` if the button toggles.
2. Provide a descriptive, dynamic `aria-label` (e.g. "Unlike post. 5 likes").
3. Use `aria-hidden="true"` on the inner decorative icons (like Lucide React components) so they aren't parsed incorrectly.
4. Add a `title` attribute to provide a native tooltip indicating disabled state reasons.
