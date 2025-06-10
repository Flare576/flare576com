---
title: "CopyRoms"
date: Sat May 31 04:14:10 PM CDT 2025
published: true
description: "I built a tool to easily acquire backup ROMs of your games"
goal: 2
solution: 2
tags: ["steamdeck","howto","guide","roms","emulation","myrient","scripts"]
---
# Disclaimer

This guide will tell you how to download ROMs. Only download ROMs for titles you own. Emulators should be used to verify/run backups of games you own. Don't pirate games.

````flare
```nerd-goal-level-2
Goal: Acquire backups of your games
```
```nerd-solution-level-2
Solution: Download and run some sripts I wrote
```
````

# When Hobbies Meet

I'm a software developer by trade, and [Scripting](#/programming/scripting) is one of the things I really enjoy.

I also have a collection of old-school games I wanted to backup, but I didn't want to get all the fancy readers, software, etc., I just wanted a backup.

So, I built [CopyRoms](https://github.com/Flare576/copyroms), a set of scripts and lists that make it easy for anyone to curate a list of their games and download backups.

# How to Use It

Before you start, you should install [EmuDeck](#/steamdeck/guides/emudeck), and get to the part where you need to copy your ROMs, then come back here. I'll wait...

Ok, great, welcome back. Now, on the Steam Deck:

There's 4 basic steps, which I'll go into detail for below, but:

1. Download it
2. Extract it
3. Update your TOP list
4. Run the script

## Download it

1. Point your browser at [github.com/Flare576/copyroms](https://github.com/Flare576/copyroms)
2. On the right under Releases, tap "V0.0.2 - Xbox 360 Adjustments" (Or whatever the latest release is)
3. Tap **copyroms_steamos.zip**
4. If you're prompted for a download location, choose wherever you told [EmuDeck](#/steamdeck/guides/emudeck) to setup your folders
5. If you're NOT prompted, you'll need to move the zip file from "Downloads" to that location

> NOTE: You should see a folder called "Emulation" in the same folder as **copyroms_steamos.zip** at this point.

## Extract it

On the Steam Deck, by default, the Left Trigger (`L2`) is "Right Click," use that to "Extract" -> "Extract Here".

## Edit Your Lists

**THIS IS IMPORTANT** - In the folder you just created (`copyroms_steamos`) is a folder called `FILTERS`, and inside of it are two sets of files:

- TOP_{System}.txt
- 1G1R_{System}.txt

You can/should open them in KATE (KATE Advanced Text Editor) by double-clicking the files. You can use right-click to copy, paste, or delete lines.

### TOP Lists

These are the games you want to download - it's pre-populated with the "Top" games for a given system (as rated by [MetaCritic](https://www.metacritic.com/browse/game/), [GameFAQs](https://gamefaqs.gamespot.com/), or other fan sites I could find) so that when YOU come in to make the list of games **YOU OWN**, you're not starting from scratch.

Don't see a game you own? I GOT YOU - take a look at the next set of files!

### 1G1R Lists

These are complete lists of all of the games from a [One Game, One ROM (1G1R)](https://www.reddit.com/r/RetroPie/comments/mtzcy6/create_your_own_1g1r_set_for_redump_and_nointro/) set. You should copy the games out of these files and paste them into the TOP list if there are games you own missing from the TOP list. Order doesn't really matter, except if you're planning on getting more games or keeping it up-to-date.

## Run the Appropriate Script

Got your TOP list all set? Great!

Go back to the main folder, find the system you want to download, Right-Click, and choose "Run in Konsole".

The script will check for the `Emulation` folder, then for the `rclone` tool it needs, and then download your ROMs! If the system is Disk-based, it'll ALSO extract the games into their own folders for your convenience.

### Wait, From Where?

A game preservation site called [Myrient](https://myrient.erista.me/). If you like this script, support them - All I did is build a little wrapper around [Rclone](https://rclone.org/), the folks behind Myrient are the real heroes here.

# Now What?

Now you head back over to [EmuDeck](#/steamdeck/guides/emudeck) and finish your installation, or, if you were just interested in backing up your games, dust off your hands and pat yourself on the back - Job well done.

# NERD DATA

I spent a lot of time on this project, and compiled some statistics while I was trying to figure out how many games for the later systems to include in the base TOP lists... The final numbers on the far-right aren't 100% accurate, as compression and modifications to the lists occurred, but I thought someone out there might find it interesting:

**SIZES ARE IN MB**

| Name                     | Release     | 1G1R ROMs | 1G1R Size  | Avg Size | TOP ROMs | TOP Size |
|--------------------------|-------------|:---------:|:----------:|:--------:|:--------:|:--------:|
| Atari 2600               | 1977-9-11   | 481       | 2          | 0.0      | 43       | 1        |
| Atari 5200               | 1982-11-1   | 65        | 1          | 0.0      | 11       | 1        |
| NES                      | 1983-7-15   | 1392      | 152        | 0.1      | 129      | 16       |
| Sega Master System       | 1985-10-20  | 336       | 44         | 0.1      | 97       | 15       |
| Atari 7800               | 1986-5-1    | 59        | 2          | 0.0      | 16       | 1        |
| Sega Genesis             | 1988-10-29  | 933       | 619        | 0.7      | 108      | 98       |
| Nintendo Game Boy        | 1989-4-21   | 1051      | 127        | 0.1      | 104      | 15       |
| Atari Lynx               | 1989-9-1    | 74        | 10         | 0.1      | 13       | 2        |
| Sega Game Gear           | 1990-10-6   | 366       | 67         | 0.2      | 97       | 19       |
| Super Nintendo           | 1990-11-21  | 1746      | 1,568      | 0.9      | 132      | 169      |
| Atari Jaguar             | 1993-11-23  | 46        | 90         | 2.0      | 17       | 36       |
| Sega Saturn              | 1994-11-22  | 1189      | 414,648    | 348.7    | 162      | 68,279   |
| Sony Playstation         | 1994-12-3   | 4577      | 1,291,083  | 282.1    | 197      | 75,000   |
| Nintendo 64              | 1996-6-23   | 390       | 4,516      | 11.6     | 113      | 1,787    |
| Nintendo Game Boy Color  | 1998-10-21  | 928       | 453        | 0.5      | 50       | 43       |
| Sega Dreamcast           | 1998-11-27  | 679       | 381,365    | 561.7    | 163      | 100,000  |
| Sony Playstation 2       | 2000-3-4    | 4403      | 6,033,218  | 1370.3   | 68       | 190,000  |
| Nintendo Game Boy Advance| 2001-3-21   | 1543      | 5,910      | 3.8      | 178      | 956      |
| Nintendo GameCube        | 2001-9-14   | 677       | 534,465    | 789.5    | 163      | 150,000  |
| XBOX                     | 2001-11-15  | 1020      | 6,576,592  | 6447.6   | 30       | 189,000  |
| Nintendo DS              | 2004-11-21  | 3655      | 113,241    | 31.0     | 247      | 12,567   |
| Sony Playstation Portable| 2004-12-12  | 1219      | 897,947    | 736.6    | 150      | 110,000  |
| Xbox 360                 | 2005-11-22  | 1346      | 9,609,278  | 7139.1   | 25       | 186,000  |
| Nintendo Wii             | 2006-11-19  | 1659      | 2,515,942  | 1516.5   | 66       | 172,002  |
| Nintendo 3DS             | 2011-2-26   | 910       | 445,108    | 489.1    | 96       | 110,000  |
| Playstation Vita         | 2011-12-17  | 1785      | 2,057,961  | 1152.9   | 100      | 155,650  |
| Nintendo Wii U           | 2012-11-18  | 504       | 4,019,044  | 7974.3   | 14       | 144,416  |
 
