---
title: "OpenCode + OpenRouter + (free) = Free Claude Code"
date: Sun Aug 31 06:05:45 PM CDT 2025
published: true
description: "Step-by-step guide on getting a Steam Deck compatible AI coding experience"
goal: N/A
solution: N/A
tags: ["programming","ai","opensource","opencode","openrourter"]
---
```flare
Full Disclosure: OpenRouter imposes a 50-call/day limit unless you purchase $10 of credits. 50 calls is enough to test/verify your setup, but little else.

You don't need to SPEND the credits (e.g., you can use free providers+models), but you do need to spend $10 to prove you're not a bot, I guess.
```

# TL;DR

1. Register an account at [OpenRouter.ai](https://openrouter.ai)
2. (Optional) Buy $10 of credits
3. Grab an [API key](https://openrouter.ai/settings/keys)
4. Install [OpenCode.ai](https://opencode.ai/)
5. Run `opencode auth login`
6. Choose "OpenRouter"
7. Enter your API key
8. Run `opencode` in your project root
9. Call `/models`
10. Choose a [(free) Model](https://openrouter.ai/models?max_price=0)

# Introduction

Firstly, if you're not familiar with what [Claude Code](https://www.anthropic.com/claude-code) is, the TL;DR is that it's a command-line tool from Anthropic that

- Uses a set of files to maintain [project context](#programming/ai/claude-code)
    - **~/CLAUDE.md**
    - **./CLAUDE.md**
    - **./CLAUDE.local.md**
    - **./subdir/CLAUDE.md**
- Allows you to build "slash commands" to define common activities
    * "/makePullRequest" -> **.claude/commands/makePullRequest.md**
- Calls "Tools" on your behalf
    * Built-Ins, like "Read file", "Write file" "Fetch", etc.
    * Bash commands, like `grep`, `find`, `git`, etc.
- Interface with "MCP Servers"
    * These act like proxies to other utilities, like [Figma](https://www.figma.com/) or [Playwright](https://playwright.dev/)
- Call Anthropic's LLM models
    * Claude Haiku
    * Claude Sonnet
    * Claude Opus

**TECHNICALLY**, the Claude Code utility is free - you can run `npm install -g @anthropic-ai/claude-code` and install it - BUT it **only** works with Anthropic's models, and all of the models are paid/premium.

## Two Paths Forward; One is... Frowned Upon

### Hack Claude Code

In order to get Claude Code to point at non-Anthropic servers, you can basically intercept the calls it makes and redirect them to a different LLM with Claude Bridge.

I'm not linking to it because the author themselves calls it a "Glorified Hack," and I don't really recommend this approach.

### Use OpenCode.ai

> Quick Note: At one time, there were two projects calling themselves "OpenCode," and one of them switched their name to "Crush." This article isn't about Crush.

[OpenCode.ai](https://opencode.ai/) is a very similar tool to Claude Code, but FOSS (Free and Open-Source Software). It doesn't offer its own LLMs (i.e., "Providers"), but it does integrate with many of them directly, and even more of them through a service called [OpenRouter](https://openrouter.ai/), which I'll talk about in a second.

There's a few ways to [install OpenCode](https://opencode.ai/docs/) - the one most similar to Claude Code is

```bash
npm install -g opencode-ai
```

But, if you don't use `npm`, you've got other options, too:

```bash
# OSx / Mac
brew install sst/tap/opencode

# Steam Deck
yay -S opencode-bin

# Windows
¯\_(ツ)_/¯
```

## Now What?

If you were to run `opencode` right now, you would get whatever Provider+Model OpenCode defaults to (_Claude Sonnet 4_ at time of writing), but it will likely fail unless you setup your own auth configuration. A great way of doing that is to use [OpenRouter](https://openrouter.ai). Why?

## Options

![OpenRouter](/images/thumbnail/openrouter.png)

### BUT AT WHAT COST?

There's two types of cost to address here:

1. **_Financial_**: It is possible to use OpenRouter 100% free, however you'll quickly hit the 50-call/day limit. In order to unlock 1000-call/day, you need to buy $10 worth of "Credit." You can use free providers+models and your balance won't go down.
2. **_Privacy_**: Using OpenRouter does mean all of your requests go through them as a proxy in addition to whatever provider+model your request ultimately ends up being sent to. This might be fine - [they don't log](https://openrouter.ai/docs/faq#what-data-is-logged-during-api-use) your prompts - but it also might not be.

## Keys to the Kingdom

Whether or not you decide to drop $10 for the credits, the next steps are the same.

1. Head to [https://openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)
2. Click "Create API Key"
3. Name it something fun, like "Flare576.com Iz Gr8"
4. Enter **`0.01`** for credit limit
    - Not technically necessary, but does prevent you from accidentally spending money
    - Doing `0` will make the key immediately expire
5. Click "Create"
6. Copy that code!
    - "**You will not be able to see it again**" isn't a joke

## Two Ways To Nerd - The Easy Way

Back on your command line, just do

1. `opencode auth login`
2. Choose "OpenRouter"
3. Paste your code
4. Navigate to your project folder
5. Enter `opencode`
6. Do `/models`
7. Type `(free)`
8. Choose one!
9. Do `/init`

That's it! ...Unless...

## The Nerdier Way

First, you're going to want to know about two files:

1. **~/.local/share/opencode/auth.json**
    - This stores all the auth keys you set with `opencode auth login`
2. **~/.local/state/opencode/tui**
    - This stores all settings and information about the TUI (Terminal User Interface)
3. **~/.config/opencode/opencode.json**
    - This stores _just about_ everything else

Personally, I don't like my API keys floating in random locations - I prefer to use a **~/.doNotCommit.d** [folder](https://github.com/Flare576/dotfiles/blob/main/setup/linkFiles.sh#L65) - so I leave **auth.json** empty and set my **opencode.json** like:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "google": {
      "options": {
        "apiKey": "{env:LLM_GEMINI_KEY}"
      }
    },
    "openrouter": {
      "options": {
        "apiKey": "{env:OPENROUTER_KEY}"
      },
      "models": {
        "deepseek/deepseek-chat-v3.1:free": {
          "name": "DeepSeek V3.1 (free)"
        }
      }
    }
  }
}
```

This has ~~two~~ several major advantages:
1. You don't have to worry about accidentally showing your keys
2. You know where to add new models
    - I noticed that when I was writing this guide, _deepseek-chat-v3.1:free_ was available on OpenRouter, but not yet listed in OpenCode.ai
    - Adding it, or any other model you like, is as easy as adding it to that JSON file.
3. This is where you control other stuff like
    - Agents: Personas you can have do things for you
    - Commands: Quick prompts/steps you can have OpenCode do for you
    - Keybinds: There's LOTS of shortcuts if you want to use 'em
    - MCPs: Additional tools / functionality

# Further Reading

- [OpenCode.ai - Setup](#programming/ai/opencode-setup)
- [OpenCode.ai - Project Introduction](#programming/ai/project-introduction)
- [OpenCode.ai - Agents](#programming/ai/opencode-agents)
- [OpenCode.ai - MCP](#programming/ai/opencode-mcp)
- [OpenCode.ai - Commands](#programming/ai/opencode-commands)
- [OpenCode.ai - Project Wrap-up](#programming/ai/opencode-dowork)
