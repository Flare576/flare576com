---
title: "Why You Need Ei"
date: Tue Apr 28 16:20:08 CDT 2026
published: true
description: "Your coding agent doesn't remember you. Here's why that matters more than you think."
goal: N/A
solution: N/A
tags: ["programming","ai","ei","memory","developer"]
---

````assistant
TL;DR
```sh
bunx ei-tui --install # Provide Claude, Cursor, Opencode MCP access to Ei
bunx ei-tui # Run it

## Inside_Ei
# If you DON'T have a local LLM running
/provider # use YAML editor to wire up providers, API Keys, and models

# Pull your data
/settings # toggle on claudeCode.integration, cursor.integration, etc.
```
````

# The Moment It Clicked

I was onboarding at a new client — **A** **S**tate **U**niversity  — and I needed Slack access.

Not a crazy ask. But the client runs an Enterprise Grid, multiple workspaces, and I was new enough that I didn't know who to even ask. So I did what I've been doing for months: I asked my AI.

Not ChatGPT. Not Claude directly. I asked through Ei — a system I'd been building that keeps a persistent memory of everything I've been working on, everyone I've talked to, and anything that seemed important across all my sessions.

It came back with: *Jesse Doofenshmirtz. DevOps/Security. He was your JFrog contact from the security discussion a few weeks ago — he'd know who handles Slack access.*

I didn't ask it to connect those dots. I didn't say "remember that security meeting." I just asked "who do I talk to about Slack?" and it reached back across two completely separate contexts — a JFrog security discussion from weeks earlier — and surfaced exactly the right person.

Jesse got me access in about ten minutes.

```flare
That was the moment I stopped thinking of Ei as "a project I'm building" and started thinking of it as "a thing I actually use."
```

# The Problem It's Solving

Every AI coding session starts the same way.

You open a new chat. The agent has no idea who you are. It doesn't know you hate deeply nested callbacks. It doesn't know you decided last Tuesday to use Postgres instead of SQLite. It doesn't know your tech lead is Sarah and she wants async PR reviews. It doesn't know you're the third developer to touch this codebase and the first two had opinions about naming conventions.

You re-explain. Every. Single. Time.

Or you don't, and the agent confidently makes decisions that contradict three months of context it never had.

This isn't a complaint about the tools — Claude Code and OpenCode and Cursor are genuinely remarkable. But they're stateless by design. The session ends, the context evaporates.

Ei is the memory layer they're missing.

# What It Actually Does

Ei runs alongside your coding tools. It imports your sessions — OpenCode, Claude Code, Cursor, all three if you use all three — reads through the conversations, and extracts what matters: facts, preferences, decisions, the people you mention, the topics you keep coming back to.

It builds a knowledge base from your actual work. Not from what you *told* it to remember. From what you implied, consistently asked for, and mentioned in passing six sessions ago.

Then it makes that available back to your agents via a CLI and an MCP server.

```bash
bunx ei-tui --install
```

That one command detects which tools you have and wires each one up. Restart your tool, and suddenly it has context. Real context. Yours.

# Why Not Just Use [Other Tool]

Fair question. There are a lot of memory tools now.

Most of them are cloud-first. Your data leaves your machine, lives on someone's server, gets used to make their product better. That's a fine tradeoff for a lot of people. It's not one I wanted to make.

Ei is local-first. If you have a local LLM — LM Studio, Ollama, anything OpenAI-compatible — zero bytes leave your machine. If you use a cloud provider, your messages go to that provider, same as they always did. But the memory, the knowledge base, the thing Ei builds about you? That stays local<sup>*</sup>.

```flare
<sup>*</sup>Literally, actually! By default, Ei saves its information to `$XDG_DATA_HOME`.

Which itself defaults to `~/.local/share`!
```

The other thing most tools don't do is work together: they're silos. Your Cursor memory doesn't talk to your Claude Code memory. Ei uses one knowledge base across all of them. The thing you told OpenCode about your auth architecture is available when you switch to Claude Code tomorrow.

...and none of them have personas. But that's a [different post](#programming/ai/ei-your-local-first-ai-ecosystem).

# Try It

```bash
# Install Bun if you don't have it
curl -fsSL https://bun.sh/install | bash

# Run Ei (no install needed)
bunx ei-tui
```

First launch checks for a local LLM on port 1234 (LM Studio) or 11434 (Ollama) and connects automatically. No local LLM? Run `/provider new` and add one.

Then you get to make a choice - You can keep following this guide and the `/help`...

Or you can just ask Ei in your TUI.

```flare
And, if you like the idea of building Choose Your Path arcs, you might want to check out [Ei Rooms](...)
```

# Settings Path

Then turn on your coding tool integrations:

```
/settings
```

Set `opencode.integration: true` (or `claudeCode`, or `cursor` — your call). Ei starts importing your sessions in the background, chronologically, one at a time so it doesn't slam your provider.

Give it a session or two. Then just ask your coding tool something you'd normally have to re-explain.

> "What have I been building lately?"
>
> "Who should I talk to about [thing]?"
>
> "What did I decide about the auth architecture?"

Your agent will reach for Ei. You won't have to tell it to.

If it comes back with something that surprises you — something you mentioned three weeks ago that you'd half-forgotten — that's the moment.

You'll know it when it happens.

# Further Reading

- [Getting Started with Ei](#programming/ai/ei-your-local-first-ai-ecosystem) — full walkthrough: personas, tools, sync, web vs TUI
- [Developer's Guide to Ei](#programming/ai/ei-developers-guide) — the wiring details: MCP setup, CLI queries, integration config
- [Getting Started with Local LLMs](#programming/ai/getting-started-local-llms) — run the whole thing locally if you want full privacy
