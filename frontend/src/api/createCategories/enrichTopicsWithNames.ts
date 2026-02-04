import type { SimplifiedTopic } from "./simplifiedTypes";
import type { TopicsWithSubtopics } from "../../types/topic";

export const enrichTopicsWithNames = (
  simplifiedTopics: SimplifiedTopic[],
  topicsWithSubtopics: TopicsWithSubtopics[]
) => {
  const allSubtopicNames = topicsWithSubtopics.flatMap(
    ({ subtopics }) => subtopics
  );

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
};
