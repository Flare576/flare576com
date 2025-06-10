---
title: "Waydroid"
date: Sun Jun  8 01:30:15 PM CDT 2025
published: true
description: "Install an Android emulator and add shortcuts"
goal: 4
solution: 4
tags: ["steamdeck","howto","guide","waydroid","roblox"]
---
````flare
```nerd-goal-level-4
Goal: Play Roblox (and any other Android game!)
```
```nerd-solution-level-4
Solution: Install and configure Waydroid, the Android emulator for Linux/SteamOS. You'll need a Google Play account.
```
````
# WayDroid Installer Script for SteamOS

All credit goes to [ryanrudolf from the Philippines](https://github.com/ryanrudolfoba) and the folks that work on [WayDroid](https://github.com/waydroid/waydroid).

If you prefer a video guide, the dev himself [10 Minute Steam Deck Gamer](https://www.youtube.com/watch?v=06T-h-jPVx8) has you covered.

# Installation (Desktop Mode)

Ensure you've [started with Desktop Mode](#/steamdeck/guides/desktop-mode-sudo-password) and switch over.

## Git, Branches, and Cloning - Oh My!

There's basically two steps to this process:

1. Clone the Git Repo
    1. Click the SteamOS logo in the bottom left (the "Application Launcher"
    2. Type or find "Konsole"
    3. Enter:  
        **`git clone https://github.com/ryanrudolfoba/SteamOS-Waydroid-Installer`**
2. Run the script<sup>\*</sup>
    1. Type **`cd SteamOS-Waydroid-Installer`**
    2. Type **`chmod a+x steamos-waydroid-installer.sh`**
    3. Type **`./steamos-waydroid-installer.sh`**
        - If you get an error about your kernal version, you may need to type **`git checkout testing`**
    4. Provide the **`sudo`** password<sup>\*\*</sup>
    5. Select "A13_GAPPS" for Android 13 with Google Play Store
    6. Click "OK"
    7. Wait while the script literally downloads Android for you!
    8. PRO-TIP: When you're asked "Do you Want to Return to Gaming Mode", say "No"

> <sup>\*</sup>You can hit `Tab` (or `Select`) after the first few letters of a file to let Konsole auto-complete!  
> <sup>\*\*</sup>**`sudo`** is required since this is adding/changing files in the read-only areas of your Steam Deck

### Installation Pro-Tip

Before you go back to Game Mode, you may want to make some quick adjustments. Open Steam (I use the icon in the System Tray), then open your Library

1. Find Android_Waydroid_Cage.sh, and Left-Click (or `L1` if you're doing all this without a keyboard/mouse, you mad lad)
    1. Move to Collection
        1. Click the Gear (⚙️) icon on the right
        2. Choose "Add To" then "Launchers" (or whatever you called your collection for these sorts of things)
    2. Update Name
        1. Click the Gear (⚙️) icon (again) on the right
        2. Choose "Properties"
        3. Change the name to "Waydroid" (It will make it easier for [SteamGridDB](#steamdeck/decky/steamgriddb) to add images)
        4. Close the "Waydroid" window
    3. Update Controls
        1. Click the Game Pad
        2. Tap "Edit Layout"
        3. Tap "Action Sets" at the bottom
        4. Tap the Gear (⚙️) icon next to Default
        5. Tap "Add Always-On Command"
        6. Tap "Add Command" next to "Always On Command"
        7. Go to "System" at the top
        8. Tap "Touchscreen Native Support"
        9. Tap "Back" 2x
2. Find "steamos-nested-desktop", and Left-Click (or `L1`)
    1. Move to Collection
        1. Click the Gear (⚙️) icon on the right
        2. Choose "Add To" then "Launchers" (or whatever you called your collection for these sorts of things)
    2. Update Name
        1. Click the Gear (⚙️) icon on the right
        2. Choose "Properties"
        3. Change the name to "Nested Desktop"
        4. Close the "Nested Desktop" window
    3. Update Controls
        1. Click the Game Pad
        2. Click the "Current Button Layout" Name  
        ![Nested Desktop Controls](/images/thumbnail/waydroid_nested.png)
        3. Click "Templates"
        4. Select "Web Browser" (There's probably a better layout, but you're only going to be using this briefly, so it just needs to work. If you know a better one, let me know on [Bluesky](https://bsky.app/profile/flare576.com))
        5. Tap "Back" 2x

NOW return to Game Mode and launch Waydroid!

# Waydroid / Android

Once it launches, open the Play Store and login. That's it! All the hard work was done for you, and you should have a performant little "Phone!"

> The dev recommends opening your settings and cranking the volume to max so that your Steam Deck's audio controls can use the full volume range.

## Directly Launch apps

Wouldn't it be cool if you could install a game or app in Waydroid, and then add a shortcut right to it from your Steam Deck's Game Mode?

```nerd-level-0
Spoiler - you can totally do that
```

And you don't even need Desktop Mode to add the shortcut!

1. Launch "Nested Desktop"
2. Double-click on the desktop shortcut for "Waydroid-Toolbox"
3. Click "ADD_APPS"
4. Click "OK"
5. Select the apps you want to add shortcuts for
6. Click OK
7. Use the STEAM menu to close "Nested Desktop"

You now have the game directly accessible from your Library!

## Fixing the Icon, Image, Banner, Etc.

![Final Waydroid Library](/images/thumbnail/waydroid_shortcuts.png)

I **highly** recommend [SteamGridDB](#steamdeck/decky/steamgriddb) (a [DeckyLoader](#steamdeck/decky/introduction) plugin) for fixing or adding flair to your library!
