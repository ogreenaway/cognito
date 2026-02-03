## Why

The application needs a navigation breadcrumb component to help users understand their location within the content hierarchy. The design documentation provides the exact visual specifications and responsive behavior to match.

## What Changes

- Add a new `Breadcrumbs` React component in `frontend/src/components/Breadcrumbs/`
- Component displays a horizontal navigation trail: Home icon → GCSE → Biology → AQA → Revision Notes
- Home icon links to the root URL (`/`)
- Middle navigation items (GCSE, Biology, AQA) trigger a JS alert indicating they won't be implemented in the demo
- Final item ("Revision Notes") displays as static, non-clickable current page indicator
- SCSS styling matches the design documentation across all breakpoints
- Mobile breakpoint (<576px) includes horizontal scroll with fade effects

## Capabilities

### New Capabilities

- `breadcrumbs-navigation`: Reusable breadcrumb component with home icon, parent links with separators, and current page indicator. Includes responsive styling for mobile horizontal scrolling.

### Modified Capabilities

None - this is a new component with no existing spec dependencies.

## Impact

- `frontend/src/components/Breadcrumbs/Breadcrumbs.tsx`: New component file
- `frontend/src/components/Breadcrumbs/Breadcrumbs.scss`: New stylesheet
- `frontend/src/App.tsx`: Will need to import and render the Breadcrumbs component
