## ADDED Requirements

### Requirement: Test folder structure

The system SHALL have a `frontend/tests/` directory with a shadow folder structure mirroring `frontend/src/`. Test files for components SHALL be placed in corresponding paths (e.g., `tests/pages/CoursePage/CoursePage.test.tsx` for `src/pages/CoursePage/CoursePage.tsx`).

#### Scenario: Shadow structure matches source

- **WHEN** a test file exists for a component at `src/pages/CoursePage/CoursePage.tsx`
- **THEN** the test file SHALL be located at `tests/pages/CoursePage/CoursePage.test.tsx`

### Requirement: Test utilities folder

The system SHALL have a `frontend/tests/utils/` directory containing shared test utilities.

#### Scenario: Utils folder exists

- **WHEN** tests need shared utilities
- **THEN** the utilities SHALL be importable from `tests/utils/`

### Requirement: renderApp utility function

The system SHALL provide a `renderApp` function in `tests/utils/renderApp.tsx` that renders the application with all necessary providers and routing.

#### Scenario: Default route rendering

- **WHEN** `renderApp()` is called with no arguments
- **THEN** the app SHALL render at the path `/courseoverview/p2-gcse-edexcel-h-t/lessons`

#### Scenario: Custom route rendering

- **WHEN** `renderApp("/some/custom/path")` is called with a path argument
- **THEN** the app SHALL render at the specified path

#### Scenario: Provider wrapping

- **WHEN** `renderApp()` is called
- **THEN** the rendered component tree SHALL be wrapped with `ApolloProvider` and `MemoryRouter`

### Requirement: Mocks folder

The system SHALL have a `frontend/tests/mocks/` directory containing mock data files.

#### Scenario: Mock course data

- **WHEN** tests need course data
- **THEN** a `mockCourse.ts` file SHALL export the mock course object

### Requirement: MSW server configuration

The system SHALL configure MSW to intercept network requests during tests. The MSW server SHALL be started before all tests and stopped after all tests.

#### Scenario: Server lifecycle in setupTests

- **WHEN** Jest runs tests
- **THEN** the MSW server SHALL start before all tests via `beforeAll`
- **AND** reset handlers after each test via `afterEach`
- **AND** close after all tests via `afterAll`

### Requirement: Default GraphQL handler

The system SHALL provide a default MSW handler that intercepts GraphQL requests to `https://feature-api.cognitoedu.org/graphql` and returns mock course data for course queries.

#### Scenario: Course query returns mock data

- **WHEN** a GraphQL query for `course` is made during a test
- **THEN** the handler SHALL return the mock course data without making a real network request

#### Scenario: Handler can be overridden

- **WHEN** a test needs different mock data
- **THEN** the test SHALL be able to use `server.use()` to override the default handler
