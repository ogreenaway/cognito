import { graphql } from "msw";
import { mockCourseResponse } from "./mockCourse";

export const handlers = [
  graphql.query("course", (req, res, ctx) => {
    return res(ctx.data(mockCourseResponse.data));
  }),
];
