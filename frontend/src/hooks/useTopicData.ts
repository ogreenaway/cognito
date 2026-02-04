import type { Topic, TopicsAPIResponse } from "../types/topic";
import { useEffect, useState } from "react";

import { ApolloClient } from "@apollo/client";
import { SUBTOPIC_QUERY } from "../api/subtopicQuery";
import type { SubtopicsAPIResponse } from "../types/subtopic";
import { TOPIC_QUERY } from "../api/topicQuery";
import createCategories from "../api/createCategories/createCategories";
import { useApolloClient } from "@apollo/client/react";

// TODO: move to types and clean up types
type SubtopicType = {
  code: string;
  name: string;
};

type CategoryType = {
  name: string;
  subtopics: SubtopicType[];
};

export type TopicType = {
  code: string;
  name: string;
  categories: CategoryType[];
};

interface getTopicDataProps {
  client: ApolloClient;
  courseId: string;
  setTopics: (topics: TopicType[]) => void;
  setLoadingState: (loadingState: string | undefined) => void;
}

async function getTopicData({
  client,
  courseId,
  setTopics,
  setLoadingState,
}: getTopicDataProps) {
  // Fetch all topics for the course
  const topicsResult = await client
    .query<TopicsAPIResponse>({
      query: TOPIC_QUERY,
      variables: {
        courseCode: courseId,
        searchPhrase: null,
      },
    })
    .catch((error) => {
      throw new Error(
        `Failed to fetch topics for course ${courseId}: ${error.message}`
      );
    });

  const topics = topicsResult.data?.courseTopics ?? [];

  const subtopicPromises = topics.map(async (topic: Topic) => {
    const subtopicsResult = await client.query<SubtopicsAPIResponse>({
      query: SUBTOPIC_QUERY,
      variables: {
        courseCode: courseId,
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
        `Failed to fetch subtopics for course ${courseId}: ${error.message}`
      );
    }
  );

  setLoadingState(
    `Created categories for 0 of ${topicsWithSubtopics.length} topics`
  );
  const topicsWithCategories = await createCategories(
    topicsWithSubtopics,
    setLoadingState
  );

  setTopics(topicsWithCategories);
  setLoadingState(undefined);
}

export function useTopicData(courseId: string) {
  const client = useApolloClient();
  const [topicsWithCategories, setTopics] = useState<TopicType[]>([]);
  const [loadingState, setLoadingState] = useState<string | undefined>(
    "Gathering topics"
  );

  useEffect(() => {
    if (courseId) {
      // TODO: use .then() to handle the promise
      void getTopicData({
        client,
        courseId,
        setTopics,
        setLoadingState,
      });
    }
  }, [courseId, client, setTopics]);

  return { topicsWithCategories, loadingState };
}
