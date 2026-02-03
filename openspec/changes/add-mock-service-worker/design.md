## Context

The frontend uses Apollo Client to fetch data from a GraphQL API at `https://feature-api.cognitoedu.org/graphql`. Current tests either skip API testing or fail when the API is unavailable. The project uses Create React App with Jest and React Testing Library.

The existing test file (`CoursePage.test.tsx`) is co-located with the component in `src/pages/CoursePage/`. This works but doesn't scale well as the test suite grows and needs shared utilities.

## Goals / Non-Goals

**Goals:**

- Establish a scalable test folder structure separate from source code
- Enable offline, deterministic testing of GraphQL-dependent components
- Provide a reusable `renderApp` utility that handles provider setup
- Create a pattern for organizing mock data

**Non-Goals:**

- Browser-based MSW service worker setup (node-only for Jest)
- E2E testing infrastructure
- Mocking non-GraphQL endpoints
- Test coverage requirements or CI integration

## Decisions

### 1. Shadow folder structure in `frontend/tests/`

**Decision**: Create `frontend/tests/` with subdirectories mirroring `src/` (e.g., `tests/pages/CoursePage/`).

**Rationale**: Separating tests from source keeps `src/` focused on production code while maintaining clear correspondence between test and source files. The shadow structure makes it obvious which component each test covers.

**Alternatives considered**:

- Co-located tests (current): Simple but mixes concerns; harder to share test utilities
- Flat `__tests__/` folder: Loses the organizational benefit of mirroring source structure

### 2. MSW with node server for Jest

**Decision**: Use MSW's `setupServer` for Node.js environment (not the browser service worker).

**Rationale**: Jest runs in Node, so we use MSW's node adapter. This intercepts requests at the network level without needing a real server. MSW is well-maintained, has excellent TypeScript support, and works seamlessly with Apollo Client.

**Alternatives considered**:

- Apollo MockedProvider: Tightly coupled to Apollo; harder to reuse for non-Apollo tests
- jest.mock on fetch: Low-level, error-prone, doesn't match real network behavior
- nock: Good for REST but less ergonomic for GraphQL

### 3. renderApp utility with MemoryRouter

**Decision**: Create `renderApp(path)` that wraps the component tree with `ApolloProvider` and `MemoryRouter`, setting the initial route.

**Rationale**: Most components need both providers. `MemoryRouter` allows setting the URL path (for route params like `courseId`) without browser history. Default path is `/courseoverview/p2-gcse-edexcel-h-t/lessons` matching the mock course.

### 4. Mocks folder with typed mock data

**Decision**: Create `tests/mocks/` with individual files per mock (e.g., `mockCourse.ts`).

**Rationale**: Centralized mocks can be reused across tests. Typed mock data ensures mocks stay in sync with actual API shapes. Separating mocks from handlers keeps each file focused.

### 5. Default GraphQL handler returning mock course

**Decision**: Configure a default MSW handler for the GraphQL endpoint that returns mock course data for any `course` query.

**Rationale**: Most tests will need course data. Individual tests can override with `server.use()` for specific scenarios.

## Risks / Trade-offs

**[Risk] Mock data drift** → Keep mock data minimal and update when API types change. Consider generating mocks from GraphQL schema in future.

**[Risk] Tests pass but real API fails** → MSW mimics network behavior closely, but integration tests against staging API should complement unit tests.

**[Trade-off] Separate test folder requires Jest config update** → Minor config change; benefit of clean separation outweighs cost.
