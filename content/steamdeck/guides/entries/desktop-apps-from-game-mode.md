---
title: "Desktop Apps from Game Mode"
date: Sun Jun  8 10:55:30 AM CDT 2025
published: true
description: "Install apps from Discover, then add Non-Steam Game"
goal: 2
solution: 1
tags: ["steamdeck","howto","guide","flatpaks","spotify"]
---
````flare
```nerd-goal-level-2
Goal: Run arbitrary apps in Game Mode
```
```nerd-solution-level-0
Solution: Install app in Desktop mode, add to Steam. Game Mode: Launch it!
```
````
# Desktop Mode

Ensure you've [started with Desktop Mode](#/steamdeck/guides/desktop-mode-sudo-password) and switch over.

By default, there's a little hand-bag icon called Discover on your Task Bar, but you can also click on the SteamOS logo (Application Launcher) in the bottom-left and type "Discover"

```nerd-level-4
"Discover" gives you access to applications that are distributed via "Flatpaks," These are applications that opperate exclusively from their own "sandbox" environments, so they can't impact the rest of your system. By-and-large, these are "Safe" apps
```

When you find an app you like ([Spotify](appstream:com.spotify.Client), anyone? Maybe a little [Discord](appstream:com.discordapp.Discord)?), install it, run it, and set it up.

```nerd-level-1
REMEMBER: Pressing X opens the On-Screen Keyboard, and pressing Start (☰) moves the keyboard to top/bottom!
```

## Game Mode

Want to access it from Game Mode?
1. Open Steam (I use the icon in the System Tray),
2. Click "+ Add a Game" in the bottom-left
3. Choose "Add a Non-Steam Game"
4. Find your app on the list.
5. Click "Add Selected Programs"
6. (OPTIONAL) Group your App
    1. Find your app in your Library
    2. Right-click (or `L2`), and choose "Add To", then your Collection

## Wait, I Can't Upload Images to Discord

Ah, yeah, that's actually a safety feature - Flatpak apps don't get access to your file system! But, you can GRANT them permissions using something called [Flatseal](#/steamdeck/guides/flatseal)
