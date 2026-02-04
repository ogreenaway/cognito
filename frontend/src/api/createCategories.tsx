import OpenAI from "openai";
import type { TopicsWithSubtopics } from "../types/topic";

const topicsSchema = {
  type: "json_schema",
  name: "topics_with_categories",
  schema: {
    type: "object",
    properties: {
      topics: {
        type: "array",
        items: {
          type: "object",
          properties: {
            code: { type: "string" },
            name: { type: "string" },
            categories: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  subtopics: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: { type: "string" },
                        name: { type: "string" },
                      },
                      required: ["code", "name"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["name", "subtopics"],
                additionalProperties: false,
              },
            },
          },
          required: ["code", "name", "categories"],
          additionalProperties: false,
        },
      },
    },
    required: ["topics"],
    additionalProperties: false,
  },
  strict: true,
} as const;

const createCategories = async (topicsWithSubtopics: TopicsWithSubtopics[]) => {
  const formattedTopics = JSON.stringify(
    topicsWithSubtopics.map((topic) => ({
      code: topic.topic.code,
      name: topic.topic.name,
      subtopics: topic.subtopics.map((subtopic) => ({
        name: subtopic.name,
        code: subtopic.code,
      })),
    }))
  );

  try {
    const client = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: `Here is an array of topics with subtopics for a child's revision: ${formattedTopics}. For each topic, group the subtopics into 2-5 categories. Return all topics and subtopics that have been provided.`,
      text: {
        format: topicsSchema,
      },
    });

    const topics = JSON.parse(response.output_text).topics;
    return topics;
  } catch (error) {
    throw new Error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export default createCategories;
