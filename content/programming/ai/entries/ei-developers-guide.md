---
title: "Developer's Guide to Ei"
date: Tue Mar 17 02:00:00 PM CDT 2026
published: false
description: "Give your AI coding tools a persistent memory — OpenCode, Claude Code, and Cursor all supported"
goal: N/A
solution: N/A
tags: ["programming","ai","ei","opencode","claude-code","cursor","developer"]
---
```nerd-level-6
Comfortable with terminals, config files, and at least one AI coding tool (OpenCode, Claude Code, or Cursor). You're the target audience.
```

# The Problem

Every session, your AI coding tool forgets you.

It doesn't know you hate deeply nested callbacks. It doesn't know what you decided last Tuesday about the auth architecture. It doesn't know you always name your database helpers `getById`, or that your team lead is Sarah and she prefers async PR reviews.

You re-explain. Every. Time.

> Ei is a persistent knowledge base built from your conversations. Your coding tools can query it.

This guide is about wiring that up.

# Quick Install

If you haven't already, install the TUI (this is what ships the CLI and MCP server):

```bash
# Install Bun if needed
curl -fsSL https://bun.sh/install | bash

# Install Ei
npm install -g ei-tui
```

Then, one command to register Ei with your tools:

```bash
ei --install
```

This detects which agent environments you have installed and wires each one up:

- **OpenCode** → writes `~/.config/opencode/tools/ei.ts`
- **Claude Code** → runs `claude mcp add` (or writes `~/.claude.json` as fallback)
- **Cursor** → writes `~/.cursor/mcp.json`

Restart your tool after running.

# Make Your Agent Actually Use It

`ei --install` handles the plumbing. This step handles the *intent*.

Without it, your agent has Ei technically available but probably won't call it — it doesn't know when or why to reach for it. A small snippet in your agent's config file fixes that.

## OpenCode

Add to `~/.config/opencode/AGENTS.md` (applies to all projects):

````markdown
At session start, query Ei for user context:

```bash
ei "What are the user's current preferences, active projects, and workflow?"
```

Ei is a persistent knowledge base built from the user's conversations — facts, preferences,
people, topics. Use it when the user references past work, mentions how they like things done,
or asks "how did we do X." Query again mid-session when they correct you or reference something
from a previous session.
````

## Claude Code

Add to `~/.claude/CLAUDE.md` (user-level, applies everywhere):

```markdown
At session start, use the **ei** MCP to pull user context: call `ei_search` with a
natural-language query about the user's preferences, active projects, and workflow.

Use Ei when the user references past decisions, mentions people or preferences, or asks
"how did we do X." Query again when they correct you or reference something from a previous session.
```

## Cursor

Create `~/.cursor/rules/ei-mcp.mdc`:

```markdown
---
description: When to use the Ei MCP for user memory and context
alwaysApply: true
---
The **ei** MCP is a persistent knowledge base built from the user's conversations.

Use it when the user refers to past decisions, asks "how did we do X," or mentions preferences,
contacts, or project conventions.

Call `ei_search` with a natural-language query. Optionally filter by type: facts, people, topics, quotes.
```

# How Ei Learns From Your Coding Sessions

This part is genuinely cool and took me longer to build than I expected.

When you have OpenCode integration enabled — in the TUI: `/settings`, set `opencode.integration: true` — Ei will periodically import your OpenCode sessions and process them for context.

Not all at once. Not randomly. Chronologically, starting from where it left off, one session at a time.

It reads the conversational turns, runs extraction passes to pull out facts, preferences, patterns, quotes — then adds those to your knowledge base. Next time you start a session, your agent queries Ei and gets that context back.

```flare
It ended up being a perpetual RAG — Retrieval-Augmented Generation with a knowledge base that grows from your actual conversations instead of a static document set. I didn't plan it that way. I was just trying to solve "my AI keeps forgetting things" and this is where the path led.
```

The result: over time, your personas build up a real picture of you. Not just what you *told* them — what you implied, what you consistently asked for, what you pushed back on, what you mentioned in passing twelve sessions ago.

# CLI Queries

Ei ships a CLI for querying the knowledge base directly. Useful for scripts, debugging, or just checking what Ei actually knows about you.

```bash
ei "query string"              # Up to 10 results across all types
ei facts "query string"        # Only facts
ei people "query string"       # Only people
ei topics "query string"       # Only topics
ei quotes "query string"       # Only quotes

ei -n 5 "query string"         # Limit results
ei --id <id>                   # Full detail on a specific entity
echo <id> | ei --id            # Pipe-friendly version
```

The `--id` flag is designed for piping. Find something interesting, get the full entity:

```bash
ei "memory leak" | jq '.[0].id' | ei --id
```

# Useful TUI Commands

Once you're running `ei`, these are the ones you'll actually reach for:

| Command | What it does |
|---------|-------------|
| `/persona new <name>` | Create a new persona (opens `$EDITOR`) |
| `/provider new` | Add an LLM provider |
| `/settings` | Edit global settings — including the OpenCode integration toggle |
| `/me facts` | View and edit everything Ei knows about you |
| `/me topics` | View and edit your topic data |
| `/tools` | Enable/disable tools per persona |
| `/new` | Context boundary — start a fresh conversation without losing history |
| `/queue` | Inspect the processing queue (useful for debugging) |

All commands start with `/`. Append `!` to force without confirmation (e.g., `/quit!`).

Environment variables worth setting:

```bash
export EI_DATA_PATH="~/.local/share/ei"   # Where Ei stores your data
export EDITOR="nvim"                       # Editor used by /details, /me, /settings, etc.
```

> `tail -f $EI_DATA_PATH/tui.log` — live debug output when something's behaving weird.

# Source Code

[github.com/flare576/ei](https://www.github.com/flare576/ei) — MIT licensed. If something's broken or missing, that's where to file it.

# Further Reading

- [Getting Started with Ei](#programming/ai/ei-your-local-first-ai-ecosystem) — the full user guide if you want to understand the personas, tools, and sync features
- [Getting Started with Local LLMs](#programming/ai/getting-started-local-llms) — run the whole thing locally if you want full privacy
