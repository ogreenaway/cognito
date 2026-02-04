import type { SimplifiedTopic, Topic, TopicsAPIResponse } from "../types/topic";
import { useEffect, useState } from "react";

import { ApolloClient } from "@apollo/client";
import { SUBTOPIC_QUERY } from "../api/subtopicQuery";
import type { SubtopicsAPIResponse } from "../types/subtopic";
import { TOPIC_QUERY } from "../api/topicQuery";
import createCategories from "../api/createCategories/createCategories";
import { setCachedCategories } from "../utils/localStorage";
import { useApolloClient } from "@apollo/client/react";

interface getTopicDataProps {
  client: ApolloClient;
  courseCode: string;
  setTopics: (topics: Topic[]) => void;
  setLoadingState: (loadingState: string | undefined) => void;
}

async function getTopicData({
  client,
  courseCode,
  setTopics,
  setLoadingState,
}: getTopicDataProps) {
  // Fetch all topics for the course
  const topicsResult = await client
    .query<TopicsAPIResponse>({
      query: TOPIC_QUERY,
      variables: {
        courseCode,
        searchPhrase: null,
      },
    })
    .catch((error) => {
      throw new Error(
        `Failed to fetch topics for course ${courseCode}: ${error.message}`
      );
    });

  const topics = topicsResult.data?.courseTopics ?? [];

  const subtopicPromises = topics.map(async (topic: SimplifiedTopic) => {
    const subtopicsResult = await client.query<SubtopicsAPIResponse>({
      query: SUBTOPIC_QUERY,
      variables: {
        courseCode,
        topicCode: topic.code,
        searchPhrase: null,
      },
    });

    return {
      topic,
      subtopics: subtopicsResult.data?.courseSubtopics ?? [],
    };
  });

  const topicsWithSubtopics = await Promise.all(subtopicPromises).catch(
    (error) => {
      throw new Error(
        `Failed to fetch subtopics for course ${courseCode}: ${error.message}`
      );
    }
  );

  setLoadingState(
    `Creating categories for the ${topicsWithSubtopics.length} topics`
  );
  const topicsWithCategories = await createCategories(
    topicsWithSubtopics,
    setLoadingState
  );

  // Save categories to localStorage
  setCachedCategories(courseCode, topicsWithCategories);

  setTopics(topicsWithCategories);
  setLoadingState(undefined);
}

export function useTopicData(courseCode: string) {
  const client = useApolloClient();
  const [topicsWithCategories, setTopics] = useState<Topic[]>([]);
  const [loadingState, setLoadingState] = useState<string | undefined>(
    "Gathering topics"
  );

  useEffect(() => {
    if (courseCode) {
      // TODO: use .then() to handle the promise
      void getTopicData({
        client,
        courseCode,
        setTopics,
        setLoadingState,
      });
    }
  }, [courseCode, client, setTopics]);

  return { topicsWithCategories, loadingState };
}
