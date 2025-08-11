---
title: "Vim on Arch - A Case Of Everyone Knows"
date: Sun Aug 10 07:23:55 PM CDT 2025
published: false
description: "I discover one of the things that 'everyone knows' about Linux"
goal: N/A
solution: N/A
tags: ["steamdeck","howto","guide","vim","linux","arch"]
---
````flare
```nerd-goal-level-8
Goal: Run Vim with clipboard support
```
```nerd-solution-level-6
Solution: Install `gvim`
```

In case you're reading this and aren't a <span class="nerd-level-8">Level 8 Nerd</span>:

```nerd-level-0
Vim is a command-line tool for editing files. It's esoteric and unintuitive, but present on nearly every non-Windows computer in the world, so I've gotten good at it.

"Clipboard" functionality is what it sounds like - by default Vim keeps its own copy/paste system and doesn't touch the host computers clipboard... but sometimes you really want to copy something from a file and paste it somewhere else or vice versa.
```
````

# Ten Thousand People

![XKCD - 10,000 People](https://imgs.xkcd.com/comics/ten_thousand.png)

(via [XKCD](https://xkcd.com/1053/))

## Vim != vim

It turns out that people who use **`vim`** on Arch Linux _usually_ don't install the `vim` package - they install `gvim`.

## Uh, What's The Difference?

In a very **_Linux_**  way - a lot and very little at the same time.

You see, `gvim` stands for "Graphical Vim." According to [Wikipedia:](https://en.wikipedia.org/wiki/Vim_(text_editor))

> ... adds menus and toolbars for commonly used commands but the full functionality is still expressed through its command line mode.

Basically, instead of running Vim from the command line, you open it like (most) modern apps you use.

## Do... You Actually Want That?

Nope, but here's the thing - Vim is **INCREDIBLY** modular. You can compile it with different flags/settings/configurations/etc. and make it super basic... And that's what the default `vim` package in Arch Linux's distribution manager `pacman` is - very minimal, with a tiny installation footprint and very high system compatibility.

So small, in fact, that it doesn't have [clipboard support](#/programming/ai/you-re-wrong).

Enter: `gvim`

## Ohhh, It's Bigger On The Inside?

I mean, barely

```bash
vim  file size: 5.0MB
gvim file size: 5.3MB
```

But the main difference (for me) is that this version is compiled with `+clipboard` functionality turned on. AND, fortunately, the way `gvim` works is that it actually installs **`vim`**, then loads THAT inside its little graphical window... So, I can run the same `vim` from command line, and get the features that way, too.

## And Everyone Knows This?

Well, now I do - and you do, too, so maybe someday everyone will, but until then, that's good enough for me!
