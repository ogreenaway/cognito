## Why

The project uses custom SCSS for layout, colors, and responsive breakpoints that largely duplicate Bootstrap's built-in functionality. By adopting Bootstrap 5.3's utility classes and CSS custom properties, we can reduce custom CSS, improve consistency, and gain access to Bootstrap's extensive component library for future features.

## What Changes

- **BREAKING**: Upgrade Bootstrap from 5.0.2 to 5.3.3 in `index.html`
- Add Bootstrap CSS variable overrides in `index.scss` to match design color palette (`--bs-secondary-color: #6e6e6e`)
- Replace custom SCSS classes with Bootstrap utility classes where equivalent functionality exists
- Components retain visual appearance but use Bootstrap classes instead of custom CSS:
  - `Page`: Use `container py-5 px-lg-5` instead of `.page`
  - `HR`: Use `border-bottom` instead of `.hr`
  - `PageTitle`: Use `h2` + `text-secondary` instead of custom classes
  - `ExamCode`: Use `d-inline-block p-2 border rounded bg-body-secondary text-secondary`
  - `TopicCard`: Use `bg-body-secondary border rounded` + utility classes
  - `TopicCardGrid`: Use Bootstrap's `row gy-4` + `col-md-6` grid
- Breadcrumbs and CategoryAccordion retain minimal custom CSS for features Bootstrap doesn't provide (scroll behavior, chevron icon circle)

## Capabilities

### New Capabilities

- `bootstrap-theming`: Bootstrap 5.3 CSS variable overrides and theme configuration for consistent styling

### Modified Capabilities

- `style-constants`: Color and breakpoint variables now map to Bootstrap CSS custom properties rather than standalone SCSS variables

## Impact

- **Dependencies**: Bootstrap CSS upgraded from 5.0.2 to 5.3.3
- **Files affected**:
  - `frontend/public/index.html` (Bootstrap CDN link)
  - `frontend/src/index.scss` (theme overrides)
  - `frontend/src/constants/_colors.scss` (CSS variable mappings)
  - All component `.tsx` and `.scss` files
- **Breaking**: None for consumers - visual output remains identical
- **Bundle size**: Custom CSS reduced; Bootstrap CSS increases slightly but is cached via CDN
