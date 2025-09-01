---
title: "EmuDeck"
date: Sat May 31 01:16:21 PM CDT 2025
published: true
description: "The easiest and best way to setup a Steam Deck to play classic games"
goal: 3
solution: 3
tags: ["steamdeck","howto","guide","emudeck","emulation"]
---
````flare
```nerd-goal-level-3
Goal: Play classic games on your Steam Deck
```
```nerd-solution-level-3
Solution: You'll need to download and run some scripts/installers
```
````

# TL;DR

```you
Flare, there's a lot of words on this page, and I'm more of a... visual learner
```

[Tech Cravers - Ultimate Beginners Guide](https://youtu.be/EIrgHI2-Ttg) has you covered, but check out my [Guide to obtaining game backups](#/steamdeck/guides/copy-roms) if you don't already have ROMs of your games!

# Disclaimer

This guide will not tell you how to download ROMs. Emulators should be used to verify/run backups of games you own. Don't pirate games.

# What is "Emulation"

"Emulators" are applications that simulate different hardware, firmware, or software for the purposes of running games and programs as if the original systems were being used. "Emulation" is used to describe the process of using Emulators to run software.

# What is [EmuDeck](https://www.emudeck.com/)

EmuDeck aims to simplify the process of finding and installing Emulators and managing ROMs on the Steam Deck (and other systems, but we don't talk about those here).

EmuDeck is NOT necessary to run Emulators on your device, but a lawn mower _also_ isn't necessary if you want to cut your grass, but it **is** a fantastic tool to help get the job done.

# Desktop Mode

Ensure you've [started with Desktop Mode](#/steamdeck/guides/desktop-mode-sudo-password) and switch over.

Open Firefox<sup>\*</sup>, and head to [emudeck.com](https://www.emudeck.com/), tap "Download", and choose SteamOS. This will download a file called **EmuDeck.desktop.download** to your Downloads folder.

> <sup>\*</sup> If this is your first time using Firefox, you'll be taken to the Discover app to install it - Do that!

Either click the "Download" icon in the top-right of Firefox and click the folder icon, or open the Dolphin file browser and navigate to the Downloads folder.

Double-click on **EmuDeck.desktop.download**, and when it prompts you, click "Continue."

# Be Patient

It's easy to forget, but this one script is literally setting up everything you need to do a LOT of complicated stuff - it won't take THAT long!

# Setup

Once the installer finishes downloading and initial configuration, you'll be presented with an option of "Easy Mode" or "Custom Mode" - I'd recommend "Custom Mode" as it's not a dramatically longer or more complicated process, and going through it will help you understand what you're all getting and how it's organized.

## Custom Mode

### ROM Directory

The first thing you'll tell the installer is where you plan to keep your ROMs - an SD card, or the internal storage. If at all possible, I'd recommend an SD card - while NES and SNES games are tiny, once you hit the Playstation and other Disc-based systems, era, you're looking at some sizeable files.

But I'm not your real dad, so you live your life.

### Device

You ARE using a Steam Deck, right? This is secret information just for Steam Deck users, you know.

### Emulators / Tools

Yeah, so, welcome to what makes EmuDeck awesome - choose your flavors. You definitely don't want to install ALL of them (for example, installing `Lime3DS` and `Citra` _probably_ isn't necessary). Take your time on this screen and choose the systems you want to be able to Emulate.

Note: "RetroArch" encapsulates a large portion of the oldest, classic systems like the NES, SNES, Game Boy, Sega Master System, etc. - you'll most likely want "RetroArch"

### Configurations

Unless you REALLY know what you're doing, leave everything selected on this screen. The only reason not to is if you know you need/want specific settings/configurations for a given Emulator.

### Auto-Save

It's what it says on the tin. Pretty useful, especially if you're not used to save states.

### Retro Achievements

When I setup EmuDeck last year, these settings didn't actually persist into my Emulators, so I'm not sure if that's been fixed. If someone does a fresh install and configures this, I'd love to know!

### Bezels, Colors, Etc.

You do you here, it's all user preferences.

### Front-ends for Steam Deck

Ok, this one deserves a little explanation. I'm going to assume that you DON'T own the entire NES library, so you're probably installing around 100 games or less per system. If that sounds like you, I'd really recommend adding your games to your Steam Library (i.e., not using EmulationStation-DE [ES-DE] or Pegasus). The EmuDeck and the Steam Deck do a FANTASTIC job of tagging and grouping the games into Collections, and I've been very pleased with the experience.

That said, if you ARE a hoarder, you might benefit from ES-DE or Pegasus. It's 100% up to how you want to interact with your library. The beauty here is that you can experiment however you like, EmuDeck's ROM manager makes changing your mind a breeze.

Choosing ES-DE or Pegasus will then prompt you for theme/configuration.

### Summary

PHEW. Ok, this last page tells you all the things you just chose. Click "Finish," but don't walk away - EmuDeck MAY need you to answer questions or interact with dialog windows. Keep an eye on the task bar for Terminal windows or blinking applications - if it looks like the installer has hung or stopped, it's PROBABLY waiting for you to click OK, but wasn't able to bring the appropriate window to the front.

### Post-Installation

I hope your report card looks awesome. The next step is where I need to get _coy_ with you.

### Copy/Import your ROMs.

I will not tell you how to pirate games, but if you own a bunch of games for consoles, I do have a [Guide to Obtaining Game Backups](#/steamdeck/guides/copy-roms) which walks you through using a tool that I built to make it easy to keep your collection up-to-date. Now is the time to do that if you need to, otherwise you'll need to manually copy your files into the appropriate folder.

## ROM Scanning

Click Next in EmuDeck, and choose your preferred management method (I still recommend Steam Library!). Then click "Launch Steam ROM Manager" (or watch the video, I'm _still_ not your dad.)

> Quick note: This tool is ALSO available from EmuDeck's main application left-hand Nav - Everything up until now is sort of "Do once during setup, and forget about it," but scanning for ROMs is something you'll do anytime you add a new game.

### Select User Account

If you have multiple profiles/accounts/profiles, this allows you to choose which Library you want to work with.

### Select Parsers

This step intimidates me, so I always toggle the dial in the top-right to OFF, then choose one system at a time.

I **HIGHLY RECOMMEND** doing that, ESPECIALLY if this is your first time parsing and you're not 100% sure how you want to display your ROMs. It's way easier to populate one system, hop back over to Game Mode to see how it looks, then reload Desktop Mode and parse the rest or change your settings.

### "Add Games"

More magic time! EmuDeck/Steam ROM Manager will now search the ROM folders for the parses you indicated, find games, look them up, find metadata and images, and basically save you hours of time.

You can use "Exclude Games" at the bottom to select entries you DO NOT want to show up in your Steam Libaray/ES-DE

Once you're happy, click "Save to Steam," and wait while EmuDeck/Steam ROM Manager makes it's dark pact with Valve.

### Optional - EmuDeck Compressor

If your ROMs include XBOX or Playstation games, they might be candidates for _compression_. Feel free to try the "EmuDeck Comprssor" tool in the left-hand nav to see if you can reclaim some storage space!

### Last Steps - BIOS

At this point, MOST systems are ready to go...

However, some aren't. In EmuDeck, on the left nav, there's a "BIOS Checker." This tool will tell you which systems need BIOS files, and which ones are missing.

```nerd-level-5
BIOS stands for Basic Input Output System, and is a set of instructions for a computer or console that acts as a sort of "middle layer" between the hardware and software as well as providing instrutions for booting up. Not every Emulator needs BIOS files, but many newer ones do.
```

BIOS files are a weird duck, legally speaking. You, the consumer, aren't actually **entitled** to them, so there's really no reason to have "backups" of them, and they ARE licensed software... But your console DOES have them for you to access if you have the tools/resources. I think [EmuDeck's Cheat Sheets](https://emudeck.github.io/cheat-sheet/) are probably the best place to start if the system you want to use requires BIOS.

# Game Mode

Ok, Emulators installed, ROMs loaded, BIOS checked, it's time to (finally) play some games! Close EmuDeck and double-click the "Return to Gaming Mod" icon on you desktop.

Once Game Mode loads, press the "Steam" button in the lower-left of your Device, choose "Library," and then use Right Bumper (R1) to Select "Collections." Any system which you parsed should show up here in its own folder, and you just find the game you want!

After launching it from here the first time, it'll show up on your Home page, too, just like any other game you're playing.

# Wrap Up

Questions? Problems? Hit me up on [on Bluesky](https://bsky.app/profile/flare576.com) so I can help or update the instructions!
