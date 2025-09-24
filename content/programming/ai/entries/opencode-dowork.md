---
title: "OpenCode - In Practice"
date: Fri Sep 12 07:06:10 PM CDT 2025
published: true
description: "In theory, theory and practice are the same. In practice, they are not"
goal: N/A
solution: N/A
tags: []
---
```flare
Before you dive in, if you haven't read [OpenCode Setup](#programming/ai/opencode-setup), that might be a good starting point!

Then, if you're interested in the context of the overall "Project", you can read that in [the project introduction](#programming/ai/project-introduction).
```

# Any Questions?

If your "Proposal" has unanswered questions, use your resources to answer them before you dive into PRP generation. For example:

```flare
I'd love to create a client-side only web app that can be hosted on Github Pages, but I believe several of these systems, including Steam, require a server-side redirect for its auth flow.
```

Well, if I don't know it, then OpenCode and its agents aren't going to have a clear path forward, so I just type `/analyzeLogin Steam` ([Commands](#programming/ai/opencode-commands)). That command is already setup to use my `agent: library-researcher`, which in turn is setup for my `model: google/gemini-2.5-flash`.

> NOTE: I didn't have great luck having OpenRouter hit Gemini-2.5-flash - it kept hitting the API call limit, probably due to shared access - so this is using my own [Free Account API key](#programming/ai/setup-llm)

```assisstant
- User Web API Keys: Obtainable by any Steam user for accessing publicly available data. Not for user authentication within your application.
- Publisher Web API Keys: Required for sensitive data or protected actions. Must be used from secure publisher servers and NOT distributed with clients.
```

Uh, wait a second, "Publisher Web API Keys" sounds #notFree, and User Web API Keys can't be used for auth? Hrm.

```flare
This is the part where I point you back to [Project Introduction](#/programming/ai/project-introduction) - AI is a **Power Tool**, not infallible Easy Button.

But it **IS** a heck of a tool.
```

## Clarification

I went back-and-forth with my Library Researcher (Gemini), asking for clarification on the process, flow, tokens, user experience, everything, until **I** understood the system. In the end both it and myself had made mistakes and misunderstandings, but ultimately we refined the understanding to the point where it was able to generate this: [GitHub: research/steam-api.md](https://github.com/Flare576/myLibrary/blob/main/research/steam-api.md).

Also, in the process of talking through the flow, I also realized my application is going to need some sort of "Login" of its own, so my idea doc needed some additional details: [GitHub: FLARE_IDEA.md](https://github.com/Flare576/myLibrary/blob/b4db822fa550aa7f388bb137b26ce522d3e3d0ba/FLARE_IDEA.md).

# Any... More Questions?

Well, not in my doc, but there's this concept in life where **#i_dont_know_what_i_dont_know** - before we kick off coding and development, what if we had some experts to run these ideas past?

Like, I don't know, a Full Stack Developer or a UI-Designer ([Agents](#programming/ai/opencode-agents))? 

```flare
`/generateQuestions fullstack-developer`

`/generateQuestions ui-designer`
```
[GitHub Project: Opencode Commands](https://github.com/Flare576/myLibrary/blob/main/.opencode/command)

## Scale is Where AI Shines

```assistant
## Top 5 Priority Questions for Your MyLibrary Project:

### Priority 1: Authentication System Integration

- How will the passwordless email login system integrate with Steam's OpenID 2.0 authentication and other platform authentication methods?

### Priority 1: API Key Management & Security

- What is the strategy for securely storing and managing Steam API keys and other platform credentials in the PHP/MySQL environment?

### Priority 1: Database Schema Design

- What database schema will support both passwordless authentication tokens and multiple platform game library integrations?

### Priority 2: Frontend Build & Deployment Pipeline

- How will the frontend build process work given IONOS PHP-only hosting constraints?

### Priority 2: Local Development Environment

- What specific Podman Compose configuration will provide a complete local development environment?
```

### Who Answers These?

Sometimes, the user (you) will. For example "Database Schema Design" is something that I've actually spent time thinking about, so I can provide that.

However, I have to look up [Docker](#programming/scripting/docker) syntax (and, by extension, Podman) every time I start a new project, so maybe instead of doing all that again, I just bring in another [Awesome Claude Code SubAgents - Backend Developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/backend-developer.md).

```flare
The beauty of this system is that it grows as you need it to, and all of the agents are patient experts, willing to help you understand the parts you ask about...

But you gotta ask.
```

# Go Time

After a few rounds of asking different Agents for questions and enhancing my plan, they start returning back priority 2+ routinely. That was my benchmark for moving onto the next phase, but you should feel free to use the tool how you want, and find what works for you, the LLMs you choose, and your project.

If you're using the PRP flow and you have the core ["Idea"](https://github.com/Flare576/myLibrary/blob/3ffd896aa1601358114ec737b3fb9b30ad6f9d54/FLARE_IDEA.md), your next step is going to be something like:

```flare
[Tab to "Build"] (so that the Agent can write files)

`/prp-commands/prp-base-create Use @FLARE_IDEA.md for the overall project and the contents of /research for details.`

`/prp-commands/prp-base-execute @PRPs/flare-game-library-aggregator.md`
```

The first line generates your [Your PRP](https://github.com/Flare576/myLibrary/blob/main/PRPs/flare-game-library-aggregator.md)
The second line generates [Everything else](https://github.com/Flare576/myLibrary/tree/grok-first-pass)

## Then What?

By this time, you've worn several "Hats" -

- Entrepreneur - You came up with an idea that you thought should exist
- Hiring Manager - You sought out (descriptions of) domain experts and ~~hired~~ copied them into your Agents
- Project Manager - You built Commands (processes) and found MCPs ([tools](#programming/ai/opencode-mcp?scrollTo=three-types-of-llm-integration)) to manage your project
- Researcher - You worked with your team to understand the technical pieces you'll need to make your idea a reality
- Designer - You worked with your team to define how the idea will look/feel
- DevOps Engineer - You defined what the ecosystem of your idea will look like, whether that's a Python project or, in our case, a PHP web app
- Developer - You worked with your team to flesh out the inner workings of your tool

And now you enter into the next hats - QA, Analyst, and whatever else your Idea needs to become a reality.

# Parting Thoughts

The world of AI and LLMs is constantly shifting and evolving, and by the end of this process you'll probably experiment with a dozen different models. In fact, the main reason I suggested [OpenRouter.ai](https://openrouter.ai) is that you can swap between models without too much hassle. Some of them will work better than others, and if your goal is to spend as little as possible to accomplish your goals, there will be some trade-offs.

For example, right now the two best free models I found for working with [tools](https://opencode.ai/docs/agents/#available-tools) were:

- [DeepSeek V3.1 (free)](https://openrouter.ai/deepseek/deepseek-chat-v3.1:free)
    * A model developed in Hangzhou, Zhejiang, China
- [Grok 4 Fast (free)](https://openrouter.ai/x-ai/grok-4-fast:free)
    * A model from xAI, whose Wikipedia entry leads with
> The bot has generated various controversial responses, including conspiracy theories, antisemitism, and praise of Adolf Hitler as well as referring to Musk's views when asked about controversial topics or difficult decisions. Updates since 2023 have shifted the bot politically rightward to provide conservative responses to user queries.[4][5][6]

Additionally, as I stated in the opening [At What Cost](#programming/ai/opencode-setup?scrollTo=but-at-what-cost), all the free models are subject to logging and training on both OpenRouter's part as well as the hosting company of the model.

## Next Steps

If you decide you enjoy the process or tools, but want more options or control over your code and data, your next step could be:

- Buying into the [OpenCode Zen ecosystem](https://opencode.ai/docs/zen)
- Continue to manage your usage via [OpenRouter.ai](https://openrouter.ai/models?fmt=cards&supported_parameters=tools&order=top-weekly) and use the most up-to-date models
- Paying directly for access to [Anthropic's Claude](https://claude.com/pricing) API's
- Switching to [Claude Code](https://claude.com/product/claude-code) entirely (it's _very_ similar to OpenCode!)
