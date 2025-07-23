---
title: "2025 is a Wierd Place"
date: Tue Jul 22 07:05:52 PM CDT 2025
published: true
description: "I used Claude Code to write a feature for an open-source tooll that uses Gemini"
goal: N/A
solution: N/A
tags: ["claude","gemini","llm"]
---
# 2025 is a Weird Place

```bash
llm "Please describe a scene of a mountain-top vista with a rustic swing set. \
    On the swings are a pelican and a walrus. The sun is setting in the distance. \
    Make it a beautiful scene with vibrant colors. \
    I'm going to feed it into an image generator." | llm gemini generate > work_of_art.png
```

![Work Of Art](/images/thumbnail/work_of_art.png)

# Why This Exists

I asked [llm's Discord](https://datasette.io/discord-llm) if anyone was using the tool to create images via the CLI. Two folks had played around with the idea, but hadn't gotten the chance to put together a feature branch.

So, I asked [Claude Code](https://www.anthropic.com/claude-code) to take a crack at it.

After figuring out how to get a Python environment setup correctly (It's been about 6 years since I last touched Python), I got this going:

[PR 101 - Added complete image generation support to the llm-gemini plugin](https://github.com/simonw/llm-gemini/pull/101/files)

# Wait, You Used Anthropic's Claude Code...

To enhance the Google Gemini plugin for an Open-Source tool, yeah. What makes it better is that TECHNICALLY my little example up there uses two different models, so in total I used:

- [Anthropic Claude-3.5-haiku](https://www.anthropic.com/claude/haiku)
- [Anthropic Claude-sonnet 4](https://www.anthropic.com/claude/sonnet)
- [Gemini 2.5 Flash](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash)
- [Gemini 2.0 Flash Exp. Image Generation](https://ai.google.dev/gemini-api/docs/image-generation)

Just so I could make fun images from the comfort of my command line.
