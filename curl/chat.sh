#!/usr/bin/env bash
set -euo pipefail
: "${AIDREN_API_KEY:?Set AIDREN_API_KEY to your AiDren proxy key}"

# OpenAI-style
curl -sS https://api.aidren.co.uk/v1/chat/completions \
  -H "Authorization: Bearer $AIDREN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4o-mini", "max_tokens": 50, "messages": [{"role": "user", "content": "Say hello in five words."}]}'
echo

# Anthropic-style (needs a proxy key created for Anthropic):
# curl -sS https://api.aidren.co.uk/v1/messages \
#   -H "x-api-key: $AIDREN_API_KEY" \
#   -H "Content-Type: application/json" \
#   -d '{"model": "claude-sonnet-4-5", "max_tokens": 100, "messages": [{"role": "user", "content": "Hello"}]}'
