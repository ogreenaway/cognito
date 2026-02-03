## Context

The application is a React/TypeScript frontend built with create-react-app and SCSS. Design specifications for the Breadcrumbs component exist in `documentation/design/` including HTML markup structure, CSS styling, and visual reference (breadcrumbs.png).

The component will be static for now (hardcoded text values) with dynamic routing to be added later.

## Goals / Non-Goals

**Goals:**

- Match the visual design exactly across all breakpoints
- Create a reusable component structure that can later accept dynamic data
- Implement mobile horizontal scrolling with fade effects at <576px
- Keep styling isolated to the component

**Non-Goals:**

- Dynamic breadcrumb generation from route/props (future work)
- Accessibility features beyond basic semantics (aria labels, keyboard nav - future)
- Integration with React Router (future work)

## Decisions

### Decision 1: Component file structure

Place component files directly in `components/Breadcrumbs/`:

- `Breadcrumbs.tsx` - React component
- `Breadcrumbs.scss` - Component styles

**Rationale:** Simple flat structure. No barrel file per user preference. Import directly from the component file.

### Decision 2: Inline SVG icons

Embed SVG icons (home icon, separator slash) directly in the component rather than as separate icon files or an icon library.

**Rationale:**

- Only 2 small SVGs needed
- Matches the design documentation approach
- Avoids adding icon library dependency
- SVGs can use `currentColor` for easy theming

### Decision 3: SCSS with BEM-style class naming

Use plain SCSS (not CSS modules) with BEM-inspired naming: `.breadcrumbs`, `.breadcrumbs__wrapper`, `.breadcrumbs__crumb`, etc.

**Rationale:**

- Consistent with project's existing SCSS setup
- Clear, readable class names
- Easy to debug in browser dev tools

### Decision 4: Static content with click handlers

Hardcode the breadcrumb items in the component. Use `onClick` handlers with `window.alert()` for the demo placeholder links.

**Rationale:** User explicitly requested static text with alert handlers for demo purposes. Component structure will support dynamic data in future refactor.

## Risks / Trade-offs

**[Static content limits reusability]** → Acceptable for demo; component structure will support props-based data in future iteration.

**[No CSS modules means potential class name conflicts]** → Mitigated by using specific `.breadcrumbs` prefix on all classes.

**[Inline SVGs add component verbosity]** → Acceptable trade-off for simplicity; could extract to constants if component grows.
