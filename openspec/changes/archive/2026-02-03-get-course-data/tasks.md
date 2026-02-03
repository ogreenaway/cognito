## 1. Environment Setup

- [x] 1.1 Create `frontend/.env` file with `REACT_APP_API_URL=https://feature-api.cognitoedu.org/graphql`
- [x] 1.2 Add `.env` to `frontend/.gitignore`

## 2. Apollo Client Setup

- [x] 2.1 Wrap app with `ApolloProvider` in `frontend/src/index.tsx`

## 3. Hooks Implementation

- [x] 3.1 Create `frontend/src/hooks/` directory
- [x] 3.2 Create `useCourseID` hook that extracts courseId from URL params using `useParams`
- [x] 3.3 Create `useCourseData` hook with GraphQL query and `useQuery` from Apollo
- [x] 3.4 Define `CourseData` TypeScript interface with all query fields

## 4. CoursePage Integration

- [x] 4.1 Import and call `useCourseID` and `useCourseData` hooks in CoursePage
- [x] 4.2 Add loading state with Bootstrap `Spinner` component
- [x] 4.3 Add error state with Bootstrap `alert-danger` alert
- [x] 4.4 Pass course data to child components (Breadcrumbs, ExamCode)

## 5. Component Updates

- [x] 5.1 Add `subject`, `examBoard`, `level` props to Breadcrumbs component with defaults
- [x] 5.2 Update Breadcrumbs to render dynamic values and construct URLs from props
- [x] 5.3 Add `code` prop to ExamCode component with default value
