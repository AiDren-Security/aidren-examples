import Anthropic from "@anthropic-ai/sdk";

// Needs an AiDren proxy key created for Anthropic.
const client = new Anthropic({
  apiKey: process.env.AIDREN_API_KEY,
  baseURL: "https://api.aidren.co.uk", // no /v1: the SDK appends /v1/messages
});

const msg = await client.messages.create({
  model: "claude-sonnet-4-5",
  max_tokens: 100,
  messages: [{ role: "user", content: "Say hello in five words." }],
});
console.log(msg.content[0].text);
