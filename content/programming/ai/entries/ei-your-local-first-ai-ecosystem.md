---
title: "Getting Started with Ei"
date: Tue Mar 16 01:00:00 PM CDT 2026
published: false
description: "Your own AI companion that remembers who you are — locally, privately, yours"
goal: N/A
solution: N/A
tags: ["programming","ai","ei","local-llm","personas"]
---
# Three Months

```flare
Now you'll know where I've been for the last 3 months.
```

I built a thing.

It started as "what if my AI assistant actually remembered things about me between sessions" and ended up becoming something bigger than I planned. If you've read the posts about OpenCode — the agents, the MCP, the commands — Ei is the project I've been building *alongside* all of that.

> Ei is a local-first AI companion system with persistent personas.

Let's break that down.

# Local-First

All of the data Ei learns about you — your preferences, your habits, the things you care about — lives on *your* device. Not a server somewhere. Not "encrypted on our end." Your device.

If you're using a local LLM (like the one you set up in [Getting Started with Local LLMs](#programming/ai/getting-started-local-llms)), literally no data leaves your machine. Not your messages, not your summaries, not the knowledge base Ei builds about you.

If you're using a cloud provider (Anthropic, OpenAI, Google, etc.), your messages go to that provider — same as they would with ChatGPT. But the *learning*, the *memory*, the data Ei builds about you? Still local.

```flare
The sync feature is optional. If you want your data available on multiple devices, you can sync to flare576.com. But the data is encrypted *before* it leaves your machine, using a key derived from credentials that never leave your device. I genuinely cannot decrypt your data if I wanted to. Which I don't. It's your data.
```

# Two Ways In

## Ei Online

The easiest path: go to [ei.flare576.com](https://ei.flare576.com). Your browser downloads the app, walks you through a quick setup, and you're in.

If you have a local LLM running on port 1234 (LM Studio, Ollama), Ei will detect it automatically. Otherwise it'll ask you to add a provider.

Zero install. All data stays in your browser's LocalStorage.

## Ei TUI

If you'd rather not trust a browser — or you want filesystem access, the full command set, and the developer integrations — install the TUI.

```bash
# Install Bun (if you don't have it)
curl -fsSL https://bun.sh/install | bash

# Install Ei
npm install -g ei-tui

# Run it
ei
```

The TUI stores data in `~/.local/share/ei` by default, or wherever you point `$EI_DATA_PATH`.

```flare
The TUI also unlocks the developer-focused features — OpenCode integration, the CLI querying, session memory import. If you're a developer, this is the one to install. See the [Developer's Guide](#programming/ai/ei-developers-guide) for all of that.
```

# What's a Persona?

At the technical level, an AI "agent" is a system prompt plus a conversation history. The system prompt tells the LLM how to behave; the conversation gives it context.

Ei wraps that in a **Persona** — and a Persona isn't static. It:

- Has **Traits** — consistent behaviors that stay stable over time ("keeps responses concise," "always asks a follow-up question," "talks like a pirate")
- Has **Topics** — areas of interest and expertise that grow and shift as you interact
- **Adapts** — the system extracts what it learns about you and uses it to shape future responses

You can have multiple Personas. A focused coding assistant. A brainstorming partner who'll push back on bad ideas. A creative collaborator. Something more personal, if that's your thing. Each one knows you from its own angle, built from the same underlying data.

## Creating a Persona

In the TUI:

```
/persona new MyAssistant
```

This opens your `$EDITOR` with a template. Fill in a system prompt, set a display name, save. Done.

In the web app, there's a **New Persona** button in the sidebar.

# Setting Up a Provider

Ei needs an LLM to think. You've got two paths.

## Local LLM (Recommended)

If you followed [Getting Started with Local LLMs](#programming/ai/getting-started-local-llms), you've already got LM Studio running. Ei will find it at `http://localhost:1234` automatically on startup.

One thing to check: make sure **CORS is enabled** in LM Studio. Without it, the web app can't talk to your local server — browser security blocks the request.

## API Key

Prefer a cloud provider? In the TUI:

```
/provider new
```

This opens your editor with a provider template. Fill in the name, endpoint, and API key. Works with anything OpenAI API-compatible — Anthropic, OpenAI, OpenRouter, Google, Bedrock, that one self-hosted Ollama instance your friend runs. If it speaks the OpenAI protocol, Ei speaks back.

In the web app: **Settings → Providers → Add Provider**.

# Tools

Personas can use tools — not just "search my memory" tools, but actual integrations that let them reach out and do things.

## Built-in (always available, no setup)

| Tool | What it does |
|------|-------------|
| `read_memory` | Semantic search of everything Ei knows about you — facts, topics, people, quotes |
| File tools | Read files, list directories, search content by regex *(TUI only)* |

The file tools are worth calling out specifically. Ask a coding-focused persona to read a file, understand a project structure, or find where a function is defined — it can actually look. Not "I'll pretend I know this file" — it reads it.

## Tavily Search (requires free API key)

Real-time web search and news. Good for personas you want to stay current.

Get a free key at [tavily.com](https://tavily.com) — 1,000 requests/month on the free tier. Add it under **Settings → Tool Kits → Tavily Search**.

## Spotify (requires OAuth)

Personas can know what you're listening to right now. Connect under **Settings → Tool Kits → Spotify**, and any persona with this tool enabled can ask what's playing and actually know the answer.

In the TUI: `/auth spotify`

## Assigning Tools to Personas

Tools aren't global — you choose which personas get access to what. A focused coding assistant might only have the file tools. A general-purpose companion might have web search, Spotify, and memory. Edit a persona and toggle the tools.

In the TUI: `/tools` to control global tools, `/details` to control which tools a persona can use

# Sync (Optional)

If you want your data available on multiple machines, or want to move between the TUI and web app throughout the day, you can enable sync.

In the TUI:
```
/setsync <username> <passphrase>
```

This sends an encrypted blob to flare576.com when you quit. Your username and passphrase generate the encryption key on your device and never leave it. The server receives data it cannot read.

Sync fires on `/quit`. In the web app, it's the "Save and Exit" button.

# Bonus: ComfyUI for Image Generation

```bash
brew install comfyui
```

Start it, navigate to **Image → Z-Image-Turbo**, and download:

```
vae / ae.safetensors
diffusion_models / z_image_turbo_bf16.safetensors
text_encoders / qwen_3_4b.safetensors
```

Then **Settings → Server Config → CORS: \***

That's three downloads and one settings change. You now have local image generation.

```flare
If you're running LM Studio *and* ComfyUI on the same machine, they're competing for the same RAM. On 32GB+ this is usually fine. On 16GB, you'll want to be intentional about which one is active. They won't fight each other — you'll just feel the slowdown.
```

# Source Code

[github.com/flare576/ei](https://www.github.com/flare576/ei) — MIT licensed, local-first, no telemetry, no "report a bug" button because that would mean I can see your data.

# Further Reading

- [Getting Started with Local LLMs](#programming/ai/getting-started-local-llms) — set up the LLM that powers all of this on your own hardware
- [Developer's Guide to Ei](#programming/ai/ei-developers-guide) — wire Ei into your coding workflow for persistent agent memory
