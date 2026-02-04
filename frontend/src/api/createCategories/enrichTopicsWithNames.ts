import type { Topic, TopicsWithSubtopics } from "../../types/topic";

import { Subtopic } from "../../types/subtopic";

export const enrichTopicsWithNames = (
  topics: Topic[],
  topicsWithSubtopics: TopicsWithSubtopics[]
): Topic[] => {
  const allSubtopicNames = topicsWithSubtopics.flatMap(
    ({ subtopics }) => subtopics
  );

  return topics.map(({ code, categories }) => {
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
        subtopics: subtopics
          .map(({ code }) => {
            const subtopicName = allSubtopicNames.find(
              (subtopic) => subtopic.code === code
            )?.name;
            if (!subtopicName) {
              console.error(`Subtopic name not found for code: ${code}`);
              return null;
            }
            return {
              code,
              name: subtopicName,
            };
          })
          .filter(Boolean) as Subtopic[],
      })),
    };
  });
};
