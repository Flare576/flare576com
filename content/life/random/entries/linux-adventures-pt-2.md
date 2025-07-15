---
title: "Linux Adventures, Pt. 2"
date: Mon Jul 14 07:02:09 PM CDT 2025
published: true
description: "Was working off bad assumptions - Valve optimized a LOT"
goal: N/A
solution: N/A
tags: ["linux","computers","daughter","arch","mint"]
---
(See [Linux Adventures Pt. 1](#/life/random/linux-adventures-pt-1) for the previous installment)

# Linux Adventures Pt. 2

My original theory was that choosing [Manjaro](https://manjaro.org/) would allow me to use all the knowledge I'd gained getting things working on my Steam Deck, since they were both based on Arch Linux.

Setting up [Waydroid](https://github.com/waydroid/waydroid) on SteamOS was as easy as running a script.

How did that experience translate to Manjaro?

Spoiler: <span class="spoiler">Not. Even. Slightly.</span>

# Apples and Oranges

## Video Cards

The Steam Deck is running a very bespoke [AMD APU](https://www.gamesradar.com/steam-deck-oled-kills-the-originals-aerith-processor-with-a-sephiroth-upgrade-as-valve-flexes-its-final-fantasy-7-fandom/) as opposed to a dedicated video card.

My daughter's PC has an Nvidia GTX 1070.

## Video Drivers

The Steam Deck runs a custom layer that balances RAM allocation between the CPU and GPU on that APU.

Manjaro defaulted me to using [nouveau](https://nouveau.freedesktop.org/), which aren't _technically_ compatible with Waydroid.

## Software Installers

The Steam Deck ships with Discover from KDE wired up to flatpaks.

Manjaro uses its own Pamac installer/manager.

## Network Drivers, Kernel versions, Etc.

You get it.

# But... Did You Get It To Work?

After:

- 8 hours
- Installing a new Kernel with *binder* support
- Customizing my Grub config
- Editing my **mkinitcpio.conf**
- Switching my Desktop Environment
- Installing `weston` for display server
- Forcing Software-only acceleration
- Disabling Google Play

Yes, I got Waydroid working on Arch Linux... but then I threw in the towel.

# BUT YOU DID IT!

Not really. My stubbornness DID result in the application running on the system, but it highlighted the flaw in my original assumption. I'd been using ChatGPT for troubleshooting through this entire ordeal, and at some point it had mentioned Ubuntu, So, I asked

```flare
Let's take a step back. I'm stoked that we got it to work, but... this is bullshit. The only reason I installed Arch Linux on this machine was because I was working on the assumption that since I needed to learn about it for my Steam Deck, solving problems on my daughter's machine would be easier if it was **also** Arch Linux. This entire process has shown me that's not the case.

So, you mentioned Ubuntu earlier. If I backed up her data and installed the latest Ubuntu instead of Manjaro, would that smooth out this process at all, or would I just be starting over for nothing?
```

```assistant
You're absolutely right to take a step back here. Let's cut through the noise and get you a clean, practical answer, grounded in your real goals:

## 🔄 Your Core Goal

You want your daughter to be able to:

- Play Roblox
- On a Linux laptop
- Without constant battles with obscure system issues
- And ideally, build some experience with Linux for you along the way

You've been fighting Waydroid on Manjaro for days. It launched, yes — but it's janky, there's no Play Store, installing APKs is hit-or-miss, and you're now stuck halfway between functional and frustrating.

## 💡 So Would Ubuntu Help?

Yes, Ubuntu (or _even better_: Linux Mint, which is just Ubuntu with a better desktop experience) will smooth this out. Here’s why:
```

# Linux Mint?

I asked a few clarifying questions, did a little Googling and ultimately decided to switch gears. I'd learned my lesson during Manjaro setup and got the instructions for the [TP-Link AC600 Archer T2U Plus](https://www.amazon.com/wireless-USB-WiFi-Adapter-PC/dp/B07P5PRK7J?th=1) drivers ahead of time.

After re-flashing the SD card, running the Linux Mint installer, and running an Ethernet cable, I hit the command line with

```bash
sudo apt install dkms git build-essential linux-headers-$(uname -r)
git clone https://github.com/lwfinger/rtw88
cd rtw88
sudo dkms install $PWD
sudo make install_fw
```

Restarted and the WiFi was flowing. ChatGPT gave me a little post-install checklist, so I ran:

```bash
# Update Everything
sudo apt update && sudo apt upgrade -y
# Enable Flatpak
sudo apt install flatpak -y
# Add Flathub
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
# Wire up Gnome+Flatpak
sudo apt install gnome-software-plugin-flatpak -y
# Install other basic necessities
sudo apt install gnome-disk-utility gparted vlc unzip p7zip-full -y
# My kid needs Chrome like I need air
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb
```

Then, I opened the Driver Manager, chose the Nvidia binary driver, and rebooted.

# ...What About Waydroid?

ChatGPT and I fought with Waydroid, Python dependencies, GitHub links it **THOUGHT** existed but didn't, etc. for about an hour before I realized I'd fallen into a trap.

> When all you use is a hammer, everything looks like a nail

I used the other tools in my toolbox, namely traditional web searches, and the answer was actually **super** obvious - ChatGPT wasn't aware of the latest **`Noble`** build channel - I just needed to use the default setup script:

```bash
sudo apt install curl ca-certificates -y
curl https://repo.waydro.id | sudo bash
sudo apt install waydroid weston
sudo waydroid init -f
sudo systemctl enable --now waydroid-container
```
Source: [Official Waydroid Instructions](https://docs.waydro.id/usage/install-on-desktops)

Of course, _installing_ isn't the same as _running_... And it didn't run. But this time I knew why - Linux Mint doesn't use Wayland, so I was going to need... wait, maybe this is the "Hammer" thing again...

# The Easy Button

```flare
/me searches Software Manager for "Roblox," finds "Sober" as a Flatpak, installs, runs
```

Oh. Uh. Huh. Well that was easy.

Everything I'd read said [Sober](https://sober.vinegarhq.org/) wasn't working, or was blocked, or would get you banned.

While that last one was concerning, the other two were easy enough to prove out - and it worked.

# But What About Android?

Well, remember that script I mentioned working on my Steam Deck? Turns out that part of the process is [injecting spoofed fingerprints](https://github.com/ryanrudolfoba/SteamOS-Waydroid-Installer/blob/main/functions.sh#L93) from a [static file](https://github.com/ryanrudolfoba/SteamOS-Waydroid-Installer/blob/main/extras/android_spoof.prop).

After I did that, Google Apps works... it's still using this script to load:

```bash
#!/bin/bash

# Kill any existing Weston or Waydroid sessions
pkill weston
waydroid session stop

# Give it a sec to clean up
sleep 2

# Start Weston in the background
weston &
WESTON_PID=$!

# Wait for Weston to initialize its display socket
sleep 3

# Find the Weston wayland socket, excluding .lock
WAYLAND_SOCKET=$(ls /run/user/$UID/ | grep '^wayland-[0-9]\+$' | head -n1)

# Export required environment variables
export WAYLAND_DISPLAY=$WAYLAND_SOCKET
export WAYDROID_DISPLAY_SERVER=weston

# Debug info
echo "Using WAYLAND_DISPLAY=$WAYLAND_DISPLAY"

# Start Waydroid session in the background
waydroid session start &
WAYDROID_SESSION_PID=$!

# Give session a second to start up
sleep 2

# Launch the Android full UI
waydroid show-full-ui

# Wait until the Waydroid session exits
# wait $WAYDROID_SESSION_PID
wait $WESTON_PID

# Cleanup after session ends
echo "Waydroid session ended. Cleaning up."
waydroid session stop
kill $WESTON_PID
```

... but since she can play Roblox, getting her Android emulator fully working can wait for Part 3.
