import type { Topic, TopicsWithSubtopics } from "../../types/topic";

import OpenAI from "openai";
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
    const topics: Topic[] = await Promise.all(topicPromises);
    return enrichTopicsWithNames(topics, topicsWithSubtopics);
  } catch (error) {
    throw new Error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export default createCategories;
