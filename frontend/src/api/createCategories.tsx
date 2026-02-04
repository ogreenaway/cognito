import OpenAI from "openai";
import type { TopicsWithSubtopics } from "../types/topic";

const topicSchema = {
  type: "json_schema",
  name: "topic_with_categories",
  schema: {
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
  strict: true,
} as const;

const createCategories = async (topicsWithSubtopics: TopicsWithSubtopics[]) => {
  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const topicPromises = topicsWithSubtopics.map(
    async ({ topic, subtopics }) => {
      const formattedTopic = JSON.stringify({
        code: topic.code,
        name: topic.name,
        subtopics: subtopics.map((subtopic) => ({
          code: subtopic.code,
          name: subtopic.name,
        })),
      });

      const response = await client.responses.create({
        model: "gpt-4o-mini",
        input: `Here is a topic with subtopics for a child's revision: ${formattedTopic}. Group the subtopics into 2-5 categories. Return the topic with all subtopics that have been provided.`,
        text: {
          format: topicSchema,
        },
      });

      return JSON.parse(response.output_text);
    }
  );

  try {
    const topics = await Promise.all(topicPromises);
    return topics;
  } catch (error) {
    throw new Error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export default createCategories;
