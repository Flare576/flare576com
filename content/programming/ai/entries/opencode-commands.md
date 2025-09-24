---
title: "Commands - OpenCode Features"
date: Fri Sep 12 02:42:56 PM CDT 2025
published: true
description: "I introduce custom commands, some examples, and how to use them in OpenCode"
goal: N/A
solution: N/A
tags: ["programming","ai","opencode","commands"]
---
```flare
Before you dive in, if you haven't read [OpenCode Setup](#programming/ai/opencode-setup), that might be a good starting point!

Then, if you're interested in the context of the overall "Project", you can read that in [the project introduction](#programming/ai/project-introduction).
```

# OpenCode - Commands

If [Agents](#programming/ai/opencode-agents) are **`System Prompts`**, [Commands](https://opencode.ai/docs/commands/) are **`User Prompts`**. In the same way Agent file are a way for humans to share their way of telling LLMs _How_ to act, Commands allow us to share our ways of telling them _WHAT_ to do.

**.opencode/command/analyzeLogin.md**

```markdown
---
description: Analyze a provider's APIs for Social Login or SSO
agent: library-researcher
---

Please review the API provided by $ARGUMENTS, focusing on the login, oAuth, or
SSO system used. After authentication, we need to be able to get a list of the
user's available games. The server-side integration will need to be written in
PHP, so check for libraries or SDKs.

Please write your findings to @research/$ARGUMENTS-api.md
```

## But What If I Don't Know How To Ask?

Other humans have our backs - [Claude Code](https://www.anthropic.com/claude-code) commands, like the ones created by [Wirasm](https://github.com/Wirasm) for [PRP Agentic Engineering](https://github.com/Wirasm/PRPs-agentic-eng/tree/development), work for [OpenCode.ai](https://opencode.ai/). If you want, you can add the [Front Matter](https://mystmd.org/guide/frontmatter) to define a description and what Agent you want to execute the command, otherwise it'll just use your current Agent.

```flare
NOTE: Claude Code uses **.claude/command`s`** (plural), whereas Open Code uses **.opencode/command** (singular). If you're not seeing your commands, check the folder name!
```

# Our Project

We're actually going to load in that [PRP Agentic Engineering](https://github.com/Wirasm/PRPs-agentic-eng/tree/development) and try to build our development plan from that.

# Further Reading

- [OpenCode.ai - Setup](#programming/ai/opencode-setup)
- [OpenCode.ai - Project Introduction](#programming/ai/project-introduction)
- [OpenCode.ai - Agents](#programming/ai/opencode-agents)
- [OpenCode.ai - MCP](#programming/ai/opencode-mcp)
- [OpenCode.ai - Project Wrap-up](#programming/ai/opencode-dowork)

## Resources

- [PRP Agentic Engineering](https://github.com/Wirasm/PRPs-agentic-eng/tree/development)
- [Agent OS](https://github.com/buildermethods/agent-os)
