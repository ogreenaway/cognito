import { gql } from "@apollo/client";

export const SUBTOPIC_QUERY = gql`
  query courseSubtopics(
    $courseCode: String!
    $topicCode: String!
    $searchPhrase: String
  ) {
    courseSubtopics(
      courseCode: $courseCode
      topicCode: $topicCode
      searchPhrase: $searchPhrase
    ) {
      id
      key
      code
      name
      masterCourseSubtopicCode
      subjectCode
      totalScore
      learnTotalScore
      learnElementCount
      revisionTotalScore
      revisionElementCount
      flashcardCount
      isHidden
      examQs
    }
  }
`;
