import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AIDREN_API_KEY"],
    base_url="https://api.aidren.co.uk/v1",
)

# Streaming works unchanged: the provider's stream is relayed through AiDren.
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Count from one to five."}],
    stream=True,
)
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
print()
