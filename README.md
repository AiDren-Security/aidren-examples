# aidren-examples

![check](https://github.com/AiDren-Security/aidren-examples/actions/workflows/check.yml/badge.svg)

AiDren is a drop-in security proxy for LLM applications: it screens prompts for injection, scans responses for leaks, and scans model files for malicious code.

These are small, working quickstarts for sending your LLM traffic through [AiDren](https://aidren.co.uk). You keep the SDK you already use. You change the **base URL** to `api.aidren.co.uk` and use an **AiDren proxy key** in place of your provider key. Request and response bodies are unchanged.

> The examples in this repo are MIT-licensed. AiDren itself is a hosted commercial service, not open source. Full reference: https://aidren.co.uk/docs.html

## Try it first, no signup

Paste a system prompt and fire six real prompt-injection attacks at it: https://aidren.co.uk/attack-test.html#try-it

## Setup

1. Start a 14-day free trial (no card) at https://app.aidren.co.uk.
2. Under **Upstream Keys**, add your real OpenAI / Anthropic / Mistral key. It is encrypted at rest and used only to forward your requests.
3. Under **Proxy Keys**, create a proxy key for that provider. The full key is shown once, so copy it.
4. Export it and run an example:

```bash
export AIDREN_API_KEY=your_proxy_key   # see .env.example; never commit it
```

Which upstream provider a proxy key routes to is fixed when you create the key, so create one key per provider.

## Base URLs and auth

| Client style | Base URL |
|---|---|
| OpenAI-compatible | `https://api.aidren.co.uk/v1` |
| Anthropic-compatible | `https://api.aidren.co.uk` (the Anthropic SDKs append `/v1/messages`) |
| Mistral-compatible | `https://api.aidren.co.uk/v1` |

AiDren accepts the proxy key in either header:

```
Authorization: Bearer YOUR_AIDREN_KEY    # OpenAI / Mistral style
x-api-key: YOUR_AIDREN_KEY               # Anthropic style
```

The Vercel AI SDK's Anthropic provider is the exception: its base URL already ends in `/v1` and it appends `/messages`, so use `https://api.aidren.co.uk/v1` there.

## Examples

| Example | Run | Notes |
|---|---|---|
| [`python/openai_basic.py`](python/openai_basic.py) | `python python/openai_basic.py` | OpenAI SDK |
| [`python/openai_streaming.py`](python/openai_streaming.py) | `python python/openai_streaming.py` | Streaming |
| [`python/anthropic_basic.py`](python/anthropic_basic.py) | `python python/anthropic_basic.py` | Requires a proxy key created for Anthropic |
| [`python/langchain_chat_openai.py`](python/langchain_chat_openai.py) | `python python/langchain_chat_openai.py` | `langchain_openai.ChatOpenAI` |
| [`node/openai-basic.mjs`](node/openai-basic.mjs) | `node node/openai-basic.mjs` | OpenAI SDK |
| [`node/anthropic-basic.mjs`](node/anthropic-basic.mjs) | `node node/anthropic-basic.mjs` | Requires a proxy key created for Anthropic |
| [`node/vercel-ai-sdk-openai.mjs`](node/vercel-ai-sdk-openai.mjs) | `node node/vercel-ai-sdk-openai.mjs` | `createOpenAI` + `generateText` |
| [`node/vercel-ai-sdk-anthropic.mjs`](node/vercel-ai-sdk-anthropic.mjs) | `node node/vercel-ai-sdk-anthropic.mjs` | Requires a proxy key created for Anthropic; note `/v1` |
| [`node/langchain-openai.mjs`](node/langchain-openai.mjs) | `node node/langchain-openai.mjs` | `@langchain/openai` |
| [`curl/chat.sh`](curl/chat.sh) | `bash curl/chat.sh` | Plain HTTP |
| [`blocked-request/blocked.py`](blocked-request/blocked.py) | `python blocked-request/blocked.py` | Sends an injection and handles the block |
| [`rag-indirect-injection/`](rag-indirect-injection/) | `python rag-indirect-injection/rag_indirect_injection.py` | Injection hidden in a retrieved document (indirect injection) |
| [`agent-tool-hijack/`](agent-tool-hijack/) | `python agent-tool-hijack/agent_tool_hijack.py` | Tool-calling agent hit by an injection, plus an argument allow-list |

Setup:

```bash
# Python
python -m venv .venv && source .venv/bin/activate
pip install -r python/requirements.txt

# Node (18+)
cd node && npm install && cd ..
```

Model names in the examples (`gpt-4o-mini`, `claude-sonnet-4-5`) must match what your upstream key can use. Change them freely.

## What a blocked request looks like

A request that contains a prompt-injection attempt is not forwarded to the provider. AiDren returns HTTP `400` with an OpenAI-shaped error (your SDK raises its normal `BadRequestError`):

```json
{
  "error": {
    "message": "Request blocked by AiDren Proxy: content flagged as a potential prompt injection attempt.",
    "type": "proxy_blocked",
    "code": "injection_detected"
  }
}
```

The `code` field says why: `injection_detected` (prompt injection), `sensitive_data_detected` (personal data or secrets in the request, or in the response when output scanning is set to block) or `policy_blocked` (your custom policy). Check `error.type === "proxy_blocked"` to tell an AiDren block from an ordinary bad request. On the Anthropic endpoint the body is Anthropic-shaped (`type: "error"`, `error.type: "invalid_request_error"`) with the same `Request blocked by AiDren Proxy: ...` message. [`blocked-request/blocked.py`](blocked-request/blocked.py) shows the handling. Every decision appears on your Events page with a reason and confidence score. Keys can also run in **monitor mode**, which logs what would be blocked and forwards the request anyway.

## Honest limits

No tool stops prompt injection completely. Screening reduces risk as one layer among several: pair it with least-privilege tool access, output checks and human approval for high-impact actions. AiDren is a hosted service, not open source; this repo contains MIT-licensed example code only.

## Links

- Site: https://aidren.co.uk
- Docs: https://aidren.co.uk/docs.html
- Pricing: https://aidren.co.uk/pricing.html
- Free attack test: https://aidren.co.uk/attack-test.html#try-it
- LinkedIn: https://www.linkedin.com/company/aidren
- Contact: hello@aidren.co.uk
