import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AIDREN_API_KEY, // AiDren proxy key, not your OpenAI key
  baseURL: "https://api.aidren.co.uk/v1",
});

const resp = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Say hello in five words." }],
});
console.log(resp.choices[0].message.content);
