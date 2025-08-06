---
title: "C4 Architecture Diagrams"
date: Mon Aug  4 02:52:57 PM CDT 2025
published: false
description: "Use PlantUML+C4 to build architecture diagrams"
goal: N/A
solution: N/A
tags: ["programming","vscode","uml","plantuml","architecture","complete"]
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

Before you start working with C4 Diagrams in VS Code, you're going to need to install one additional component - 

Not sure how to install this on steamdeck yet
TODO: don't forget to update Desc/Title/Filename

# Control Your Flow

Sometimes your diagrams will get really complex, and you'll want to guide GraphViz. You can do that by defining the direction the arrow LEAVES the origin:

```plantuml
Rel_U(origin, destination, "Relationship Arrow Goes UP"
Rel_D(origin, destination, "Relationship Arrow Goes DOWN"
Rel_L(origin, destination, "Relationship Arrow Goes LEFT"
Rel_R(origin, destination, "Relationship Arrow Goes RIGHT"
```
