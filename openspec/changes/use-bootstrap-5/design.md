## Context

The frontend currently uses custom SCSS for styling with:

- `_colors.scss` defining color variables (#6e6e6e, #212529, #dee2e6, etc.)
- `_breakpoints.scss` defining responsive breakpoints (575.98px, 576px, 992px)
- Custom BEM-style classes in each component's `.scss` file

Bootstrap 5.0.2 was added via CDN but only partially utilized. Many custom styles duplicate Bootstrap's built-in utilities. Bootstrap 5.3 introduces better CSS custom property support, making it easier to customize the theme while using utility classes.

## Goals / Non-Goals

**Goals:**

- Replace custom CSS with Bootstrap utility classes where functionally equivalent
- Maintain pixel-perfect visual consistency with current design
- Establish Bootstrap 5.3 CSS variables as the theming system
- Reduce custom SCSS maintenance burden

**Non-Goals:**

- Adding new Bootstrap components (accordions, modals, etc.) - only migrating existing UI
- Implementing dark mode - only preparing the theming infrastructure
- Removing all custom CSS - some features require it (breadcrumb scroll, chevron circles)

## Decisions

### Decision 1: Use CDN for Bootstrap CSS (keep current approach)

**Choice**: Continue loading Bootstrap via CDN rather than npm/bundled

**Rationale**:

- CDN provides browser caching benefits across sites
- No build complexity for CSS
- Integrity hash ensures security
- Simpler upgrade path

**Alternatives considered**:

- npm install + SCSS import: More control but adds build complexity, larger bundle

### Decision 2: Override Bootstrap variables in index.scss, not via SCSS compilation

**Choice**: Use CSS custom property overrides in `:root` selector

**Rationale**:

- Works with CDN-loaded Bootstrap (no SCSS compilation of Bootstrap source)
- Enables runtime theming capability
- Keeps all theme customizations in one place

**Alternatives considered**:

- SCSS variable overrides before @import: Requires bundling Bootstrap source
- Inline styles in index.html: Less maintainable, no SCSS tooling

### Decision 3: Keep SCSS variables alongside CSS variable references

**Choice**: `_colors.scss` provides both `$color-text-muted: #6e6e6e` and `$var-text-muted: var(--bs-secondary-color)`

**Rationale**:

- SCSS variables work at compile time (in calc(), conditionals)
- CSS variables work at runtime (in final output)
- Gradual migration - existing SCSS imports continue working

### Decision 4: Minimal custom CSS for features Bootstrap lacks

**Choice**: Keep custom SCSS for:

- Breadcrumbs: Horizontal scroll, hidden scrollbar, fade gradients
- CategoryAccordion: Chevron icon circle with border, height animation

**Rationale**:

- Bootstrap's breadcrumb component uses different separators and doesn't scroll
- Bootstrap's collapse doesn't animate height smoothly without JS
- Keeping minimal custom CSS avoids fighting the framework

## Risks / Trade-offs

**Risk**: Bootstrap utility class names are verbose, reducing JSX readability  
→ **Mitigation**: Accept for simple cases; extract complex class combinations into CSS if needed

**Risk**: Bootstrap CDN updates could introduce visual regressions  
→ **Mitigation**: Pin specific version (5.3.3) with integrity hash; explicit upgrade process

**Risk**: Developers unfamiliar with Bootstrap utilities may add redundant custom CSS  
→ **Mitigation**: Document the pattern in style-constants spec; code review

**Trade-off**: Larger CSS payload from Bootstrap vs. smaller custom CSS  
→ **Accepted**: CDN caching offsets this; utility classes reduce component-specific CSS
