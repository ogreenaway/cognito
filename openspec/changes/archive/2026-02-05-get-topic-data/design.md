## Context

The CoursePage currently displays topics and subtopics using hardcoded mock data. The GraphQL API provides two endpoints:

- `courseTopics` - returns all topics for a course
- `courseSubtopics` - returns subtopics for a specific topic

The data model is hierarchical: Course → Topics → Subtopics. To display the full topic tree, we need to first fetch all topics, then fetch subtopics for each topic.

## Goals / Non-Goals

**Goals:**

- Fetch topics and subtopics from the GraphQL API
- Use Apollo's lazy query pattern for on-demand data fetching
- Fetch subtopics in parallel for performance
- Provide clear error messages when fetching fails

**Non-Goals:**

- Caching or state management beyond Apollo's default
- Pagination of topics or subtopics
- Search functionality (searchPhrase will be null)
- Replacing the existing course data fetching pattern

## Decisions

### Decision 1: Use useLazyQuery instead of useQuery

**Choice**: Apollo `useLazyQuery` for both topic and subtopic queries

**Rationale**:

- Provides a callable function rather than auto-executing on render
- Enables sequential fetching: topics first, then subtopics
- Better control over when requests fire

**Alternatives considered**:

- `useQuery` with `skip` - more complex conditional logic needed
- Manual fetch with Apollo client - loses query caching benefits

### Decision 2: Parallel subtopic fetching with Promise.all

**Choice**: Use `Promise.all` to fetch all subtopics concurrently after topics load

**Rationale**:

- Subtopic requests are independent (each needs only courseCode + topicCode)
- Parallel execution significantly faster than sequential
- Single await point simplifies error handling

**Alternatives considered**:

- Sequential fetching - too slow for courses with many topics
- Batch GraphQL query - API doesn't support batched subtopic queries

### Decision 3: useEffect with async function pattern

**Choice**: `useEffect` that calls an async `getTopicData` function

**Rationale**:

- Clean separation of effect setup and async logic
- Standard React pattern for async operations in effects
- Easy to handle cleanup if needed later

### Decision 4: Throw errors for ErrorBoundary

**Choice**: Throw errors with descriptive messages instead of returning error state

**Rationale**:

- ErrorBoundary already exists and handles display
- Consistent error UI across the application
- Simplifies hook API (no error state to manage)

## Risks / Trade-offs

**[Risk: Many topics = many requests]** → Acceptable for now; courses typically have <20 topics. If performance issues arise, consider server-side aggregation.

**[Risk: Partial failure]** → If one subtopic request fails, the entire Promise.all rejects. Mitigation: Descriptive error message identifies which topic failed.

**[Trade-off: No loading state for subtopics]** → Hook only indicates initial loading. Could add granular loading states later if needed.
