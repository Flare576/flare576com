---
title: "Distrobox Changes Everything For Steam Deck Devs"
date: Sun Aug 10 09:58:24 PM CDT 2025
published: true
description: "Stop installing via flatpaks and direct pacman calls!"
goal: 6
solution: 5
tags: ["linux","distrobox","steamdeck","guide","arch","vscode"]
---
````flare
```nerd-goal-level-6
Goal: Install tools and applications that don't get blasted by SteamOS Updates
```
```nerd-solution-level-5
Solution: Create a container with Distrobox, do everything from it
```
````

# Distrobox Changes Everything

I wrote about [ZSH on Steam Deck](#steamdeck/guides/zsh-on-steamos) before and mentioned [Distrobox](https://github.com/89luca89/distrobox), but I feel like I buried the lede a bit, so I'll get right to it this time.

After you've [started with Desktop Mode](#/steamdeck/guides/desktop-mode-sudo-password),  switch over.

Open a new Konsole Terminal. Enter this:

```bash
# Distrobox is already installed on your Steam Deck - this uses it to make a new Arch Linux container
distrobox create --name "inner_arch" --image archlinux:latest
echo "Initializing 'inner_arch'"

# This command runs a mini-script inside of the container we just created
# It installs core utilities, then exports the 'zsh' command to our host
distrobox enter "inner_arch" -- bash -c '
  sudo pacman -Syu --noconfirm
  # Basic tools
  sudo pacman -S --noconfirm coreutils tar less findutils diffutils grep sed gawk util-linux procps-ng base-devel git zsh
  # Wire up zsh as the entry point
  distrobox-export --bin "/usr/bin/zsh"
'
# May need to write the location that distrobox exports to to .bashrc
if ! grep -q 'export PATH="$HOME/.local/bin:$PATH"' "$HOME/.bashrc"; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
fi
# Reload your profile in case you did need the update
source $HOME/.bashrc

# Launch your new shell
zsh
```
Source: [My Dotfiles](https://github.com/Flare576/dotfiles/blob/main/setup/NIX/steamdeck.sh#L49-L63)

```flare
The `distrobox-export` call from INSIDE of the new container is the secret sauce that makes this work - it's what lets your normal Konsole session tap into the container's `zsh` shell
```

## Now What?

Now, anytime you open a new console, type `zsh` and you'll load up your isolated little container... Except it's only as _isolated_ as you want it to be. For example...

# Visual Studio Code + PlantUML + C4

I wrote about this extension [extensively](#/programming/uml), and getting it going with distrobox is dead simple.

From inside of your `zsh`, run:

```bash
# Install Code, Java, and GraphViz
sudo pacman -Sy code jre-openjdk graphviz

# Install the PlantUML extension for Code
code --install-extension jebbs.plantuml

# Export the app to your Desktop Environment
distrobox-export --app code
```

Now you'll have the Open-Source build of Visual Studio Code available via your Application Launcher WITH the PlantUML plugin. It ships with a _very_ old version of PlantUML, though, so you can update it with this:

```bash
EXTS="$HOME/.vscode-oss/extensions"
PUML="$(ls "${EXTS}" | grep "jebbs.plantuml")"
# Define the target directory for the PlantUML JAR
DOWNLOAD_DIR="${EXTS}/${PUML}/" # will have a version

# Get the latest release tag from GitHub API
LATEST_RELEASE_TAG=$(curl -s https://api.github.com/repos/plantuml/plantuml/releases/latest | grep "tag_name" | cut -d : -f 2 | tr -d \"\, | tr -d ' ' | tr -d 'v')

# Construct the download URL for the latest JAR
DOWNLOAD_URL="https://github.com/plantuml/plantuml/releases/download/v${LATEST_RELEASE_TAG}/plantuml-${LATEST_RELEASE_TAG}.jar"

# Define the filename for the downloaded JAR
OUTPUT_FILENAME="${DOWNLOAD_DIR}plantuml.jar"

echo "Downloading PlantUML version v${LATEST_RELEASE_TAG}..."
echo "From: ${DOWNLOAD_URL}"
echo "To: ${OUTPUT_FILENAME}"

# Download the JAR file using curl
curl -L -o "${OUTPUT_FILENAME}" "${DOWNLOAD_URL}"
```

```flare
For those adverse to running random Bash scripts (or if, you know, it stops working) - the extension folder is

**$HOME/.vscode-oss/extensions**

And the **jebbs.plantuml** folder will be versioned. In that folder is the old **plantuml.jar** - you just need to replace this with the latest from [PlantUML.com/download](https://plantuml.com/download).
```

## Does this actually work?

![Distro Box App](/images/thumbnail/distrobox_app.png)  
App Shows up in Application Launcher

![Code without Java](/images/thumbnail/distrobox_no_java.png)  
If you don't install Java, nothing will render

![Code with old build](images/thumbnail/distrobox_old.png)  
Once you have Java, you'll probably see old style diagrams...

![Code with old build](images/thumbnail/distrobox_old_2.png)  
And broken C4 diagrams, but after you update...

![Code with updates](images/thumbnail/distrobox_c4.png)  
Everything should work! (You need GraphViz for C4 diagrams)

# What Happens when SteamOS Updates?

That's the beauty of this - NOTHING happens. This little container is running in the USER space of your Steam Deck - SteamOS updates leave it alone (it's where your settings, downloads, documents, etc. all live).

Flatpaks are FANTASTIC for consumer apps like Spotify or Discord, but when you need a dev tool or something with dependencies, `distrobox` should be your first thought!
