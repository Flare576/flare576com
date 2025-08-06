---
title: "Flatpak SDKs (Java for VS Code)"
date: Fri Jun 27 09:00:09 PM CDT 2025
published: true
description: "I discovered how Flatpak handles dependency injection to let VS Code run Java!"
goal: 8
solution: 5
tags: ["steamdeck","howto","guide","flatpak","sdk","vscode"]
---
````flare
```nerd-goal-level-8
Goal: Add functionality to flatpaks like Visual Studio Code (VS Code)
```
```nerd-solution-level-5
Solution: Install Flatpak SDKs via command line
```
````
# Flatpak Basics

Linux offers a **lot** of ways to install software (`apt`, `pacman`, `pamac`, `yum`, `yay`, ...), but one of the more universal solutions is [Flatpak](https://flatpak.org/).

The interesting thing about the Flatpak is that everything gets installed to a _sandbox_, where its access to your other files, processes, executables, etc. are all locked down by default.

# What If You WANT To Give It Access

Well, it turns out there's more than one way to do that! I covered [Flatseal](#steamdeck/guides/flatseal) already as a way you can give applications access to files and folders, but giving something _execution_ powers outside of its sandbox is next-level.

Especially if that "something" is [VS Code](https://code.visualstudio.com/), a tool one might use to edit or run code that could ALSO reach outside the sandbox.

# Uh, But It Kinda Needs That Thing

I KNOW! I wrote about [PlantUML in VS Code](#/programming/uml/introduction), and that requires wiring up Java to VS Code! But there **IS** a solution - Flatpak SDKs!

## SD What Nows?

SDKs, or Software Development Kits, are (generally speaking) collections of functionality that you use to perform a specific action. Usually, it's like the [Slack SDK for NodeJS](https://tools.slack.dev/node-slack-sdk/), that makes it easy to integrate with Slack's API.

For our purposes, though, I'm talking about a piece of software that Flatpak uses to _inject_ functionality into an application's sandbox! Instead of giving VS Code access to an instance of Java **outside** of its sandbox, you give it a version of Java **for** its sandbox! Like adding a toy to the sandbox!

## Show, Don't Tell

Aye aye!

```bash
flatpak search Sdk | grep -i jdk # This will show any SDK that includes the string "jdk"
flatpak install org.freedesktop.Sdk.Extension.openjdk21 # I just picked the latest that I saw
# There's a few options here, but I just selected the latest versions and then said "Yes" when asked if I wanted to install

# To confirm that it's got access, you can actually remote into the sandbox
flatpak run --command=sh com.visualstudio.code
> ls /usr/lib/sdk
openjdk21 # You should see your SDK!
```

Then, for me, I had to tell PlantUML where to find the `java` executable:

```json
{
    "plantuml.commandArgs": [],
    "plantuml.java": "/usr/lib/sdk/openjdk21/jvm/openjdk-21/bin/java"
}
```

I restarted VS Code And **`BLAMMO`**

![VS Code PlantUML](./images/thumbnail/flatpak_sdk1.png)

```flare
Regretebly, I don't have enough reputation on Stack Overflow to upvote this response, but I can link to it. THANK YOU, [Mikee3000](https://superuser.com/a/1711843/2929795)
```
