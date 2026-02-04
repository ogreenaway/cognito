import OpenAI from "openai";
import type { TopicsWithSubtopics } from "../types/topic";

const topicSchema = {
  type: "json_schema",
  name: "topic_with_categories",
  schema: {
    type: "object",
    properties: {
      code: { type: "string" },
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
                },
                required: ["code"],
                additionalProperties: false,
              },
            },
          },
          required: ["name", "subtopics"],
          additionalProperties: false,
        },
      },
    },
    required: ["code", "categories"],
    additionalProperties: false,
  },
  strict: true,
} as const;

const createCategories = async (
  topicsWithSubtopics: TopicsWithSubtopics[],
  setLoadingState: (loadingState: string) => void
) => {
  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const totalTopics = topicsWithSubtopics.length;
  let resolvedCount = 0;

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

      resolvedCount++;
      setLoadingState(`Created ${resolvedCount} of ${totalTopics} categories`);

      return JSON.parse(response.output_text);
    }
  );

  try {
    type SimplifiedSubtopic = {
      code: string;
      name: string;
    };
    type SimplifiedCategory = {
      name: string;
      subtopics: SimplifiedSubtopic[];
    };
    type SimplifiedTopic = {
      code: string;
      name: string;
      categories: SimplifiedCategory[];
    };

    const simplifiedTopics: SimplifiedTopic[] = await Promise.all(
      topicPromises
    );

    console.log("simplifiedTopics:", simplifiedTopics);

    const allSubtopicNames = topicsWithSubtopics.flatMap(
      ({ subtopics }) => subtopics
    );

    console.log("allSubtopicNames:", allSubtopicNames);
    const topics = simplifiedTopics.map(({ code, categories }) => {
      const topicName = topicsWithSubtopics.find(
        ({ topic }) => topic.code === code
      )?.topic.name;
      if (!topicName) {
        throw new Error(`Topic name not found for code: ${code}`);
      }
      return {
        code,
        name: topicName,
        categories: categories.map(({ name, subtopics }) => ({
          name,
          subtopics: subtopics.map(({ code }) => {
            const subtopicName = allSubtopicNames.find(
              (subtopic) => subtopic.code === code
            )?.name;
            if (!subtopicName) {
              throw new Error(`Subtopic name not found for code: ${code}`);
            }
            return {
              code,
              name: subtopicName,
            };
          }),
        })),
      };
    });
    return topics;
  } catch (error) {
    throw new Error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export default createCategories;
