import OpenAI from "openai";
import type { SimplifiedTopic } from "./simplifiedTypes";
import type { TopicsWithSubtopics } from "../../types/topic";
import { createTopicPromises } from "./createTopicPromises";
import { enrichTopicsWithNames } from "./enrichTopicsWithNames";

const createCategories = async (
  topicsWithSubtopics: TopicsWithSubtopics[],
  setLoadingState: (loadingState: string) => void
) => {
  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  let resolvedCount = 0;

  const topicPromises = createTopicPromises(client, topicsWithSubtopics, () => {
    resolvedCount++;
    setLoadingState(
      `Created categories for ${resolvedCount} of ${topicsWithSubtopics.length} topics`
    );
  });

  try {
    const simplifiedTopics: SimplifiedTopic[] = await Promise.all(
      topicPromises
    );
    return enrichTopicsWithNames(simplifiedTopics, topicsWithSubtopics);
  } catch (error) {
    throw new Error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export default createCategories;
