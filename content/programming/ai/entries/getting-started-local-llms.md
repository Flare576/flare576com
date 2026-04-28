---
title: "Getting Started with Local LLMs"
date: Mon Mar  9 05:34:33 PM CDT 2026
published: true
description: "Run real AI models on your own hardware — no subscriptions, no cloud, no one reading your prompts but you"
goal: N/A
solution: N/A
tags: ["programming","ai","local-llm","lm-studio","ollama","comfyui"]
---
```nerd-level-3
If you can download an app and use a command line occasionally, you're ready for this. No coding required.
```

# You Own the Hardware

Here's something that might surprise you: you can run AI on your own machine. Right now. For free.

Not some watered-down demo. Real language models — the same *family* of models that powers the big names — running locally, privately, without sending a single token to anyone's server.

> Your data, your hardware, your call. No subscription. No cloud. No one else's data center.

This guide will get you there.

# What Even Is an LLM?

Before we install anything, a quick detour. You don't *need* this section — skip ahead if you're impatient — but I think it makes everything else click.

LLM stands for **Large Language Model**. The "large" part used to be very literal: these models were trained on enormous amounts of text (like, "meaningful fraction of the entire internet" amounts), using enormous amounts of compute.

What came out of that training is essentially a very, very sophisticated autocomplete.

```flare
The math-y version: LLMs are transformer-based neural networks. At inference time, they tokenize your input (breaking it into sub-word chunks), convert those tokens into vectors in a high-dimensional embedding space, and use attention mechanisms across billions of parameters to predict the most likely next token — repeatedly, until the response is done.

The human version: imagine if autocomplete had read everything, remembered all of it, and could reason about what comes next with more context than you could fit in your head.
```

When you run an LLM locally, you're running a file (or a few files) full of numbers — the **model weights** — that encode all of that learned knowledge. Your CPU or GPU loads those numbers and does math on them every time you send a message.

More numbers = smarter model = more RAM required. That brings us to:

# What Do You Need?

The main constraint is **RAM**. Unlike a cloud provider's servers with 80GB of GPU VRAM, you're working with what you've got.

| Your RAM | What fits comfortably |
|----------|-----------------------|
| 8 GB     | ~4B parameter models (fast, capable enough for simple tasks) |
| 16 GB    | ~8–14B models (very capable, handles most things well) |
| 32 GB    | ~30–35B models (genuinely impressive) |
| 64 GB+   | 70B+ models (excellent quality) |

A GPU helps — a lot — for speed. But for most everyday use, CPU inference is totally usable. Just slower.

```flare
Apple Silicon users: you got lucky. M-series chips use unified memory, meaning your CPU and GPU share the same RAM pool. A MacBook Pro with 32GB has 32GB available for GPU-accelerated inference — which is genuinely remarkable for local AI.

Most Windows laptops with dedicated GPUs can only use their GPU's VRAM (typically 8–12GB) for acceleration, and fall back to slower CPU inference for anything larger. Still works. Just worth knowing.
```

# LM Studio

This is the one I'd recommend starting with. It's a desktop app with a built-in model browser, a chat interface, and a local API server. No command line required.

## Install

```bash
# macOS
brew install lm-studio
```

Or download directly from [lmstudio.ai](https://lmstudio.ai).

Start it up, let it update if it asks.

## Find a Model

In LM Studio, you'll see a search bar at the top. Search for **`qwen3.5 35B A3B`**.

> This model is my daily driver for local use. It's a Mixture-of-Experts architecture, which means it activates fewer parameters per request than a full 35B model — so it's faster than you'd expect while still being genuinely capable across code, conversation, and reasoning. It's basically a Swiss Army knife.

Click download. Go make a coffee. It's a few gigabytes.

## Enable CORS

If you're planning to use any browser-based tool — including [Ei](#programming/ai/ei-your-local-first-ai-ecosystem) — you need to turn on CORS in LM Studio, or browser security policies will block all local requests.

1. Go to the **Developer** tab in the left sidebar
2. Server Settings (near "Status" toggle)
3. Enable **"Enable CORS"**
4. Start (or restart) the server

## Try It

Once the server is running, you can chat with your model directly in LM Studio's interface. You can also hit the API at `http://localhost:1234`:

```bash
curl http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "local-model",
    "messages": [{"role": "user", "content": "What is the answer to life, the universe, and everything?"}]
  }'
```

```flare
LM Studio's server is OpenAI API-compatible. Any tool that supports OpenAI will work with a local LM Studio server — you just point it at http://localhost:1234 instead of api.openai.com. This is a big deal. It means the whole ecosystem of tools built around OpenAI's API just... works locally.
```

# Ollama

LM Studio is great for GUIs. If you live in the terminal, Ollama might suit you better.

```bash
brew install ollama

# Pull a model
ollama pull qwen2.5-coder:7b

# Talk to it
ollama run qwen2.5-coder:7b "What's the capital of France?"
```

Ollama also exposes an OpenAI-compatible API (on port 11434 instead of 1234), so the same "anything that talks to OpenAI can talk to Ollama" logic applies.

The tradeoff vs. LM Studio: no GUI, no model browser, no built-in chat interface — just a server, a `pull/run/list` CLI, and an API. For many developers, that's not a tradeoff, that's a feature.

# Bonus: Image Generation with ComfyUI

Text LLMs are cool. Image models are *witchcraft*.

ComfyUI lets you run image generation models locally — same idea as LM Studio, but for visual output. And honestly, the setup is almost embarrassingly simple.

```bash
brew install comfyui
```

Start it up, then in the interface:

1. Click **Image** in the left sidebar
2. Choose **Z-Image-Turbo**
3. Download the three files it shows you:

```
vae / ae.safetensors
diffusion_models / z_image_turbo_bf16.safetensors
text_encoders / qwen_3_4b.safetensors
```

4. Go to **Settings → Server Config → CORS: \*** (required if you want to use it with any web-based front-end)

That's it. You're generating images locally.

```flare
Resource note: LM Studio and ComfyUI are both memory-hungry. Running both simultaneously on the same machine means they're competing for the same RAM — and GPU, if you have one. This is totally doable on 32GB+. On 16GB, you'll probably want to run only one at a time, or at least be intentional about which one is active. They won't crash each other; you'll just feel the slowdown.
```

> You now have a fully local AI stack. Text and images. No cloud required.

# Further Reading

- [Getting Started with Ei](#programming/ai/ei-your-local-first-ai-ecosystem) — build an AI companion that actually knows you, running on this exact stack
- [Developer's Guide to Ei](#programming/ai/ei-developers-guide) — give your coding tools a persistent memory that survives session restarts
