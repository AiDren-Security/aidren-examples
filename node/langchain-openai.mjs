import { ChatOpenAI } from "@langchain/openai";

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  apiKey: process.env.AIDREN_API_KEY,
  configuration: { baseURL: "https://api.aidren.co.uk/v1" },
});
console.log((await llm.invoke("Say hello in five words.")).content);
