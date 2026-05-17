---
title: "Your Persona Is a Stranger. Every. Single. Session."
date: Tue May 14 05:00:00 PM CDT 2026
published: true
description: "OhMyOpenCode gave you a persona. Ei is what makes it stop being a stranger."
goal: N/A
solution: N/A
tags: ["programming","ai","ei","personas","opencode","memory","developer"]
---

# Your Persona Is a Stranger. Every. Single. Session.

You have an AGENTS.md. You've got a persona — maybe Sisyphus from OhMyOpenCode, maybe something you've tuned yourself. It has a name, a personality, a working style. It knows to prefer TypeScript, to ask before deleting things, to write tight commits.

And then you open a new session and it has absolutely no idea who you are.

That's not a persona problem. That's a memory problem. And they're not the same thing.

## The Persona Is Not the Problem

A well-crafted persona is genuinely valuable. It defines *who the agent is* — the traits, the defaults, the operating style. OhMyOpenCode's Sisyphus persona is a solid starting point: opinionated, focused, built for execution. The system prompt does real work.

But here's what a system prompt can't do: it can't capture three months of working with you.

It can't know that you switched from Yarn to Bun in February. It can't know that you've told the agent four times that you hate when it adds comments to obvious code. It can't know that the project you're about to open has a weird Terraform setup that requires a specific workaround, or that you prefer to be asked before any architectural decision, or that you've been burned by a particular pattern and you've said so, explicitly, in past sessions.

```flare
The system prompt defines who the persona IS. It can't define who YOU are — and it definitely can't capture who you've *become* together over months of actual work.
```

You can't write a system prompt long enough to fix this. The knowledge has to be *built*, not pre-written. It has to come from actual sessions, not from you trying to anticipate everything you'll ever need to communicate.

## You Don't Stay the Same Person Either

Think about how you've changed as a developer over the last three months. You've learned things. Changed your mind about some patterns. Refined your taste. Maybe you've started a new project, picked up a new tool, or had a bad experience with an approach you used to like.

Your agent should be able to do the same thing. But without persistent memory, it can't. It's locked at v1.0 forever, no matter how many times you've corrected it, refined it, or taught it something. Every session is day one. Every session, you're re-establishing context that you've already established.

That's not a persona. That's a very sophisticated template.

## What Ei Actually Does

[Ei](https://github.com/flare576/ei) is a local-first memory layer. It reads your sessions from OpenCode, Claude Code, and Cursor, then extracts the signal: facts about you, your preferences, your projects, the people you work with, topics you care about, things you've said that matter. It builds a persistent knowledge base from actual collaboration, not from what you thought to write down in advance.

The knowledge base is queryable via MCP (`ei_search`) and from the CLI (`ei "query"`). More importantly, agents are configured to query it automatically at session start. You drop a snippet into your AGENTS.md or CLAUDE.md, and from that point on, every session begins with the agent pulling relevant context before you've typed a single word.

It's not magic. It's just the thing that was obviously missing.

## Sisyphus, Specifically

I've been running Sisyphus as my primary coding agent for months. The persona itself is good — it's why I kept it. But what's made it actually useful over time isn't the system prompt. It's what Ei has accumulated alongside it.

Ei's knowledge base now contains my preferences across dozens of sessions. It knows which projects I'm actively working on and what their quirks are. It knows I want to be asked before branching. It knows I use vroom for project management and that I have a specific folder structure for secrets. It knows the architectural decisions I've made and why. It knows the things I've pushed back on and the things I've doubled down on.

When Sisyphus starts a session now, it queries Ei and gets a snapshot of who I am and where we left off. The persona defines the agent's character. Ei gives it context about mine.

That's the difference between a persona and a partner.

```flare
The persona is the agent's identity. Ei is the relationship. You need both.
```

## The Architectural Point

This isn't a prompt engineering problem. You can't engineer your way out of it. The information that makes an agent genuinely useful over time — the corrections, the preferences, the project-specific knowledge, the accumulated context — doesn't exist until you've actually worked together. It can only be captured from real sessions.

Ei does that capture automatically. Every session you run gets imported, processed, and added to the knowledge base. The agent gets smarter about *you* without you having to do anything extra. No manual note-taking, no updating a context file, no re-explaining things you've already explained.

The knowledge base grows. The persona evolves. The relationship deepens.

That's what "persistent memory" actually means in practice. Not a file you maintain. A system that maintains itself.

## Get It Running

Install is one command:

```bash
bunx ei-tui --install
```

It detects your coding tools automatically and wires everything up. After that, read the [Developer's Guide to Ei](#programming/ai/ei-developers-guide) — it covers how to configure your agents to query Ei at session start, how the extraction works, and how to get the most out of the knowledge base.

If you want the broader picture first, [Getting Started with Ei](#programming/ai/ei-your-local-first-ai-ecosystem) covers the full ecosystem.

Your persona is already good. Give it something to work with.
