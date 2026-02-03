## Why

The demo application needs page layout components to match the design documentation. Since we're not including the header or sidebar for this demo, we need a Page component to handle content centering across all breakpoints, along with supporting components for the page title, exam code badge, and horizontal rule separator.

## What Changes

- Add a `constants` folder with shared SCSS variables for breakpoints and colors
- Add a `Page` component that centers content and provides consistent padding across all breakpoints
- Add a `PageTitle` component (H1) displaying "AQA GCSE Biology Revision Notes" with muted/bold styling
- Add an `ExamCode` component displaying "Exam code: 8461" in a bordered badge style
- Add an `HR` component as a simple horizontal border separator
- Update `App.tsx` to use these components with the existing Breadcrumbs
- Remove the default CRA boilerplate content from App
- Refactor existing Breadcrumbs component to use shared constants

## Capabilities

### New Capabilities

- `style-constants`: Shared SCSS variables for breakpoints and colors used across all components
- `page-layout`: Page container component that centers content with responsive padding
- `page-title`: H1 title component with muted prefix and bold suffix styling
- `exam-code`: Badge-style component displaying exam code information
- `horizontal-rule`: Simple border-bottom separator component

### Modified Capabilities

None - these are all new components.

## Impact

- `frontend/src/constants/_breakpoints.scss`: Shared breakpoint variables
- `frontend/src/constants/_colors.scss`: Shared color variables
- `frontend/src/components/Page/Page.tsx`: New page layout component
- `frontend/src/components/Page/Page.scss`: Page layout styles (uses constants)
- `frontend/src/components/PageTitle/PageTitle.tsx`: New title component
- `frontend/src/components/PageTitle/PageTitle.scss`: Title styles (uses constants)
- `frontend/src/components/ExamCode/ExamCode.tsx`: New exam code badge component
- `frontend/src/components/ExamCode/ExamCode.scss`: Exam code styles (uses constants)
- `frontend/src/components/HR/HR.tsx`: New horizontal rule component
- `frontend/src/components/HR/HR.scss`: HR styles (uses constants)
- `frontend/src/components/Breadcrumbs/Breadcrumbs.scss`: Refactored to use shared constants
- `frontend/src/App.tsx`: Updated to compose all components
- `frontend/src/App.scss`: May need adjustments for new layout
