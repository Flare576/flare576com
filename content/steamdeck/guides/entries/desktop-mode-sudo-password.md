---
title: "Desktop Mode + Sudo Password"
date: Sat May 31 01:16:21 PM CDT 2025
published: true
description: "Laying the groundwork for everything else"
goal: 2
solution: 1
tags: ["steamdeck","howto","guide","sudo","firsttime"]
---
````flare
```nerd-goal-level-2
Goal: Setup Desktop Mode + Sudo password
```
```nerd-solution-level-1
Solution: Switch to Desktop mode, create Sudo password
```
````

# Desktop Mode

Simply

- Press the "Steam" button on the left-hand side of your device
- Scroll down (or up) to "Power"
- Scroll down (or up) to "Switch to Desktop"
- Press "A"

Looks kinda like a PC, doesn't it? That's because it IS. Under-the-covers, SteamOS is [Arch Linux](https://archlinux.org/).

> NOTE: Everything after this point you only need to do this once, not every time you load up Desktop Mode

# sudo password

```nerd-level-0
On "sudo" - If you're used to Windows, "sudo" is a lot like the "admin mode" Windows has you use when you want to install software or configure the operating system - if you give it to a script you downloaded, it has the ability/authority to do anything to your computer, so be careful.

Any tool, script, etc. I talk about on my site, unless I throw warnings all over the page to say "DON'T USE THIS," is something I've personally installed and use, but it's always a good idea to either keep sensitive information OFF the Steam Deck, or familiarize yourself with the tool/script before executing it.
```

The safest way I've found to set your initial `sudo` password is to
1. Tap the SteamOS logo in the bottom-left (a.k.a., the "Application Launcher")
2. Tap "System"
3. Tap "Konsole"
4. Press the "X" button to launch the On-Screen Keyboard (OSK)
5. Type **`passwd`** (Yes, that's how it is spelled)
> I know, I know, entering commands is <span class="nerd-level-5">Nerd Level 5</span>, but doing it this way will save you a ton of headache, because [Resetting the Sudo Password](https://www.youtube.com/watch?v=jWFjZNxFHew) is <span class="nerd-level-9">Nerd Level 9</span>. Trust me on this one.
6. Press "A" or the "Enter" button on the OSK
7. Use the OSK to enter a password
    - It doesn't need to be crazy secure - you're probably going to be typing it in with the OSK, but it DOES allow god mode on your machine - so maybe not `password` or `1234`)
8. Use the OSK to confirm the password
9. Close the Konsole Window
10. WRITE THAT 💩 DOWN

# Final Touches

I personally changed a few things about Desktop Mode controls to make it a little easier (for me) to use. They're small things, and easy to change back if you just want to try any of them!

## Track Pads - "Mouse Region" Mode

By default, the right track pad is setup "As Mouse," which feels fine, but it can be BETTER. "Mouse Region" mode means that if you put your finger on the top-right of the track pad, the cursor moves instantly to the top-right of the screen - you're not dragging the mouse around incrementally, you're snapping it to where you want it to be. Try it!

1. Tap the "Steam" application in the bottom RIGHT (NOT the Application Launcher in the bottom-left, the Steam application in the system tray in the bottom right)
2. Tap "Settings"
3. Tap "Controller"
4. Down at the bottom is "Non-Game Controller Layouts" - tap "Edit" next to Desktop Layout
    - NOTE - Once you're in this menu, the trackpads won't work anymore, so you'll need to either use touch controls or the D-pad
5. Tap "Edit" at the top
6. Tap "Trackpads" on the left
7. Tap the dropdown next to "Right TrackPad Behavior"
8. Select "Mouse Region"
9. Tap "Add Command" next to "R Click" (the symbol means "Pressing down on the Right track pad")
10. Choose "Mouse" from the top "Tabs"
11. Choose "Left Mouse Click"
12. Tap "Back"
14. Close the Window

That's it! Try it out for a while, and if you don't like it, changing it back is super simple - literally follow the above steps but choose "Mouse" on step 8!

## "B" as Backspace

"B" defaults to "Escape," but so does the "Start" button (Or "Menu" button, the one above the right joystick), so I don't need both, and having a button for Backspace is useful! To accomplish this, Follow the instructions above, but instead of choosing "Trackpads" and "Mouse," you just choose "Buttons" and "Keyboard"!

## D-Pad

This one is tricky, but after I set it up I found it very useful. I usually only use Desktop + Handheld for browsing the web, so basic text control is a great addition.

The left-joystick and the D-Pad both send Up/Down/Left/Right, and I felt like that was a waste - So I set up the D-pad to do the following (with my mnemonic in parenthesis)

- Left: Undo ("Left" means "go back")
- Right: Redo ("Right" means "go forward")
- Down: Copy ("Down" means "Pull in")
- Up: Paste ("Up" means "Send away")

Open the Controller settings, go to D-pad, and then tap the button you want to update. To make it send `Ctrl + Z` for "Undo", you:

1. Tap the command it's sending right now and choose the "Z" Key from "Keyboard"
2. Tap the Gear icon, and choose "Add Extra Command"
3. Choose "Ctrl" from "Keyboard"

To get "Redo," you just add ANOTHER extra command and set that to "Shift" (in most apps, `Ctrl + Shift + Z` is "Redo".
