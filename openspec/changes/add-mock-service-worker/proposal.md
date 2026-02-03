## Why

The frontend currently lacks proper test infrastructure for components that fetch data from the GraphQL API. Tests cannot run in isolation because they depend on live API responses. Adding Mock Service Worker (MSW) enables reliable, offline testing by intercepting network requests and returning controlled mock data.

## What Changes

- Create a dedicated `tests/` folder at `frontend/src/tests/` with a shadow folder structure mirroring `src/` (inside src for CRA compatibility)
- Move existing test files (e.g., `CoursePage.test.tsx`) to the shadow structure
- Add a `tests/utils/` folder with a `renderApp` function that wraps components with necessary providers (Apollo, Router)
- Add a `tests/mocks/` folder for mock data (starting with `mockCourse.ts`)
- Install and configure MSW to intercept GraphQL requests to `https://feature-api.cognitoedu.org/graphql`
- Set up MSW handlers that return mock course data by default

## Capabilities

### New Capabilities

- `test-infrastructure`: Test folder structure, renderApp utility, and MSW setup for mocking GraphQL requests

### Modified Capabilities

None - this change adds new testing infrastructure without modifying existing spec requirements.

## Impact

- **Dependencies**: Adds `msw` as a dev dependency
- **Test files**: Existing test files will be relocated to the new folder structure
- **setupTests.ts**: Will be updated to configure MSW server lifecycle
- **package.json**: May need Jest configuration updates for the new test location
