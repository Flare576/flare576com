---
title: "Agents - OpenCode Features"
date: Mon Sep  1 08:00:00 PM CDT 2025
published: false
description: "I introduce Agents, what they are, and how and why you'd use them"
goal: N/A
solution: N/A
tags: ["programming","ai","opencode","agents"]
---
```flare
Before you dive in, if you haven't read [OpenCode Setup](#programming/ai/opencode-setup), that might be a good starting point!

Then, if you're interested in the context of the overall "Project", you can read that in [the project introduction](#programming/ai/project-introduction).
```

# OpenCode - Agents

Technically, as soon as you open OpenCode, you're using an "Agent" - **Build**. You can hit **`Tab`** and switch to the other default primary agent, **Plan**.

## Purpose

- _Primary Agents_, like **Build** and **Plan**, act as "Modes of operation" in OpenCode.
    * You might want to switch into **Sales** mode, using a prompt, model, and tool set that focuses on increasing revenue.
- _Subagents_, like **@general**, act as specialized task runners for you or _Primary Agents_
    * You can invoke them yourself by doing **`@general` help me search for pelicans in this code base**

## Structure

Agents have several characteristics:

- Mode: _primary_ or _subagent_
- Description: ...it's a description.
- Model: If there's a specific model you want the agent to use, you can specify it
    * _google/gemini-2.5-flash_
- Tools: Which tools the agent does (or does not) have access to by default
    * **`write`**, **`edit`**, **`bash`**, [full list](https://opencode.ai/docs/agents/#available-tools) set to `true` or `false`
    * If no tools are specified, **ALL TOOLS RE ENABLED BY DEFAULT**
- Permission: Three categories (**`bash`**, **`edit`**, and **`webfetch`**), broken down by:
    * **`allow`**, **`ask`**, **`deny`**
    * `bash` is unique, because it gives access to many **`commands`**, so you can get specific
    * See below for Markdown example, or [Source docs](https://opencode.ai/docs/agents/#permissions) for JSON
- Temperature: How "Deterministic" or "Creative" an agent should be
    * 0.0 - 0.2: Analysis and Planning
    * 0.3 - 0.5: General development
    * 0.6 - 0.9: Brainstorming, exploration
    * 1.0+ : Creative writing 😛
- Prompt: The prompt to use for this agent, as the body of the doc, a string, or a file reference
    * **`{file:./prompts/build.txt}`**

## What Does This Mean To Me

Would you hire someone who assured you they were a master marketer, developer, architect, bartender, interior designer, and everything else you could ever need?

No, because even if they COULD do all of those things, they obviously have a hard time _focusing_ on one thing.

LLMs are the same way. The difference is that you CAN focus that ocean of knowledge into a river of productivity, and you do it with **`System Prompts`**.

Agents are glorified system prompts.

### Show, Don't Tell

**~/.claude/agents/ford-prefect.md**
```markdown
---
description: An example of an agent that can do most things on the command line, but not everything!
mode: subagent
model: google/gemini-2.5-flash
temperature: 0.2
permission:
  webfetch: deny
  edit: ask
  bash:
    "*": allow
    "git push": ask
    "rm": deny
---
You are a hoopy frood that sasses everyone and always knows where your towel is.
```

```flare
Note: The order of those **`bash`** Permissions is important:
- `"*": allow` - Unless noted, allow
- `"git push": ask` - Ask for each `git push`
- `"rm": deny` - This agent cannot `rm` files/folders
```

# Our Project

Since OpenCode.ai already has **Build** and **Plan**, we're going to need a few other agents:

- **Researcher**
    * See [Wirasm's PRPs Agentic - Library Researcher](https://github.com/Wirasm/PRPs-agentic-eng/blob/development/.claude/agents/library-researcher.md) & [My OpenCode Version](https://github.com/Flare576/myLibrary/blob/main/.opencode/agent/library-researcher.md)
    * We're going to need someone who can focus on figuring out Steam, Epic, and everyone else's APIs
- **UI Designer**
    * See [Awesome Claude Code SubAgents - UI Designer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/ui-designer.md) & [My OpenCode Version](https://github.com/Flare576/myLibrary/blob/main/.opencode/agent/ui-designer.md)
    * Will help us figure out a good way to allow searching, returning results, and managing account linking
- **Full Stack Developer**
    * See [Awesome Claude Code SubAgents - Fullstack Developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/fullstack-developer.md) & [My OpenCode Version](https://github.com/Flare576/myLibrary/blob/main/.opencode/agent/fullstack-developer.md)
    * Will help us ask questions we didn't think about during planning

# Further Reading

- [OpenCode.ai - Setup](#programming/ai/opencode-setup)
- [OpenCode.ai - Project Introduction](#programming/ai/project-introduction)
- [OpenCode.ai - MCP](#programming/ai/opencode-mcp)
- [OpenCode.ai - Commands](#programming/ai/opencode-commands)
- [OpenCode.ai - Project Wrap-up](#programming/ai/opencode-dowork)

# Resources:

- For over a hundred more sub-agents, check out [VoltAgent's Awesome Claude Code Subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)
    * NOTE: You'll need to massage the [Front Matter](https://mystmd.org/guide/frontmatter) a bit since they use Claude Code syntax
