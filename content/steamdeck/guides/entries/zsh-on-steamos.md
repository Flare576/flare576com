---
title: "ZSH on SteamOS"
date: Sat Jun 28 12:59:59 PM CDT 2025
published: true
description: "I talk about using an alternate shell to keep the Deck snappy"
goal: 7
solution: 7
tags: ["linux","zsh","shell","bash","guide"]
---
```nerd-goal-level-7
Goal: Have a separate environment to install extra software and customize the Steam Deck without impacting performance
```
```nerd-solution-level-7
Solution: Launch and configure ZSH
```

# What The Shell

I'm honestly not sure where to start on this one, because I don't know where you (the reader) are at in your journey... So maybe a quick glossary will help us speak the same language at least.

### Baseline Terms

- Operating System (OS) - The code/functionality between you and your hardware - Specifically, SteamOS on the SteamDeck
- Distribution (Distro) - In the Linux world, it's a specific implementation or wrapper around the Linux Core/kernel.
- Arch Linux - The Linux Distro on which SteamOS is built
- Command Line Interface (CLI) - Two common definitions:
  1. The interface where you enter commands for your computer (usually "**_The_** CLI")
  2. A utility that adds functionality to the CLI (usually "**_A_** CLI")
- Terminal Emulator - The tool that you use to access the CLI, like Konsole on the Steam Deck

### For Our Conversation

- Shell - A set of commands/tools that you use to interact with the CLI
- Bash - The default shell of SteamOS
- ZSH - An alternate shell available on SteamOS
- Environment Variable (envar) - A key/value pair. Sort of global data that commands you run in your shell can access
- PATH - An important envar that tells the shell where to find OTHER commands/tools/etc.
- **.bashrc**, **.bashenv**, **.zshrc**, **.zshenv** - "Profile" files that are used every time you load the shell
    * This can be when you open a new Terminal Emulator window, run a script, open some applications, and other times

# Breakdown

Everything you add to your Profile Files for a Shell, and every additional folder you add to your `PATH`, will slow down loading your shell and run the risk of breaking things.

It might be by microseconds, it might be by seconds, and it might break in subtle ways you don't notice right away.

I've provided instructions for installing [NonSteamLaunchers](#steamdeck/guides/nonsteamlaunchers), [Waydroid](#steamdeck/guides/waydroid), [Decky Loader](#steamdeck/decky/introduction) and others that run commands as part of their setup, and if you flood the Bash Profile Files with extraneous bits and pieces, it will impact how these (and everything else) runs.

TL;DR - I HIGHLY recommend avoiding modifying **.bashrc** and **.bashenv**.

# Wait, You Have Lots Of Custom Stuff!

![Konsole Screenshot](./images/thumbnail/zsh_1.png)

Yup, and I've been through a few iterations of how to approach doing it:

```flare
## Approach 1: Separate User Account

### How It Worked

I don't remember if I used the CLI or the `Users` application, but I stood up a totally separate user account on the Steam Deck. I'd open a new Konsole instance (which would start as the default `deck` user), then run `su flare576`. I'd be prompted for my password, and then I'd load into ZSH.

### Advantages

I could set the default shell to ZSH, customize my **.zshenv** and **.zshrc** as much as I wanted, and not have to worry about impacting the `deck` user at all. Additionally, if I do something wrong (like deleting my home folder instead of a sub folder), it's less likely to hurt the overall system.

### Disadvantages

The Steam Deck doesn't have any way to ACTUALLY log-in as the other user, so any GUI programs (like, the Dolphin file browser) only run as `deck`. This means you can't browse the folders under **/home/flare576** without screwing with default permissions and other settings - it sort of defeats the purpose of having a separate user.
```

```flare
## Approach 2: Set Up ZSH As deck, But Not As Default Shell

### How It Worked

Opening a new Konsole window still loads into Bash, but typing `zsh` flips you over to ZSH. The first time you do it, it'll ask you if you want to start with a blank **.zshrc** file or setup some options. You do you!

### Advantages

I can still separate my **.bashrc** and my **.zshrc**, allowing me to keep the default Bash shell nearly empty. Typing `zsh` doesn't prompt for a password as I'm not changing users. I have full access to my files and folders from GUI systems like Dolphin.

### Disadvantages

The **/home/deck** folder DOES get a little messy by various programs and operations. Also, since I'm still operating as `deck`, it's more likely that something I mess up will have wider reprecussions (but, that's true in the GUI utilities, too).
```

I've been using Approach 2 for a few weeks and so far I haven't had any problems, so I feel comfortable saying that this is the approach I recommend.

## Ok, But Why ZSH?

There's a LOT of reasons I like ZSH, and I think it warrants its own post under [Programming](#programming) eventually, but if you're interested in self-learning, I have all of my [dotfiles](https://github.com/flare576/dotfiles) available in Github, and I've got a Work-In-Progress [Steamdeck setup script](https://github.com/Flare576/dotfiles/blob/main/setup/NIX/steamdeck.sh).
