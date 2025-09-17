---
title: "Python/Pip on SteamOS"
date: Sat Jun 28 04:22:30 PM CDT 2025
published: true
description: "Easiest, cleanest, and most robust way to get Python packages"
goal: 6
solution: 7
tags: ["linux","python","pip","guide"]
---
````flare
```nerd-goal-level-6
Goal: Install and use Python packages and Applications/tools
```
```nerd-solution-level-7
Solution: Use Distrobox + `pacman` and `uv`
```
````

```flare
_EDITED 2025-08-04_: Between [discovering distrobox](#/programming/ai/you-re-wrong) and actually working on some Python projects, my [recommendations have changed](#/programming/scripting/python-preferred-practices). I've updated this post accordingly.
```

# Introduction

First of all, before you do anything, [Setup Distrobox](#/steamdeck/guides/distrobox). The bulk of this process is going to be installing new packages with `pacman`, so it's either distrobox, or disabling the read-only flag of SteamOS.

Don't do that to your future self.

# Step 1 - Stop

My "Nerd Goal" up above is misleading - it smashes "Packages" and "Applications" together, when really the process is _dramatically_ different for the two.

# Applications

Pretend you DON'T KNOW the App is written in Python - just install it:

```bash
# If you're not in your container
~/.local/bin/zsh # or just `zsh` if you added it to your path before everything else!

# Install like any other App
sudo pacman -S --noconfirm python-uv

# Or, if it's not there, via AUR / yay
yay -S opencode-bin
```

I talk about why in [Python Preferred Practices](#/programming/scripting/python-preferred-practices), the TL;DR is "Dependencies".

# Packages & Uncommon Applications

If you try to just `pip install` stuff, even with `--user`, you're gonna have a bad time:

![Python error](./images/thumbnail/python_1.png)

This is because Python has become such a core technology in every OS that mucking with the system-level install can be catastrophic.

## But I need PackageXYZ or indy_python_tool!

Two words, my friend - **`Virtual Environments`**.

### Applications - uv

```bash
# If you're not in your container
~/.local/bin/zsh # or just `zsh` if you added it to your path before everything else!

sudo pacman -S --noconfirm python-uv
uv tool install llm
```

`uv` actually spins up a local, focused folder called a **`Virtual Environment`**, then
- Installs the recommended Python version for the App
- Downloads the dependency chain of the App
- Maps the executable to your `$PATH`

Then, you just run the command you installed, and it just works™.

### Packages - ???

If you don't have your answer yet, I can only recommend you head over to [Python Preferred Practices](#/programming/scripting/python-preferred-practices) - you're officially out of "Steam Deck Weirdness" land into "Welcome to ~~hell~~ Python!"

