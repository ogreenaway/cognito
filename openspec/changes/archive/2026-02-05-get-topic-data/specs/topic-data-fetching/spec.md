# Topic Data Fetching

## ADDED Requirements

### Requirement: topicQuery defines courseTopics GraphQL query

The `topicQuery.ts` file SHALL export a `TOPIC_QUERY` constant containing a GraphQL query for `courseTopics` that accepts `courseCode` and optional `searchPhrase` variables.

#### Scenario: Query requests required topic fields

- **WHEN** the `TOPIC_QUERY` is defined
- **THEN** it requests the following fields: `code`, `name`, `totalScore`, `learnTotalScore`, `learnElementCount`, `revisionTotalScore`, `revisionElementCount`, `flashcardCount`, `isHidden`, `parentSection`, `subtopicCount`

### Requirement: topicQuery defines courseSubtopics GraphQL query

The `topicQuery.ts` file SHALL export a `SUBTOPIC_QUERY` constant containing a GraphQL query for `courseSubtopics` that accepts `courseCode`, `topicCode`, and optional `searchPhrase` variables.

#### Scenario: Query requests required subtopic fields

- **WHEN** the `SUBTOPIC_QUERY` is defined
- **THEN** it requests the following fields: `id`, `key`, `code`, `name`, `masterCourseSubtopicCode`, `subjectCode`, `totalScore`, `learnTotalScore`, `learnElementCount`, `revisionTotalScore`, `revisionElementCount`, `flashcardCount`, `isHidden`, `examQs`

### Requirement: useTopicData hook fetches topics using lazy query

The `useTopicData` hook SHALL use Apollo's `useLazyQuery` to create a callable function for fetching topics on demand.

#### Scenario: Hook accepts courseId parameter

- **WHEN** `useTopicData` is called with a `courseId` string
- **THEN** it initializes lazy queries for topics and subtopics

### Requirement: useTopicData executes getTopicData in useEffect

The `useTopicData` hook SHALL use `useEffect` to call an async `getTopicData` function when the courseId changes.

#### Scenario: Effect triggers on courseId change

- **WHEN** the `courseId` parameter changes
- **THEN** the `getTopicData` async function is called
- **AND** `searchPhrase` is set to `null` for both queries

### Requirement: getTopicData fetches topics first

The `getTopicData` function SHALL first fetch all topics for the course using the `TOPIC_QUERY`.

#### Scenario: Topics fetched with courseCode

- **WHEN** `getTopicData` executes
- **THEN** it calls the topic query with `courseCode` set to the `courseId`
- **AND** `searchPhrase` set to `null`

### Requirement: getTopicData fetches subtopics in parallel

The `getTopicData` function SHALL fetch subtopics for all topics concurrently using `Promise.all`.

#### Scenario: Subtopics fetched for each topic

- **WHEN** topics are successfully fetched
- **THEN** subtopic queries are executed for each topic in parallel
- **AND** each query includes `courseCode`, `topicCode` (the topic's code), and `searchPhrase: null`

### Requirement: useTopicData logs topics on success

The `useTopicData` hook SHALL log all fetched topics to the console upon successful data retrieval.

#### Scenario: Console log after successful fetch

- **WHEN** all topics and subtopics are fetched successfully
- **THEN** `console.log` is called with the topics data

### Requirement: useTopicData throws on error

The `useTopicData` hook SHALL throw an error with a descriptive message when any API request fails, allowing the ErrorBoundary to handle display.

#### Scenario: Topic fetch error throws

- **WHEN** the topic query returns an error
- **THEN** an error is thrown with a message indicating topic fetch failure
- **AND** the original error details are included

#### Scenario: Subtopic fetch error throws

- **WHEN** any subtopic query returns an error
- **THEN** an error is thrown with a message indicating which topic's subtopics failed
- **AND** the original error details are included

### Requirement: Topic type defined

The `topic.ts` file SHALL export a `Topic` type matching the GraphQL `courseTopics` response structure.

#### Scenario: Type includes all topic fields

- **WHEN** the `Topic` type is defined
- **THEN** it includes: `code`, `name`, `totalScore`, `learnTotalScore`, `learnElementCount`, `revisionTotalScore`, `revisionElementCount`, `flashcardCount`, `isHidden`, `parentSection`, `subtopicCount`

### Requirement: Subtopic type extended

The `subtopic.ts` file SHALL export a `Subtopic` type matching the GraphQL `courseSubtopics` response structure.

#### Scenario: Type includes all subtopic fields

- **WHEN** the `Subtopic` type is defined
- **THEN** it includes: `id`, `key`, `code`, `name`, `masterCourseSubtopicCode`, `subjectCode`, `totalScore`, `learnTotalScore`, `learnElementCount`, `revisionTotalScore`, `revisionElementCount`, `flashcardCount`, `isHidden`, `examQs`

### Requirement: CoursePage uses useTopicData hook

The `CoursePage` component SHALL call the `useTopicData` hook with the course ID from `useCourseID`.

#### Scenario: Hook called with courseId

- **WHEN** `CoursePage` renders
- **THEN** it calls `useTopicData(courseId)` where `courseId` comes from `useCourseID()`

