# RAG indirect injection

A small simulation of a RAG app. The user asks an ordinary question; the attack is hidden in one of the retrieved documents (a fake supplier invoice), so the user never types it.

This "indirect" pattern is behind real incidents such as EchoLeak (CVE-2025-32711).

The script sends two requests through AiDren:

1. Clean documents only, which should pass.
2. The same documents plus one containing a hidden instruction. AiDren screens the whole request, retrieved context included, and returns HTTP `400` with `error.type == "proxy_blocked"` if it flags it.

```bash
export AIDREN_API_KEY=your_proxy_key
pip install -r python/requirements.txt
python rag-indirect-injection/rag_indirect_injection.py
```

Documents are hard-coded and use example.com. In a real app, screen at the point where you call the model so retrieved text is covered too.
