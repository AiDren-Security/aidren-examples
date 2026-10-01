import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

// Needs an AiDren proxy key created for Anthropic.
// The AI SDK's default base URL ends in /v1 and it appends /messages,
// so (unlike the Anthropic SDKs) include /v1 here.
const aidren = createAnthropic({
  baseURL: "https://api.aidren.co.uk/v1",
  apiKey: process.env.AIDREN_API_KEY,
});

const { text } = await generateText({
  model: aidren("claude-sonnet-4-5"),
  prompt: "Say hello in five words.",
});
console.log(text);
