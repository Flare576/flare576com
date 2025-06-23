---
title: "Linux Adventures, Pt. 1"
date: Sun Jun 22 06:41:12 PM CDT 2025
published: true
description: "The beginning of our household's Linux journey"
goal: N/A
solution: N/A
tags: ["linux","computers","daughter"]
---
# Linux Adventures Pt. 1

## Let's Start With 'Why'

I already wrote about how my [daughter got my gaming PC](#steamdeck/how-i-got-my-steam-deck), but I left it off with "EVERYTHING IS GREAT!"

It wasn't _quite_ great - In the process of formatting and re-installing Windows 10 for her ('cause who wants a computer with a bunch of crap on it from the last n00b who used it?), something went sideways and all of her USB ports showed up as USB 2.0.

I know, weird problem to all-of-a-sudden happen when Windows 10 is nearing its end-of-life, huh?

So, I putzed with it for a few nights, trying to find the right drivers, or re-install the motherboard tools, or whatever. Finally I gave up and decided to check to see if I could just bite the bullet and upgrade to Windows 11. I brought up the Windows Update page and read the requirements:

- 64bit processor
    * Pfft, EZ, it's not 1995
- 2-core processor
    * Bruh, this thing's got SIX cores - that's, like, almost TRIPLE
- 4GB of RAM
    * Like, per module? Who only has 4GB of RAM? No worries!
- 64GB of Storage
    * Ok, this rig only has a 512GB SSD, but it's enough
- DirectX 12 + WDDM Compatible Video Card 
    * Uh... I'm _pretty_ sure I'm OK... :: Googles GeForce GTX 1070:: Yup!

Phew, ok - Windows 11 ORDERED!

## Didn't You Say Linux?

Yeah, this is the part where I get angry. I get the key, download the ISO from Micro$oft, get a boot USB rigged up, and start the process... only to get the middle-finger because my CPU doesn't have TPM 2.0, a new "Security Module" that my computer (apparently) just can't be secure without.

Except that's total bullshit - Micro$oft, Norton, McAfee, etc. have been building houses with 200 back doors for **DECADES** and then telling home owners that they absolutely need TOP TIER security to protect those back doors.

How about you build a house without 200 back doors?

# Ohhh, So Now It's Linux Time?

Yeah, NOW it's Linux time. After a little speed bump<sup>\*</sup>, I got her up-and-running with an Arch Linux distro called [Manjaro](https://manjaro.org/).

```flare
<sup>\*</sup>I backed up her data to a local 3TB RAID-0 drive that I left in it when I gave to her without realizing that

1. It's NTFS (a Windows format)
2. The motherboard's RAID software isn't Linux-compatible

So, I had to RE-install Windows 10, reinstall all the drivers and motherboard utilities and whatever, THEN copy the files somewhere we could actually recover them from on Linux (I used the [Crucial X10 Pro 4TB SSD](#steamdeck/peripherals/crucial-x10-pro-4tb-ssd)).
```

Well, eventually. When I first installed the OS, it didn't have any drivers for the [TP-Link AC600 Archer T2U Plus](https://www.amazon.com/wireless-USB-WiFi-Adapter-PC/dp/B07P5PRK7J?th=1) wireless antenna I got her so I didn't have to run Ethernet to her room. Since you need the internet to install the wireless drivers, I had to haul the PC over to our router, hard-wire it to the network, and then

```bash
# Install Essential Build Tools
sudo pacman -S base-devel

# Install yay - you're going to want it eventually for other stuff
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si

# Use yay to install drivers
yay -S rtl88xxau-aircrack-dkms-git

# Install Linux headers
uname -r # You'll see MM.mm.pp - like 6.11.09.
pamac install linuxMMmm-headers # so, linux611-headers
```

Then restart the machine.

> As an aside - Google's Gemini AI was equal amounts helpful (it's what suggested installing the headers) and unhelpful (it referred to the driver as `airtrack` instead of `aircrack` and I wasted 20 minutes trying to figure out why it didn't work the second time), so... par for the course.

## Why Manjaro? Why Arch?

Because Arch Linux is what I've had to learn over the last 6 months to use [SteamOS](https://store.steampowered.com/steamos) on the Steam Deck. I figured whatever problems she runs into are problems I'll either have already seen, or problems I'll EVENTUALLY see...

Except I'm second-guessing myself a LOT right now. Arch is NOT known to be the most user-friendly distro, but I'm a Linux n00b, so I don't actually know if that matters...

# End of 10

... And the thing is, I'm not alone - [End of 10](https://endof10.org/) is an initiative to help people with Windows 10 that aren't "Eligible" for Windows 11 move to Linux instead... But, reading through their site, instructions, and marketing material, I think they're going about it wrong.

## YOU DARE TRASH TALK THE 🐧?!

Yeah, here's the problem with Linux - when someone asks "What should I get to replace Windows 10," the answer is "IT DEPENDS! SPEND A FEW HOURS GOOGLE SEARCHING DISTROS, COMPARISONS, FORUMS, GITHUB..."

My Grandma does not give a 💩 about the nuanced differences between Arch, Debian, SUSE... She just wants to watch her DVDs, ❤️ and 👍 things on FaceSpace, and not have to worry about scammers, phishers, and pop-ups (ok, that last part is what *I* worry about).

[End of 10](https://endof10.org/) should be TELLING people - Back up your data and install **THIS THING** - whatever it is. Be opinionated! This isn't a recruitment drive of devs - it's helping people who are about to buy a new computer AGAIN when the hardware inside their current one is _probably_ just fine!

## Should 👵 Install Manjaro?

God no.

At least, I don't think so?

I'm guessing that a lot of peripherals (like, wireless antennas) will need their drivers installed in Manjaro. Would Ubuntu? Would Mint? I have no idea! I'VE ONLY BEEN USING LINUX FOR 6 MONTHS. I should be able to pull up a website like [End of 10](https://endof10.org/) and see a **recommendation**.

## What About 👧 ?

Both of my kids are smarter than me (don't tell them that, though, I've still got 'em fooled and I need it to last as long as it can), so I'm thinking that if I can figure out how to make Linux work for me, my daughter will be fine.

I installed [Steam](https://store.steampowered.com/) on her machine with SteamPlay + [Proton](#steamdeck/guides/desktop-mode-sudo-password), as well as [Prism Launcher](https://prismlauncher.org/) for Minecraft.

She wants to do some art, so I showed her how to get [GIMP](https://www.gimp.org/) as a [Flatpak](https://flatpak.org/) via the Add/Remove Software tool (which is `pamac`, apparently? I thought it'd be [Discover](https://apps.kde.org/discover/)) and also installed Chrome 'cause she's hard-wired to it.

### Roadblocks

She really enjoyed using [Bluestacks](https://www.bluestacks.com/) on Windows 10 to play Android games, but I haven't figured out how to get her setup with an emulator on Manjaro yet... I think I need to get [Waydroid](https://github.com/waydroid/waydroid) setup (like I [on the Steam Deck](#steamdeck/guides/waydroid)), but it needs [Wayland](https://wayland.freedesktop.org/), but apparently Wayland and Nvidia don't play nice? I think the next time I dig in, I'll start [here](https://linuxiac.com/nvidia-with-wayland-on-arch-setup-guide/).

Figuring that out will probably start Part 2.
