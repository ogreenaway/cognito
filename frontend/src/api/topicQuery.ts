import { gql } from "@apollo/client";

export const TOPIC_QUERY = gql`
  query courseTopics($courseCode: String!, $searchPhrase: String) {
    courseTopics(courseCode: $courseCode, searchPhrase: $searchPhrase) {
      code
      name
    }
  }
`;
