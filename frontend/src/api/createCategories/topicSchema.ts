export const topicSchema = {
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
