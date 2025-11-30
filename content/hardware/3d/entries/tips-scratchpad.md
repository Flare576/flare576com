---
title: "Tips Scratchpad"
date: Tue Nov 18 07:28:27 AM CST 2025
published: draft
description: "My ongoing notes on messing up fewer 3D prints"
goal: N/A
solution: N/A
tags: ["hardware","printers","plastic","3d"]
---
# Perpetual Draft

```flare
I've been updating this random splattering of notes as I wander through the wilderness of 3D printing. I'll grab stuff off of it and spin up separate posts, but you might find something useful in the ramblings
```

# Spool Storage

## PLA / PLA+

PLA and PLA+ don't _need_ to be stored in a way that controls their exposure to humidity... But when it's this cheap and easy, why not?

[Ziplock Bag spool storage](https://www.instructables.com/How-to-Store-3D-Printing-Filament/)

## PETG, TPU, ABS, ...

Most other filaments will need some sort of "Dry box" to store them, and some even need to be printed _from_ a drybox to limit their exposure while printing.

And most of them should be dried before you even use them.

If you can afford a separate dryer, I recommend the [PolyDryer](https://a.co/d/iPz6XVn) (Amazon link, but not affiliate) solution. It lets you use one dryer across multiple containers.

If you want to save some cash, you can also use your print bed as a heat source, put your filament on it, and put a cardboard box (with a few holes to let out moisture) over your it.

After a few hours drying, you're still going to want something to print out of... So print it from a cereal box!

[Dry box inspiration](https://www.instructables.com/3D-Printer-Filament-Dry-Box/)

[Screwless Filament Feeder](https://www.thingiverse.com/thing:6217386)

[Amazon Cereal Boxes](https://www.amazon.com/dp/B0BHVT9PV1)

[Spool Holder](https://www.thingiverse.com/thing:4811545)

> Note: print a test one, you might need to resize/transform it in your slicer


# Quick Trays

[Bento3d.design](https://bento3d.design) makes it easy to design boxes with dividers.
- Remember: the outer walls of the tray are 2mm + wall width higher than the inner walls
- The "bottom" of the tray is 2+wall width
- Don't do "Stack" - you'll need to print with supports to allow the "rim" in the base that it causes

# Smoothing Prints

## Sanding

1. Sand with course grit (60-80) to rough-up surface
2. Apply [primer/filler](https://a.co/d/cgXNyH1)
3. Let dry
4. Sand with medium grit (100-320) until you see your plastic again

The plastic you see is your layer lines, the remaining primer is filling the gaps!

It's a pain in the ass, but it's the most likely to succeed and not loose details.

## Acetone and ABS

Exposing [ABS to acetone vapors will break it down](https://www.youtube.com/watch?v=0PnX-zLpX1E). You can use this to your advantage by locking ABS in a container with acetone (and optionally heating it) for a duration, then removing it and allowing it to "Dry."

You'll lose details, and potentially expose yourself to even _more_ chemicals (printing [ABS produces VOC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9229569/)), but your layer lines will be the first to be destroyed due to their surface area.

## Fastest, Easiest Way To Smooth Prints

Just [Spray & Pray](https://www.instructables.com/Easy-Way-to-Smooth-PLA-No-Sanding-No-Chemicals/) - Plastic paint + Poly Satin spray + fan

## Things That Did Not Work

## Ethyl Acetate on PLA+

I tried soaking small pieces to form a "paste" that I could apply to other prints, and all I got was colored Highly Flammable liquid.

I tried rubbing a PLA+ print with a microfiber cloth and Ethyl Acetate. It was great at discoloring the plastic and making a mess, not at smoothing or helping the print.

# Filament Tips

This will be the first set of tips that get split into a new post, but for now:

# # Most Common Print Problems - Filament

1. Dirty Plate
2. Moisture
    - Filament
    - Chamber/Room/House
3. Tension
4. Temperature
    - Nozzle
    - Bed
    - Chamber/Ambient
5. Bed Mesh/Level/Z-stop

# Gridfinity

Gridfinity models are typically broken up in to 3 dimensions:

- Length: An integer showing how many multiples of 42mm the bin/plate is along the X plane
- Width: An integer showing how many multiples of 42mm the bin/plate is alone the Y plane
- Height: An integer showing how many multiples of **`7mm`** the bin/plate is tall

This means that a "standard" cubed bin is a 1x1x6 bin.

```flare
Once you get used to it, it makes total sense because almost every base plate and bin needs to be at least 42mmx42mm, but a lot of times you can make _short_ bins; a goodly number of tools are long or wide but thin enough to hold in your hand so can use `3u` height, like - 1u\*1u\*3u or 42mm\*42mm\*21mm
```

But that's the _outer dimensions_. The **usable space** of a bin is highly dependent on what sort of bin you're using, but the standard/basic bin is roughly:

## Useful storage based on Unit

| Unit | L/W (+42mm) | Height (Use) (+7mm) | Height (Actual) (+7mm) |
|:----:|-------------|---------------------|------------------------|
| 1    | 41mm        | 0.8mm               | 11mm                   |
| 2    | 82mm        | 7.8mm               | 18mm                   |
| 3    | 123mm       | 14.8mm              | 25mm                   |
| 4    | 164mm       | 21.8mm              | 32mm                   |
| 5    | 205mm       | 28.8mm              | 39mm                   |
| 6    | 246mm       | 35.8mm              | 46mm                   |
| 7    | 287mm       | 42.8mm              | 53mm                   |
| 8    | 328mm       | 49.8mm              | 60mm                   |
| 9    | 369mm       | 56.8mm              | 67mm                   |
| 10   | 410mm       | 63.8mm              | 74mm                   |
| 11   | 451mm       | 70.8mm              | 81mm                   |
| 12   | 492mm       | 77.8mm              | 88mm                   |
| 13   | 533mm       | 84.8mm              | 95mm                   |
| 14   | 574mm       | 91.8mm              | 102mm                  |
| 15   | 615mm       | 98.8mm              | 109mm                  |
| 16   | 656mm       | 105.8mm             | 116mm                  |
| 17   | 697mm       | 112.8mm             | 123mm                  |
| 18   | 738mm       | 119.8mm             | 130mm                  |
| 19   | 779mm       | 126.8mm             | 137mm                  |
| 20   | 820mm       | 133.8mm             | 144mm                  |
| 21   | 861mm       | 140.8mm             | 151mm                  |
| 22   | 902mm       | 147.8mm             | 158mm                  |
| 23   | 943mm       | 154.8mm             | 165mm                  |

# Random Tips

- If you have to choose between more walls or more infill, choose walls
    * But never set it to 0 infill - you'll have overhang issues on most prints
    * 5% w/ Lightning infill will be the closes to 0 in most cases
- Be aware of your printer's limitations
    * If your hot-end has PTFE, do NOT print over 240°C
        + Most PETG requires over 240°C
        + Some Ender3's have PTFE in their hot ends
    * Use OrcaSlicer's calibration tests for your favorite filament
        + Write those settings down in case your printer/filament/project settings get nuked
- If you have to cut your model into multiple pieces:
    * Use Dowels on the cut
    * Use Triangle dowels
    * Use thick (>5mm) and long (>10mm) dowels
    * Use 3-4 dowels
    * Use a depth tolerance of 0.3mm or 0.4mm (to account for wall layers)
    * Use a width tolerance of at least 0.3mm, more if your dowels are > 10mm
    * Print your dowels laying down - the layers need to run against the stress
- If your printer seems to go off the print bed in some direction while printing, use the printer settings editor and adjust your "Printable Area." Positive values offset toward the front (and left) of the printer, negative values toward the back (and right)
