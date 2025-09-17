---
title: "C4 Architecture Diagrams"
date: Mon Sep  1 05:06:53 PM CDT 2025
published: true
description: "Use PlantUML+C4 to build architecture diagrams"
goal: N/A
solution: N/A
tags: ["programming","vscode","uml","plantuml","architecture","c4"]
---
# Introduction

Before digging into [PlantUML+C4](https://github.com/plantuml-stdlib/C4-PlantUML), it might be a good idea to familiarize yourself with both [PlantUML](#programming/uml/introduction) as well as the [C4 Model](https://c4model.com/)... Or

## The Short Version

### PlantUML

Instead of opening a graphics program like [Draw.io](https://draw.io) to create sequence (and other) diagrams, you can use [PlantUML](https://plantuml.com/) to describe the diagram programmatically.

### C4 Model

Short for **Context, Container, Component, Code**, the C4 Model recommends breaking architecture diagrams, documentation, and discussions into hierarchical pieces, where:

1. **Context**: Describe the highest level of abstraction, talking about how full Applications interact with each other
2. **Container**: For each of those applications, zoom in and describe the systems that make up that application
3. **Component**: Zoom into each of the systems described at the Container level and describe the individual pieces that go into it
4. **Code**: Most of the time, you don't need this level of detail, but if, say, you're handing off a set of diagrams to a third party, getting granular with how you want something built might be valuable

# Prerequisites

Before you start working with C4 Diagrams in VS Code, you're going to need to install one additional component - [GraphViz](https://graphviz.org/).

On OSX, it's as easy as:

```bash
brew install graphviz
```

On a Steam Deck, I **HIGHLY** recommend [Distrobox](#steamdeck/guides/distrobox).

## Getting Your Feet Wet

First, let's get a diagram to start talking about:

```plantuml
@startuml My First C4 Diagram
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Person(user, "Label", "Description")

System_Boundary(sysboundalias, "Label", "Tags"){
    System(konsole, "Label", "Description", "Sprite", "Tags")
    Container(opencode, "Label", "Technology", "Description", "Sprite", "Tags")
}

Rel(user, konsole, "Label", "Technology", "Description", "Sprite", "Tags" )
Rel(konsole, opencode, "Label", "Technology", "Description", "Sprite", "Tags")
@enduml
```

![Basic UML](/images/thumbnail/c4_basic.png)

This diagram shows a few of the entities we can use in our diagrams:

- Person: A human user
- Rel: A relationship between two aliases/entities
- System: A broad-strokes "Thing" in our architecture
- Container: Technically, _not_ part of a "Context" Diagram, but I usually cheat with this one
    * The key difference between a "System" and a "Container" is that you identify the core technology of a "Container"

But, this diagram is a bit... Tall, and not particularly interesting to talk about. Let's make some adjustments:

```plantuml
@startuml OpenCode Basic
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

!define MCPICON https://avatars.githubusercontent.com/u/182288589?s=200&v=4{scale=0.2}
!define DEVICONS  https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/refs/heads/main/icons/devicons
!define DEVICONS2 https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/refs/heads/main/icons/devicons2
!include DEVICONS/terminal.puml
!include DEVICONS/python.puml
!include DEVICONS2/playwright.puml
!include DEVICONS2/figma.puml

Person(user, "Programmer", "Some nerd that likes to write code")

System_Boundary(sysboundalias, "Steam Deck", "The 'Computer' the Nerd uses"){
    System(konsole, "Konsole", "A Terminal emulator", $sprite="terminal")
    Container(opencode, "OpenCode", "Python", "LLM Coding Tool", $sprite="python")
    'Container(figmamcp, "Figma MCP", "NPX", "MCP Proxy for Figma", $sprite=img:MCPICON)
    'Container(playwrightmcp, "Playwright MCP", "NPX", "MCP Proxy for Playwright", $sprite=img:MCPICON)
    'System(playwright, "Playwright Browser Automation", "Tool used to automate/test browsers",  $sprite="playwright")
}

'System(figma, "Figma", "Multi-purpose design tool", $sprite="figma")

Rel(user, konsole, "Runs", "GUI", "Runs from Plasma")
Rel_R(konsole, opencode, "Loads", "command", "`opencode`")
'Rel(opencode, figmamcp, "Calls", "MCP")
'Rel(opencode, playwrightmcp, "Calls", "MCP")
'Rel(playwrightmcp, playwright, "Calls", "CLI")
'Rel(figmamcp, figma, "Calls", "RESTful API")
@enduml
```

![Basic OpenCode](/images/thumbnail/c4_opencode.png)

```flare
Key differences: DEVICONS, meaningful labels, and `Rel_R` to control flow direction
```

Ah! Ok, now we're ready to have a conversation! The user is a "Programmer" that interacts with a "System" called **Steam Deck**, on which are two things called **Konsole** and **OpenCode**. These two systems interact with each other via `opencode`, which is a "command." We don't know what technology **Konsole** uses, but we can tell that **OpenCode** uses Python.

But... In the code, what are all those other lines with apostrophes before them?

# Comments Let You Focus

Here's what we get when we uncomment all those lines:

![Full OpenCode](/images/thumbnail/c4_opencode_full.png)

So, if you need to have a _slightly_ different diagram for a different audience, or even subsequent slides in a given presentation, you don't need to **DRAW** multiple diagrams; just comment out whatever you don't need for the conversation.

# One Modularized Diagram Set

The last big value "Diagrams as Code" offers is that if you choose to keep them separate, but maintain the same aliases, combining them later is just a quick copy/paste and a snapshot.

For example, I have another diagram I made for [OpenCode + OpenRouter](#/programming/ai/opencode-setup) and combining them offers a holistic look:

![Integrated OpenCode](images/thumbnail/c4_complete.png)

Be cautious, though - I talked a little about information overload in my last [Putting It All Together](#/programming/uml/all-together) PlantUML article - once you hit this many entities on one diagram, you risk your audience starting to tune out.
