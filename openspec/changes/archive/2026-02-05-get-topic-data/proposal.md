## Why

The CoursePage currently uses hardcoded mock data for topics and subtopics. We need to fetch real topic and subtopic data from the GraphQL API to display actual course content organized by topic with their subtopics.

## What Changes

- Add `topicQuery.ts` with GraphQL queries for `courseTopics` and `courseSubtopics`
- Create `useTopicData` hook that:
  - Accepts `courseId` parameter
  - Uses Apollo `useLazyQuery` to enable on-demand fetching
  - Fetches all topics for the course, then fetches subtopics for each topic in parallel using `Promise.all`
  - Throws descriptive errors on failure (handled by ErrorBoundary)
- Add new TypeScript types for `Topic` and `Subtopic` API responses
- Integrate `useTopicData` hook into `CoursePage`

## Capabilities

### New Capabilities

- `topic-data-fetching`: Hook and GraphQL queries to fetch topics and their subtopics for a course, with parallel subtopic fetching and error handling

### Modified Capabilities

<!-- No existing spec requirements are changing - this adds new functionality alongside existing course-data-fetching -->

## Impact

- **New files**:
  - `frontend/src/api/topicQuery.ts` - GraphQL queries
  - `frontend/src/hooks/useTopicData.ts` - Data fetching hook
  - `frontend/src/types/topic.ts` - Topic type definitions
- **Modified files**:
  - `frontend/src/pages/CoursePage/CoursePage.tsx` - Add useTopicData hook call
  - `frontend/src/types/subtopic.ts` - May need to extend with additional API fields
- **Dependencies**: Uses existing `@apollo/client` package (useLazyQuery)
