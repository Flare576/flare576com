---
title: "Setup llm"
date: Thu Jun 26 13:48:12 CDT 2025
published: true
description: "Setting up `llm` using Gemini for free"
goal: N/A
solution: N/A
tags: ["programming","ai","cli","llm"]
---
# Prerequisite

```nerd-level-8
This is some low-level stuff, and I'm assuming you know your way around your terminal. If you're not a command-line users, there's WAY easier ways to interact with AI, and I'll talk about those in other posts!
```

# Setup llm Using Gemini

You'll need a Google account to log in, but you won't need a payment method or anything (at least, not at the time of writing).

First, bounce over to [Google AI Dashboard](https://ai.google.dev/gemini-api/docs/api-key), click Get a "Gemini API key in Google AI Studio".

Grab the key, and put it into your Environment variables. While you're doing that, you might want to set `llm`'s configuration directory:

```bash
export LLM_GEMINI_KEY=AI.....
export LLM_USER_PATH="$HOME/.config/llm"
```

Then, follow the [Setup](https://llm.datasette.io/en/stable/setup.html) instructions for your OS/tool set. Lastly, add the Gemini plugin and set your default model:

```bash
llm install llm-gemini
llm models default gemini-2.0-flash
```

At this point, you should be able to use `llm 'How long would it take to cut down the mightiest tree in the forest with a herring?'`

## Ok, but What If I Don't Want To Give Google My Time and Energy

Maybe you want to keep it all local with [Ollma](https://github.com/ollama/ollama#ollama) and the ollama plugin?

```bash
llm install llm-ollama
ollama pull llama3.2:latest
llm -m llama3.2:latest 'What is the capital of France?'
```
