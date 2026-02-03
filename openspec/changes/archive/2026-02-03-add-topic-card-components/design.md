## Context

The application needs topic card navigation components to display subject content organized by categories and subtopics. The existing codebase uses:

- React functional components with TypeScript
- SCSS with BEM naming convention (see `Breadcrumbs.scss`)
- Component folders with a `components/` subfolder for child components
- Static data initially (dynamic data integration deferred)

The design reference (`documentation/design/TopicCard.html` and `TopicCard.png`) shows:

- A container card with a section title header (e.g., "Organisation")
- Multiple collapsible category accordions inside the card body
- Each accordion contains a list of subtopic links
- Chevron icon in a circular container indicating expand/collapse state

## Goals / Non-Goals

**Goals:**

- Create reusable, composable components following existing codebase patterns
- Match the visual design from the reference files
- Implement smooth CSS transitions for accordion open/close animation
- Support multiple accordions open simultaneously (independent state)
- Use CSS Grid for the TopicCardGrid layout

**Non-Goals:**

- Dynamic data fetching (static data only for now)
- Routing integration (links use placeholder URLs)
- Accessibility features beyond basic semantic HTML (can be enhanced later)
- Unit tests (separate task)

## Decisions

### 1. Component Structure

**Decision:** Nest CategoryAccordion and SubtopicLink inside `TopicCard/components/`

**Rationale:** Follows the existing pattern in `Breadcrumbs/components/`. These components are tightly coupled to TopicCard and unlikely to be reused elsewhere.

**Alternatives considered:**

- Flat structure with all components at same level - rejected because it doesn't reflect the component hierarchy

### 2. Accordion State Management

**Decision:** Use local React state (`useState`) in each CategoryAccordion component

**Rationale:** Each accordion manages its own open/closed state independently. No need for lifted state or context since multiple accordions can be open simultaneously and there's no coordination required.

**Alternatives considered:**

- Single state array in TopicCard tracking all open accordions - unnecessarily complex for independent behavior
- CSS-only accordion with `:target` or checkbox hack - less flexible and harder to animate

### 3. Animation Approach

**Decision:** Calculate true content height with `useRef` and animate `height` property

**Rationale:** Measuring `scrollHeight` of the content container gives the exact pixel height needed. This produces consistent animation timing regardless of content size, avoiding the "snap" effect of `max-height` approaches.

**Implementation:**

- Use `useRef` to reference the collapsible content wrapper
- On toggle, read `ref.current.scrollHeight` to get true height
- Animate `height` from `0` to measured value (or vice versa)
- Use `overflow: hidden` during animation
- CSS transition handles the smooth interpolation

**Alternatives considered:**

- `max-height` with large value - rejected because animation timing is inconsistent (appears to snap when content is smaller than max)
- `height: auto` transition - doesn't work with CSS transitions
- CSS Grid `grid-template-rows: 0fr/1fr` - cleaner but less browser support for the `fr` unit animation

### 4. Grid Layout

**Decision:** Use CSS Grid with `repeat(auto-fill, minmax(300px, 1fr))` for responsive layout

**Rationale:** Automatically adjusts number of columns based on viewport width. Matches the design which shows multiple cards in a row.

### 5. Chevron Icon

**Decision:** Inline SVG component with CSS rotation transform for animation. Put the icon in a separate file in a components folder.

**Rationale:** Allows styling with CSS and smooth rotation animation. The design shows a chevron pointing down when closed, rotating 180° when open.

## Risks / Trade-offs

**[Risk] scrollHeight measurement requires DOM access**
→ Mitigation: Standard React pattern using `useRef`. Measurement happens on click, not on every render

**[Risk] Many accordions with many subtopics could cause performance issues**
→ Mitigation: Acceptable for static data. If dynamic data introduces hundreds of items, consider virtualization later

**[Trade-off] Static data means components aren't immediately reusable with different data**
→ Acceptable per requirements. Component props will be typed to accept data, making future dynamic integration straightforward
