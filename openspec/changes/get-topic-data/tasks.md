## 1. Type Definitions

- [x] 1.1 Create `frontend/src/types/topic.ts` with `Topic` type and `TopicsAPIResponse` type
- [x] 1.2 Update `frontend/src/types/subtopic.ts` with full `Subtopic` type and `SubtopicsAPIResponse` type

## 2. GraphQL Queries

- [x] 2.1 Create `frontend/src/api/topicQuery.ts` with `TOPIC_QUERY` for courseTopics
- [x] 2.2 Add `SUBTOPIC_QUERY` for courseSubtopics to topicQuery.ts

## 3. Hook Implementation

- [x] 3.1 Create `frontend/src/hooks/useTopicData.ts` with useLazyQuery setup
- [x] 3.2 Implement getTopicData async function with topic fetching
- [x] 3.3 Add parallel subtopic fetching using Promise.all
- [x] 3.4 Add error throwing with descriptive messages
- [x] 3.5 Add console.log of topics on successful fetch

## 4. Integration

- [x] 4.1 Add useTopicData hook call to CoursePage component
