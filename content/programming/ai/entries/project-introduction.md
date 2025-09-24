---
title: "Project Introduction"
date: Mon Sep  1 05:53:12 PM CDT 2025
published: true
description: "I wax poetic about AI, then I introduce my pet project"
goal: N/A
solution: N/A
tags: ["programming","ai","opencode","agents","commands", "mcp"]
---
# Introduction

My favorite metaphor for software development is a toolbox.

Carpenters will have 5 different [saws](https://en.wikipedia.org/wiki/Category:Saws), a power drill, maybe an awl or two in theirs.

Auto mechanics, leather workers, tailors, and gardeners will all have a completely different, but just as eclectic, load-out.

My toolbox includes physical objects, too - my [keyboard](https://github.com/Flare576/sofle), [Steam Deck](#/steamdeck/how-i-got-my-steam-deck), and [USB-C Hub](#/steamdeck/peripherals/cable-matters-triple-monitor-usb-c-hub), for example - but also a LOT of software.

I like to think of the software as my version of "Power Tools."

## AI Is A Power Tool

Some power tools, like a [drill](https://en.wikipedia.org/wiki/Drill)(c.1889), are so common, so established, that their perceived risk is minimal, and the instructions you need to use them are trivial.

But try putting a 1/2" (~13mm) socket adapter on your drill, leave it set for "tighten", and try to hold on while you pull the trigger on a tight lug nut. You probably won't die, but it's gonna hurt.

A few of my tools are like that - [VS Code](https://vscodium.com/) is the evolutionary result of decades of Integrated Development Environments (IDEs) - easy to open, understand, and use, and one misclick away from a bad, albeit recoverable, day.

![Delete is pretty close to Rename](/images/thumbnail/opencode_vscode.png)

Some tools, though, are more like a [sewing machine](https://en.wikipedia.org/wiki/Sewing_machine) -  complicated, industry-specific, incredibly useful, and very painful to make a mistake on.

I think of [Claude Code](#proramming/ai/claude-code-1), [Cursor](https://cursor.com/en), [OpenCode](https://opencode.ai/), etc. like that.

A sewing machine, at first glance, doesn't LOOK that complicated - needle go up, needle go down - but like AI code tools, there's a LOT that goes into it.

As we work through the features and abilities of [OpenCode.ai](https://opencode.ai/), I'd like to do so with a goal in mind.

# The Project

```flare
When I used a Windows PC, I relied heavily on an application called [Playnite](https://playnite.link/). The key value for me was that this application acted as a universal hub for all of my game launchers and libraries, allowing me to quickly search across all of them to determine if I owned a game and on what platform.

When I switched to a Steam Deck, I lost the ability to quickly search in this way, instead needing to launch each app to search.

I'd like to build a website that a user can come to, link their Libraries to, and then search across all of them at once. I want to support, at a minimum:

- Steam
- Epic
- GoG
- itch.io
- Humble Games

I'd love to create a client-side only web app that can be hosted on Github Pages, but I believe several of these systems, including Steam, require a server-side redirect for its auth flow. If this is the case, we need to build the server-side component on PHP 8.3.
```

## Secondary Requirement

I don't want to spend any money* on AI tooling for this project.

```flare
*: I'm OK "spending" $10 on OpenRouter's 1000-calls/day entrance fee, but my goal is to not spend any of those credits or any additional funds.
```

# Further Reading

- [OpenCode.ai - Agents](#programming/ai/opencode-agents)
- [OpenCode.ai - MCP](#programming/ai/opencode-mcp)
- [OpenCode.ai - Commands](#programming/ai/opencode-commands)
