import { gql } from "@apollo/client";

// TODO: only get the fields we need
export const COURSE_QUERY = gql`
  query course($code: String!) {
    course(code: $code) {
      id
      code
      name
      version
      totalScore
      subtopicCount
      flashcardCount
      subjectCode
      subjectName
      learnTotalScore
      learnElementCount
      revisionTotalScore
      keywords
      higherFoundation
      tripleCombined
      alternateHigherFoundationCourse
      levelCode
      examBoardCode
      includeYearSections
      includesSections
      alternativeTopicName
      hasPastPapers
      hasQsByTopic
      hasExamQsCourse
      hasExamMCQsCourse
      examQs
      pastPapersCategoryKey
      qsByTopicCategoryKey
      pastPapersOnly
      courseVersion
    }
  }
`;
