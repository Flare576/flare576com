---
title: "NonSteamLaunchers"
date: Sat Jun  7 11:05:12 PM CDT 2025
published: true
description: "Install Non-Steam games from Epic, GoG, and others"
goal: 3
solution: 3
tags: ["steamdeck","howto","guide","epic","gog","nonsteamlauncher"]
---
````flare
```nerd-goal-level-3
Goal: Install and play games from Epic Launcher, GoG, itch.io, etc. on your Steam Deck
```
```nerd-solution-level-3
Solution: You'll need to download and run some scripts/installers
```
````
# NonSteamLaunchers

[NonSteamLaunchers (NSL)](https://github.com/moraroy/NonSteamLaunchers-On-Steam-Deck) is an amazing little utility that installs a plethora of "Third Party" launchers, libraries, and links, either using their Windows launchers and [Proton](#/steamdeck/decky/protondb-badges) or Chrome browser. After you install a game with Launcher like Epic or GoG, NSL automatically adds it to your Steam library as a Non-Steam game, complete with art, description, etc.

I tried other options (like [Heroic Game Launcher](https://heroicgameslauncher.com/) and [Junk Store](https://www.junkstore.xyz/)), but I kept coming back to NSL for the control it offers. Your mileage may vary, so try 'em all!

# Installation (Desktop Mode)

Ensure you've [started with Desktop Mode](#/steamdeck/guides/desktop-mode-sudo-password) and switch over.

Open Firefox<sup>\*</sup>, and head to [https://tinyurl.com/nsl-install](https://tinyurl.com/nsl-install)<sup>\*\*</sup> tap "Download". This will download a file called **NonSteamLaunchers.desktop.download** to your Downloads folder.

> <sup>\*</sup> If this is your first time using Firefox, you'll be taken to the Discover app to install it - Do that!  
> <sup>\*\*</sup> The actual URL is long and not a lot of fun to type using the On-Screen Keyboard, so I created this tinyURL link. If you want, it's [https://github.com/moraroy/NonSteamLaunchers-On-Steam-Deck?tab=readme-ov-file#how-to-install-the-desktop-version-](https://github.com/moraroy/NonSteamLaunchers-On-Steam-Deck?tab=readme-ov-file#how-to-install-the-desktop-version-)

Either click the "Download" icon in the top-right of Firefox and click the folder icon, or open the Dolphin file browser and navigate to the Downloads folder.

Double-click on **NonSteamLaunchers.desktop.download**, and when it prompts you, click "Continue."

## SO MANY OPTIONS

![NSL install chooser](/images/thumbnail/nsl_1.png)

> I'm going to be totally honest, I don't actually know what a fresh install looks like anymore, so I'm going to have to assume it looks REALLY similar to what I see when I run it to update!

Tick the boxes next to the launchers and Google Chrome-based Services you're interested in, and click "Ok".

The tool will go through the process of setting up it's folders, installing the launchers and links you asked for, and (if you have [Decky](#/steamdeck/decky/introduction), add a super convenient Plugin to manage your launchers and links from INSIDE Game Mode!

After it finishes, it'll restart Steam, and you can stat your launchers from Steam. I personally created a "Launchers" group and added my launchers to it. This lets me easily find them from my Library in Game Mode!

![Add to Collection](/images/thumbnail/nsl_2.png)

## PC App Controls

By default, it's hard to navigate Launchers and other PC apps, so I recommend remapping the left Trackpad to "Directional Swipe" with Scroll Wheel Up/Down, and the right to "As Mouse":

![Control recomendation](/images/thumbnail/nsl_3.png)

### A Note on Launcher Icons

While NSL does a fantastic job of setting up your games for display in your Steam library, the launchers themselves don't all look stellar. You can fix that very easily, or customize any images and icons you want, with the [SteamGridDB](#steamdeck/decky/steamgriddb) plugin for [DeckyLoader](#steamdeck/decky/introduction)

