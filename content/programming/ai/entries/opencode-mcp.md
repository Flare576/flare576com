---
title: "MCPs - OpenCode Features"
date: Mon Sep  1 09:18:03 PM CDT 2025
published: true
description: "I introduce Model Context Protocol (MCP) servers, and what they mean to OpenCode"
goal: N/A
solution: N/A
tags: ["programming","ai","opencode","mcp"]
---
```flare
Before you dive in, if you haven't read [OpenCode Setup](#programming/ai/opencode-setup), that might be a good starting point!

Then, if you're interested in the context of the overall "Project", you can read that in [the project introduction](#programming/ai/project-introduction).
```

# OpenCode - MCPs

Model Context Protocol (or [MCP](https://en.wikipedia.org/wiki/Model_Context_Protocol)) Servers aren't specific to OpenCode - it's actually an open standard introduced by [Anthropic](https://www.anthropic.com/) in November 2024 to define a mechanism for how LLMs (and their tool sets) interact with external tools.

Essentially, it defines a fancy [proxy](https://en.wikipedia.org/wiki/Proxy_server).

# Cool. Why Do We Care?

Imagine if you could tell your AI coding tool "Retrieve the revision my designer just published to Figma and implement it."

[Figma Developer MCP](https://www.npmjs.com/package/figma-developer-mcp)

Or, what if you could tell the tool "I just got assigned JIRA-1234. Figure out what it's about and make a plan."

[Atlassian MCP](https://github.com/sooperset/mcp-atlassian)

And, what if you're not one of those rare devs that actually tests their code?

[Playwright MCP](https://github.com/microsoft/playwright-mcp)

# Those Don't All Work, Though, Right?

If you go out and get the API Keys for them..

```bash
export FIGMA_TOKEN="figd_1234123"
export GITHUB_PERSONAL_ACCESS_TOKEN="github_pat_1234"
export ATLASSIAN_TOKEN="ATATT1234123"
export ATLASSIAN_EMAIL="admin@flare576.com"
export ATLASSIAN_BASEURL="https://your-company.atlassian.net"
```

Then, yeah, they work great:

**~./config/opencode/opencode.json**
```javascript
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "figma": {
      "type": "local",
      "command": [
        "npx",
        "-y",
        "figma-developer-mcp",
        "--figma-api-key={env:FIGMA_TOKEN}",
        "--stdio"
      ],
      "enabled": true
    },
    "atlassian": {
      "type": "local",
      "command": [
        "distrobox-host-exec",
        "podman",
        "run",
        "-i",
        "--rm",
        "-e", "CONFLUENCE_URL",
        "-e", "CONFLUENCE_USERNAME",
        "-e", "CONFLUENCE_API_TOKEN",
        "-e", "JIRA_URL",
        "-e", "JIRA_USERNAME",
        "-e", "JIRA_API_TOKEN",
        "ghcr.io/sooperset/mcp-atlassian:latest"
      ],
      "environment": {
        "CONFLUENCE_URL": "{env:ATLASSIAN_BASEURL}/wiki",
        "CONFLUENCE_USERNAME": "{env:ATLASSIAN_EMAIL}",
        "CONFLUENCE_API_TOKEN": "{env:ATLASSIAN_TOKEN}",
        "JIRA_URL": "{env:ATLASSIAN_BASEURL}",
        "JIRA_USERNAME": "{env:ATLASSIAN_EMAIL}",
        "JIRA_API_TOKEN": "{env:ATLASSIAN_TOKEN}"
      },
      "enabled": true
    },
    "playwright": {
      "type": "local",
      "command": [
        "distrobox-host-exec",
        "podman",
        "run",
        "-i",
        "--rm",
        "docker.io/mcp/playwright:latest"
      ],
      "enabled": true
    }
  }
}
```

```flare
NOTE: If you use [Docker](#programming/scripting/docker), swap `podman` in these configs for that. The above `podman` commands use the [Steam Deck's Distrobox](#steamdeck/guides/distrobox) solution.
```

## Three Types of LLM Integration

As far as I can tell, "Tool" integration with AI tools falls into three categories:

- Command Line Tools
    * Bash built-ins like **`grep`**, **`awk`**, **`sed`**...
    * But also [gh](https://github.com/cli/cli), [jq](https://jqlang.org/)...
    * And [python](https://www.python.org/), [NodeJS](https://nodejs.org/en), and anything else you have installed
- MCPs via [npx](https://docs.npmjs.com/cli/v8/commands/npx)
    * You need [NodeJS](https://nodejs.org/en/download)
    * (_TECHNICALLY_, these are a subset of the first kind, but ¯\\_(ツ)_/¯)
- MCPs via Docker / Podman / etc.
    * You need some flavor of [Docker](#/programming/scripting/docker)

![MCPs OpenCode](/images/thumbnail/opencode_mcps.png)

```flare
Curious about the diagram? Check out [C4 PlantUML](#/programming/uml/c4-diagrams)
```

# Our Project

We're not going to have [Figma](https://www.figma.com/) files or [Jira Tickets](https://www.atlassian.com/software/jira), but we will be building a web system, so including [playwright tests](https://playwright.dev/) seems pretty logical. We'll wire that MCP up for our project!

# Further Reading

- [OpenCode.ai - Setup](#programming/ai/opencode-setup)
- [OpenCode.ai - Project Introduction](#programming/ai/project-introduction)
- [OpenCode.ai - Agents](#programming/ai/opencode-agents)
- [OpenCode.ai - Commands](#programming/ai/opencode-commands)
- [OpenCode.ai - Project Wrap-up](#programming/ai/opencode-dowork)
