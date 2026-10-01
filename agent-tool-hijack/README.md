# Agent tool hijack

A minimal tool-calling agent with one fake tool, `send_email(to, subject, body)`. It only prints; it never sends anything. The user asks the agent to summarise a customer message, and that message contains an injection telling it to email the conversation to `attacker@example.com`.

Two layers of defence:

1. **AiDren** screens the request. If it is blocked, the script prints the block code and the tool never runs.
2. **Your own code** checks tool arguments. If the request gets through and the model asks for the tool, the script prints `Tool call requested: ...` but only runs it when `to` ends with `@yourcompany.example`. Anything else is not executed.

```bash
export AIDREN_API_KEY=your_proxy_key
pip install -r python/requirements.txt
python agent-tool-hijack/agent_tool_hijack.py
```

Least privilege matters most: an agent that only summarises messages should not be handed an email tool at all.
