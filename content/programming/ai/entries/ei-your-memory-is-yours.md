---
title: "Your Memory Is Yours"
date: Tue May 15 01:00:00 PM CDT 2026
published: false
description: "Privacy isn't a policy Ei has. It's an architectural property of where your data lives."
goal: N/A
solution: N/A
tags: ["programming","ai","ei","privacy","local-llm","local-first"]
---

"We take your privacy seriously."

Every company says this. Every company that has ever had a breach said it the week before the breach. The phrase has been so thoroughly drained of meaning that reading it now is basically a tell — if you have to say it, you probably don't have a structural answer.

Ei doesn't say it. Instead, Ei has a filesystem path.

## The Actual Threat Model

Here's the thing most "privacy-first" AI tools get wrong. They encrypt your data. Great. But they encrypt it with keys they control, on servers they operate. When you ask "is my data safe?", the honest answer is: "as long as their infrastructure isn't compromised, their employees aren't malicious, and their key management is sound."

That's a lot of trust to extend to a startup with a privacy policy.

The threat model most people actually care about isn't "will this company sell my data to advertisers." It's "what happens when their S3 bucket gets misconfigured" or "what happens when they get acquired and the new owners have different values." Encryption at rest doesn't help you if the breach includes the keys.

Local-first sidesteps this entirely. There's no server to breach for the core knowledge base. The data isn't there.

## Where Ei Actually Stores Your Data

```
~/.local/share/ei
```

That's it. That's the default, via `XDG_DATA_HOME`. Not a policy. Not a promise. A filesystem path you can `ls`, `cat`, back up, or delete. You own it the same way you own anything else in your home directory.

Ei builds a persistent knowledge base from your AI coding sessions — it reads your OpenCode, Claude Code, and Cursor conversations, extracts facts, preferences, people, topics, and builds a structured memory that travels with you across sessions. All of that lives locally. No account required. No telemetry. No "we may use your data to improve our services."

```flare
The knowledge base is just files. You can read them. You can delete them. You can put them in a git repo if you want. That's the point.
```

## The Optional Sync, Honestly

If you work across multiple machines, you can sync to flare576.com. I want to be clear about what that means and what it doesn't.

The encryption key is derived from credentials that never leave your device. The server receives a blob it cannot read. I can't read your memory. If flare576.com disappeared tomorrow, you'd still have your local copy and the key to decrypt any blobs you'd already pulled down.

Is this "perfectly private"? No. You're trusting that the client-side encryption implementation is correct, that the key derivation is sound, and that I haven't done something stupid. Those are real trust assumptions. They're just much smaller than "trust that this company's entire infrastructure and all their employees are trustworthy forever."

You can audit the implementation. It's MIT licensed at [github.com/flare576/ei](https://github.com/flare576/ei).

## The LLM Layer

This is where it gets interesting, and where I want to be precise rather than vague.

**With a local LLM** (Ollama, LM Studio, anything running on your machine): zero bytes leave your machine. Not your messages, not the summaries Ei generates, not the knowledge base. The whole loop is local. If you want to understand what that setup looks like, I wrote a [getting started guide for local LLMs](#programming/ai/getting-started-local-llms).

**With a cloud LLM** (Claude, GPT-4, Gemini): your messages go to that provider, same as they always did. Ei doesn't change that. What Ei changes is the memory layer — the knowledge base that gives your AI context about you stays local. The conversation goes to Anthropic or OpenAI. The accumulated understanding of who you are and what you care about does not.

```flare
Using Claude with Ei is not more private than using Claude directly. It's equally private at the conversation layer, and more private at the memory layer. Know the difference.
```

That distinction matters. A lot of "privacy-first AI" tools are vague about exactly this boundary. Ei isn't, because the architecture makes it unambiguous.

## Why Architecture Beats Policy

Policies change. Companies get acquired. Employees leave. Threat models evolve. An architecture that keeps your data on your machine doesn't require you to trust that none of those things will happen in a bad way.

This isn't a knock on cloud-first tools. There are real tradeoffs. Multi-device sync is genuinely harder when you're not storing data centrally. Collaboration features are harder. Onboarding is slightly more involved.

But if your threat model includes "I don't want my AI memory to be someone else's liability," local-first is the only structural answer. Everything else is a policy.

## Try It

No global install required:

```bash
bunx ei-tui
```

Or if you prefer:

```bash
npm install -g ei-tui
ei
```

If you want context on what Ei actually does before you run anything, the [Getting Started guide](#programming/ai/ei-your-local-first-ai-ecosystem) covers the basics, and the [Developer's Guide](#programming/ai/ei-developers-guide) goes deeper on the architecture and extension points.

Your memory is yours. That's not a feature. It's where the files are.
