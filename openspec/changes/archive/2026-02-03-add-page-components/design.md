## Context

The frontend is a React/TypeScript application using SCSS for styling. We have an existing Breadcrumbs component with hardcoded colors and breakpoints. The design documentation in `documentation/design/` provides HTML structure, CSS, and visual references for all components.

This demo excludes the header and sidebar, so the Page component will serve as the main content wrapper.

## Goals / Non-Goals

**Goals:**

- Establish a constants system for shared styles (colors, breakpoints)
- Create reusable, statically-rendered page components matching the design
- Maintain consistency with existing Breadcrumbs component patterns
- Support all responsive breakpoints from the design

**Non-Goals:**

- Dynamic content/props (all text is static for now)
- Header or sidebar components
- Routing integration
- Dark mode support (future work)

## Decisions

### Decision 1: Constants folder structure

Place SCSS variables in `frontend/src/constants/`:

- `_breakpoints.scss` - Media query breakpoint values
- `_colors.scss` - Color palette variables

Components import directly: `@use '../../constants/breakpoints';` (underscore and extension optional in imports)

**Rationale:**

- Underscore prefix signals these are partials meant to be imported
- Explicit imports make dependencies clear
- No barrel file keeps it simple (consistent with component pattern)
- Centralized values prevent drift between components

**Alternatives considered:**

- CSS custom properties: Would work, but SCSS variables allow use in media queries
- Per-component constants: Rejected to avoid duplication and drift

### Decision 2: Component file structure

Each component gets its own folder with `.tsx` and `.scss` files:

```
components/
├── Page/
│   ├── Page.tsx
│   └── Page.scss
├── PageTitle/
│   ├── PageTitle.tsx
│   └── PageTitle.scss
...
```

**Rationale:** Consistent with existing Breadcrumbs pattern. No barrel files per user preference.

### Decision 3: Page component uses container pattern

Page component renders a wrapper div with responsive max-width and centered margins, using Bootstrap-like container breakpoints from the design.

**Rationale:** Matches the design's `container py-5 px-lg-5` pattern without adding Bootstrap dependency.

### Decision 4: Simple presentational components

PageTitle, ExamCode, and HR are simple presentational components with no props (static content). They can be extended later to accept props.

**Rationale:** User requested static content for the demo. Simple components are easier to test and modify later.

### Decision 5: BEM-style class naming with nested SCSS

Use `.component-name` as block with `&__element` nesting, consistent with Breadcrumbs refactor.

**Rationale:** Clean, maintainable SCSS that compiles to predictable class names.

## Risks / Trade-offs

**[Static content limits flexibility]** → Acceptable for demo; components can accept props in future iteration without breaking changes.

**[No CSS reset/normalize]** → May see browser inconsistencies. Mitigated by explicit styling on all elements.

**[Constants require @use in every file]** → Small overhead but ensures explicit dependencies and tree-shaking.
