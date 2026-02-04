import OpenAI from "openai";
import type { TopicsWithSubtopics } from "../../types/topic";
import { topicSchema } from "./topicSchema";

export const createTopicPromises = (
  client: OpenAI,
  topicsWithSubtopics: TopicsWithSubtopics[],
  onProgress: () => void
) => {
  return topicsWithSubtopics.map(async ({ topic, subtopics }) => {
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

    onProgress();

    return JSON.parse(response.output_text);
  });
};
