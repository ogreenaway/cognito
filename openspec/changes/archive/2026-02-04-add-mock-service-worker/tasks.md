## 1. Setup Dependencies

- [x] 1.1 Install MSW as a dev dependency (`npm install --save-dev msw`)

## 2. Create Test Folder Structure

- [x] 2.1 Create `frontend/src/tests/` directory (inside src for CRA compatibility)
- [x] 2.2 Create `frontend/src/tests/utils/` directory
- [x] 2.3 Create `frontend/src/tests/mocks/` directory
- [x] 2.4 Create `frontend/src/tests/pages/CoursePage/` directory (shadow structure)

## 3. Create Mock Data

- [x] 3.1 Create `tests/mocks/mockCourse.ts` with the mock course data object

## 4. Create MSW Handlers

- [x] 4.1 Create `tests/mocks/handlers.ts` with GraphQL handler for course query
- [x] 4.2 Create `tests/mocks/server.ts` to export the MSW server instance

## 5. Configure MSW in Jest

- [x] 5.1 Update `src/setupTests.ts` to import and configure MSW server lifecycle (beforeAll, afterEach, afterAll)

## 6. Create Test Utilities

- [x] 6.1 Create `tests/utils/renderApp.tsx` with renderApp function that wraps app with ApolloProvider and RouterProvider
- [x] 6.2 Export server from utils for test overrides

## 7. Migrate Existing Tests

- [x] 7.1 Move `src/pages/CoursePage/CoursePage.test.tsx` to `src/tests/pages/CoursePage/CoursePage.test.tsx`
- [x] 7.2 Update test to use `renderApp()` instead of direct `render()`
- [x] 7.3 Update test to use async `findByText` for waiting on mock data

## 8. Verify

- [x] 8.1 Run `npm test` and confirm tests pass with mocked data
