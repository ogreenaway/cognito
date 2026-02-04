import { gql } from "@apollo/client";

// TODO: only get the fields we need
export const COURSE_QUERY = gql`
  query course($code: String!) {
    course(code: $code) {
      code
      version
      subjectName
      levelCode
      examBoardCode
    }
  }
`;
