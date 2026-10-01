import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const aidren = createOpenAI({
  baseURL: "https://api.aidren.co.uk/v1",
  apiKey: process.env.AIDREN_API_KEY,
});

const { text } = await generateText({
  model: aidren.chat("gpt-4o-mini"),
  prompt: "Say hello in five words.",
});
console.log(text);
