---
title: "Intro: Installing Your Gateway to Customization"
date: Sat Jun  7 01:46:16 PM CDT 2025
published: true
description: "How to install, and why you'd want it"
goal: 2
solution: 2
tags: ["steamdeck","howto","guide","decky"]
---
````flare
```nerd-goal-level-2
Goal: Customize your Steam Game Mode look and functionality
```
```nerd-solution-level-2
Solution: Install Decky Loader in Desktop mode, then add plugins via Game Mode
```
````

# DeckyLoader - Your Gateway to Customization

When I was doing research after [Acquiring my Steam Deck](#/steamdeck/how-i-got-my-steam-deck), I saw numerous videos saying "You want Decky!" or "Decky is great," but no one explained WHY, or what it does, or how, so that's what I want to focus on.

## What Does It Do?

DeckyLoader adds a section to your Game Mode's Quick-Access (the `...` button) menu - it looks like little plug icon. That's it - on it's own, DeckyLoader doesn't really change much... but it's what you can do in that menu that makes it **VERY** useful.

## Ok, Fine, What Does It _ALLOW_ Me To Do?

At the top of the menu is a little "Shop" icon, and opening it will show you the full listing of all the plugins available. There are a LOT of them, so I'm going to make separate articles for each of them, but if you just want the recommendations, here they are:

- [ProtonDB Badges](#steamdeck/decky/protondb-badges)
    * TL;DR - Adds a badge to game pages to show how well a game will work on Steam Deck / Proton
- [SteamGridDB](#steamdeck/decky/steamgriddb)
    * TL;DR - Allows you to **easily** edit the images/icons associated with a game, launcher, or app in your library
- [IsThereAnyDeal for Deck](#steamdeck/decky/isthereanydeal)
    * TL;DR - Queries [IsThereAnyDeal](https://isthereanydeal.com/) for price information and displays it on the Steam store page
- [HLTB for Deck](#steamdeck/decky/hltb)
    * TL;DR - Show How Long To Beat stats on a games library page
- [Notebook](#steamdeck/decky/notebook)
    * TL;DR - Allows you to take quick notes from inside the Decky Quick-Access area
- [Playtime](#steamdeck/decky/playtime)
    * TL;DR - Tracks your playtime in non-Steam games with in-depth stats and summaries
- [NonSteamLaunchers](#steamdeck/guides/nonsteamlaunchers) 
    * TL;DR - This is actually a utility **AND** a Decky Plugin for installing games from Epic, GoG, etc.
- EmuDecky
    * Allows you to adjust some settings for your Emulators installed via [EmuDeck](#/steamdeck/guides/emudeck)
- [RadioYo!] // circle back to this one

## Installation / Update

### Desktop Mode

Ensure you've [started with Desktop Mode](#/steamdeck/guides/desktop-mode-sudo-password) and switch over.

Open Firefox<sup>\*</sup>, and head to [https://decky.xyz](https://decky.xyz), tap "Download" in the top-right. This will download a file called **decky_installer.desktop.download** to your Downloads folder.

> <sup>\*</sup> If this is your first time using Firefox, you'll be taken to the Discover app to install it - Do that!

Either click the "Download" icon in the top-right of Firefox and click the folder icon, or open the Dolphin file browser and navigate to the Downloads folder.

Double-click on **decky_installer.desktop.download**, and when it prompts you, click "Continue."

You'll be prompted for your **`sudo`** password. This is because Decky needs to modify/create files inside of your Steam Deck's protected (read-only by default) file system.

After you provide the password, you'll be given the choice on which "Branch" you want to install - just choose "release" and press `OK`. Wait a few seconds, then press `OK` again.

That's it! You can switch back to Game Mode and use the Quick Access (`...`) button to grab the plugins you're interested in!

