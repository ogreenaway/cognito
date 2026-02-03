# Course Data Fetching

### Requirement: useCourseID hook extracts course ID from URL

The `useCourseID` hook SHALL extract and return the course ID from the current URL parameters.

#### Scenario: Hook returns course ID from URL

- **WHEN** the URL matches `/courseoverview/:courseId/lessons`
- **THEN** the hook returns the `courseId` parameter value

#### Scenario: Hook returns undefined when no course ID

- **WHEN** the URL does not contain a `courseId` parameter
- **THEN** the hook returns `undefined`

### Requirement: useCourseData hook fetches course data via GraphQL

The `useCourseData` hook SHALL accept a course code string and fetch course data from the GraphQL API using Apollo's `useQuery`.

#### Scenario: Hook fetches data for valid course code

- **WHEN** `useCourseData` is called with a valid course code
- **THEN** it executes the GraphQL `course` query with the code as a variable
- **AND** returns `{ course, loading, error }` object

#### Scenario: Hook skips query when course code is empty

- **WHEN** `useCourseData` is called with an empty string
- **THEN** it does not execute the GraphQL query
- **AND** returns `{ course: undefined, loading: false, error: undefined }`

### Requirement: Course query returns all required fields

The GraphQL query SHALL request all course fields including `id`, `code`, `name`, `subjectCode`, `subjectName`, `levelCode`, `examBoardCode`, and other metadata fields.

#### Scenario: Query includes breadcrumb-related fields

- **WHEN** the course query executes
- **THEN** the response includes `subjectName`, `examBoardCode`, and `levelCode`

### Requirement: Apollo Client configured with environment variable

The Apollo Client SHALL be configured with the GraphQL endpoint URL from the `REACT_APP_API_URL` environment variable.

#### Scenario: Client uses environment variable for endpoint

- **WHEN** the Apollo Client is initialized
- **THEN** it uses `process.env.REACT_APP_API_URL` as the HTTP link URI

### Requirement: App wrapped with ApolloProvider

The application root SHALL be wrapped with `ApolloProvider` to enable Apollo hooks throughout the component tree.

#### Scenario: ApolloProvider wraps router

- **WHEN** the app renders
- **THEN** `ApolloProvider` wraps the `BrowserRouter` component
- **AND** it provides the configured Apollo Client instance

### Requirement: CoursePage displays loading state

The CoursePage SHALL display a Bootstrap spinner while course data is being fetched.

#### Scenario: Loading spinner shown during fetch

- **WHEN** `useCourseData` returns `loading: true`
- **THEN** CoursePage renders a centered Bootstrap `Spinner` component
- **AND** the spinner has `animation="border"`
- **AND** the spinner has visually hidden "Loading..." text for accessibility

### Requirement: CoursePage displays error state

The CoursePage SHALL display an error alert when the API request fails.

#### Scenario: Error alert shown on API failure

- **WHEN** `useCourseData` returns an error
- **THEN** CoursePage renders a Bootstrap alert with `alert-danger` class
- **AND** the alert displays a user-friendly error message

### Requirement: Environment variable stored securely

The API URL SHALL be stored in a `.env` file that is excluded from version control.

#### Scenario: .env file contains API URL

- **WHEN** the application is configured
- **THEN** `.env` contains `REACT_APP_API_URL=https://feature-api.cognitoedu.org/graphql`

#### Scenario: .env excluded from git

- **WHEN** `.gitignore` is configured
- **THEN** it includes `.env` to prevent committing secrets
