## Context

The CoursePage currently renders static, hardcoded data for breadcrumbs, exam code, and course information. The application already has Apollo Client configured in `apolloClient.tsx` but it's not wired into the React component tree. The routing is set up with `react-router` and the course ID is available via the URL pattern `/courseoverview/:courseId/lessons`.

The Cognito GraphQL API at `https://feature-api.cognitoedu.org/graphql` provides course data including subject name, exam board code, and level code needed for dynamic breadcrumbs.

## Goals / Non-Goals

**Goals:**

- Fetch course data from GraphQL API based on URL course code
- Display loading and error states in CoursePage
- Make Breadcrumbs and ExamCode components dynamic via props
- Store API URL securely in environment variables

**Non-Goals:**

- Caching strategy optimization (Apollo's default InMemoryCache is sufficient)
- Error retry logic or offline support
- Fetching topic/subtopic data (future change)

## Decisions

### 1. Two separate hooks: `useCourseID` and `useCourseData`

**Decision**: Create `useCourseID` to extract the course ID from URL params, and `useCourseData` to fetch data.

**Rationale**: Separation of concerns - URL parsing is distinct from data fetching. `useCourseID` can be reused anywhere that needs the course ID without triggering a fetch. `useCourseData` accepts the course code as a parameter, making it testable and reusable.

**Alternative considered**: Single `useCourseData` hook that internally uses `useParams`. Rejected because it couples data fetching to routing, making the hook less reusable and harder to test.

### 2. Environment variable for API URL

**Decision**: Store the GraphQL endpoint in `REACT_APP_API_URL` in `.env` file.

**Rationale**: Create React App automatically exposes `REACT_APP_*` variables to the client bundle. This allows different endpoints for development/staging/production without code changes.

**Alternative considered**: Hardcode the URL. Rejected because it makes environment-specific configuration impossible.

### 3. Bootstrap Spinner for loading state

**Decision**: Use `react-bootstrap/Spinner` with `animation="border"` for the loading indicator.

**Rationale**: Project already uses Bootstrap. Consistent with existing UI patterns and requires no additional dependencies.

### 4. Bootstrap Alert for error state

**Decision**: Use Bootstrap alert with `alert-danger` class for API errors.

**Rationale**: Standard Bootstrap pattern, provides clear visual feedback, accessible by default.

### 5. Props with defaults for Breadcrumbs

**Decision**: Add optional props (`subject`, `examBoard`, `level`) with sensible defaults to Breadcrumbs component.

**Rationale**: Maintains backward compatibility - component works without props. Allows gradual adoption and fallback if data is unavailable.

## Risks / Trade-offs

**[API unavailable]** → Display error alert with user-friendly message. No retry logic for MVP - user can refresh page.

**[Missing course data fields]** → Use optional chaining and default values. Breadcrumbs will show defaults if specific fields are null.

**[Environment variable not set]** → Apollo Client will fail silently. Document required `.env` setup in README.

**[Large GraphQL response]** → Query requests all fields but only a few are used currently. Acceptable for now; can optimize query later if performance becomes an issue.
