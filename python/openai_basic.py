import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AIDREN_API_KEY"],      # AiDren proxy key, not your OpenAI key
    base_url="https://api.aidren.co.uk/v1",    # point at AiDren
)

resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Say hello in five words."}],
)
print(resp.choices[0].message.content)
