import os
from anthropic import Anthropic

# Needs an AiDren proxy key created for Anthropic.
client = Anthropic(
    api_key=os.environ["AIDREN_API_KEY"],
    base_url="https://api.aidren.co.uk",   # no /v1: the SDK appends /v1/messages
)

msg = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=100,
    messages=[{"role": "user", "content": "Say hello in five words."}],
)
print(msg.content[0].text)
