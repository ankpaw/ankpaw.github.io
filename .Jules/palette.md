## 2026-04-08 - Added Keyboard Accessibility to Experience Timeline Cards

**Learning:** Custom interactive elements designed as cards (like the experience timeline accordions) often lack keyboard support (`tabIndex`, `role`, and `onKeyDown`) out of the box, rendering them unusable for keyboard and screen reader users. Simply adding an `onClick` handler to a `<div>` or custom UI card is insufficient for a11y.
**Action:** Always ensure that custom interactive elements acting as buttons have `role="button"`, `tabIndex={0}`, keyboard event handlers (for `Enter` and `Space`), and proper `aria-expanded`/`aria-controls` attributes if they toggle content. Ensure focus states are clear using `focus-visible`. Update click handler types (e.g. from `React.MouseEvent` to `React.SyntheticEvent`) to safely handle both mouse and keyboard inputs.

## 2026-04-27 - Added Accessibility to Engagement Like Button

**Learning:** State-driven icon + count buttons (e.g. Likes) need comprehensive ARIA attributes. A simple `<button>` with an icon and number is confusing for screen readers. The `aria-label` must combine BOTH the action ("Like" / "Unlike") and the value ("currently N likes") because an `aria-label` completely overrides the inner text content (like the count) for screen readers.
**Action:** Always include `aria-pressed={state}` for toggle buttons, combine action and current count in `aria-label`, hide decorative inner icons with `aria-hidden="true"`, and provide a `title` explaining disabled states (e.g., "Sign in to like this post").
