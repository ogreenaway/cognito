import { rest } from "msw";

// Mock OpenAI responses that match the topic/subtopic codes from other mocks
const mockOpenAIResponses: Record<string, object> = {
  "topic-1": {
    code: "topic-1",
    categories: [
      {
        name: "Newton's Laws of Motion",
        subtopics: [{ code: "subtopic-1" }],
      },
    ],
  },
  "topic-2": {
    code: "topic-2",
    categories: [
      {
        name: "Energy Types",
        subtopics: [{ code: "subtopic-1" }],
      },
    ],
  },
};

export const openAIHandler = rest.post(
  "https://api.openai.com/v1/responses",
  async (req, res, ctx) => {
    const body = (await req.json()) as { input?: string };
    const input = body.input || "";

    // Extract topic code from the input
    const topicCodeMatch = input.match(/"code":\s*"(topic-\d+)"/);
    const topicCode = topicCodeMatch ? topicCodeMatch[1] : "topic-1";

    const mockResponse =
      mockOpenAIResponses[topicCode] || mockOpenAIResponses["topic-1"];

    return res(
      ctx.json({
        id: "resp_mock123",
        object: "response",
        created_at: Date.now(),
        status: "completed",
        output: [
          {
            type: "message",
            id: "msg_mock123",
            status: "completed",
            role: "assistant",
            content: [
              {
                type: "output_text",
                text: JSON.stringify(mockResponse),
              },
            ],
          },
        ],
        output_text: JSON.stringify(mockResponse),
      })
    );
  }
);
