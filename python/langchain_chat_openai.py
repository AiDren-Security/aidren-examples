import os
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4o-mini",
    api_key=os.environ["AIDREN_API_KEY"],
    base_url="https://api.aidren.co.uk/v1",
)
print(llm.invoke("Say hello in five words.").content)
