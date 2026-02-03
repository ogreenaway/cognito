## Why

The CoursePage currently displays hardcoded data. It needs to fetch real course data from the Cognito GraphQL API to display dynamic breadcrumbs, exam codes, and other course information based on the URL's course code.

## What Changes

- Add a new `useCourseID` hook that extracts the course ID from URL params
- Add a new `useCourseData` hook that fetches course data via Apollo `useQuery`
- Create a hooks directory at `frontend/src/hooks/`
- Configure Apollo Client with the GraphQL endpoint URL stored in environment variables
- Add `.env` file with `REACT_APP_API_URL` and update `.gitignore`
- Wrap the app with `ApolloProvider`
- Update `CoursePage` to:
  - Extract course code from URL params
  - Call `useCourseData` hook
  - Display loading spinner (Bootstrap) while fetching
  - Display error alert when API fails
  - Pass fetched data to child components
- Update `Breadcrumbs` component to accept `subject`, `examBoard`, and `level` props for dynamic rendering
- Update `ExamCode` component to accept a `code` prop

## Capabilities

### New Capabilities

- `course-data-fetching`: Hook and Apollo setup for fetching course data from the GraphQL API

### Modified Capabilities

- `breadcrumbs-navigation`: Adding props for dynamic subject, examBoard, and level display
- `exam-code`: Adding prop for dynamic exam code display

## Impact

- **Files created**: `frontend/src/hooks/useCourseID.ts`, `frontend/src/hooks/useCourseData.ts`, `frontend/.env`
- **Files modified**: `frontend/src/index.tsx` (ApolloProvider), `frontend/src/pages/CoursePage/CoursePage.tsx`, `frontend/src/components/Breadcrumbs/Breadcrumbs.tsx`, `frontend/src/components/ExamCode/ExamCode.tsx`, `frontend/.gitignore`
- **Dependencies**: Apollo Client (`@apollo/client`) - already installed
- **External API**: `https://feature-api.cognitoedu.org/graphql` (CORS open)
