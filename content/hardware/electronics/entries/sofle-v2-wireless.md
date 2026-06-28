---
title: "Sofle V2 Wireless"
date: Sun Jun 21 08:58:25 AM CDT 2026
published: true
description: "I build my next keyboard! "
goal: N/A
solution: N/A
tags: ["solder","sofle","electronics","sourcing"]
---
# History

Back in 2021, I built my [first ortholinear keyboard](#hardware/electronics/sofle-v2-classic).

Five years later, I'm still using the same keyboard! It's amazing!

![Wired Sofle](/images/thumbnail/sofle_w-before.jpg)

...but I think it's time for an upgrade. I'd really like to ditch the wires and go Bluetooth wireless.

For that, I needed to pivot on some of the hardware.

# Major Changes

## ProMicro -> nice!Nano

The ProMicro from the original Sofle doesn't support Bluetooth, so I needed to move to a micro controller that does. The nice!Nano is the community favorite right now, and it's pretty nice!

## OLED -> nice!view

Additionally, since I'm moving to the Nice ecosystem, the display should also move to a low-power option.

## QMK -> ZMK

Allegedly, you can get QMK working on a nice!Nano, but I was able to get all of my key mappings working on ZMK, so I didn't have a lot of reason to try it.

But I did leave Luna and my logo scroll behind... for now.

Sisyphus and I have plans. Watch this space ;)

## Kit -> Custom

For my Sofle V2, I ordered a kit that came with the board, diodes, sockets, etc., but this time I sourced it all myself so that I can make a few extra to sell, in an attempt to pay for my new keyboard. We'll see how it plays out.

## Acrylic -> 3D Printed

Since I'm not ordering a kit, I don't get a set of acrylic switch plates or bottom plates.

But my awesome brother gave me a pair of hand-me-down 3D printers, so printed my own!

The model I used is [By mauC](https://www.thingiverse.com/thing:5167225), and the trick I learned is to install it _upside down_ - MX switches, at least the ones I'm using, need the 1.5mm lip on the TOP of the plate, so flipping it over gave me a gorgeous finish AND a tight snapping fit.

I ended up not finding a bottom case I liked, so I remixed the baseline plate AND a number of "Case" style bottoms to both support the PCB **AND** keep my battery from sliding around. You can find both [on Thingiverse](https://www.thingiverse.com/thing:7375852).

## Battery

Wireless means you need a battery, and there's basically two places you can put a battery for a Sofle:

- Under the micro controller (If there's room)
- Under the controller, in the case (If you get a case with a spot for it)

> I learned during this process that batteries are named to tell you how big they are:
> 301230 = 3.0mm x 12mm x 30mm (Thickness x Width x Length)

People who aim for low-profile builds generally go for a [301230](https://typeractive.xyz/products/lithium-battery-110mah) (110mAh), but because I generally socket my micro controllers, I can fit a [601230](https://www.amazon.com/dp/B0GDY6DDZK) (200mAh).

... Or I can stick a [503450](https://www.amazon.com/dp/B09DPPX5FD) (950mAh) under the board.

It turns out that the Primary board (the one that syncs to the computer) works way harder than the periphery board, so I'm trying out using a 503450  on the main board and a 601230 on the other... I think if I build another one or sell them, I'm just going to put a 503450 in both sides - there's plenty of room in the case I'm using.

If I decide to make a Choc low-profile, I'll look at the smaller versions.

Speaking of Choc - There are some things I'm not changing!

# Not Changing

## Cherry MX Switches

I tried going down the Choc route, then I looked at key cap options.

How do people live like that? There's, like, three choices for caps. I pivoted back to Cherry MX, and I plan to use the same weird Yellow/Black/Silver layout as before for the actual switches.

## No RGB

I don't _really_ like flashing/blinking stuff on my keyboard, and having 60+ extra things to power off of a battery didn't seem like a great idea.

## Key Map

I still love my layers, mouse, ESDF, etc., so check the [previous post](#hardware/electronics/sofle-v2-classic) to see them!

![Wireless Sofle](/images/thumbnail/sofle_w-new.jpg)

# Lessons Learned This Time Around

## Wire-Soldering Alternative

As part of learning to 3d print, I learned that sometimes you get strings of plastic in your prints.

One technique of getting rid of them is hitting the part with a heat gun for a few seconds. The main part doesn't (normally) deform or melt, but the thin strings curl and ball up, making it easier to remove them.

All of the heat guns I found were big and bulky, so I asked my brother, an electrical engineer, if he had a "heat gun" he recommended.

He pointed me at the [LRT 858D](https://www.amazon.com/dp/B08GC3HXCM), a hot-air soldering rework station, which can reach 450°C, which is absolute overkill for zapping strands of plastic on a 3d model.

So, obviously, that's what I bought!

It works great for cleaning up prints, but it ALSO make soldering diodes way more consistent! If you can afford a new tool for your soldering hobby, I highly recommend a hot air station.

## Wireless is Not Magic

And, so far, I've found it's not great for gaming. I experience a lot of dropped inputs - including times where I press `Forward`, it doesn't register, then I release and press it again, and then **both** send and I sprint to my death.

ZMK allows you to plug in the keyboard via the nice!Nano's USB-C port, so while I'm gaming I go wired mode and everything works great, but take that under advisement.
