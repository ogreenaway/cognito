import { graphql } from "msw";
import { mockCourseResponse } from "./mockCourse";
import { mockSubtopicsResponse } from "./mockSubtopic";
import { mockTopicsResponse } from "./mockTopic";

export const handlers = [
  graphql.query("course", (req, res, ctx) => {
    return res(ctx.data(mockCourseResponse.data));
  }),
  graphql.query("courseTopics", (req, res, ctx) => {
    return res(ctx.data(mockTopicsResponse.data));
  }),
  graphql.query("courseSubtopics", (req, res, ctx) => {
    return res(ctx.data(mockSubtopicsResponse.data));
  }),
];
