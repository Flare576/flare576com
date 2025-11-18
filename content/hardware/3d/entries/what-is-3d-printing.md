---
title: "What is 3D Printing?"
date: Thu Oct 23 11:41:27 AM CDT 2025
published: true
description: "I figure someone out there might not know... Maybe?"
goal: N/A
solution: N/A
tags: ["hardware","printers","plastic","3d","guides"]
---
```flare
I know the Venn diagram of people who might read my content and people who don't know what 3D printing is _probably_ just two separate circles, but ¯\\\_(ツ)_/¯
```

# Start Flat...

Chances are that, if you're reading this, you've interacted with a printed piece of paper, but have you thought about how that paper got its markings?

If it was at an office, it may have been printed with a [Laser printer](https://en.wikipedia.org/wiki/Laser_printing) using toner.

If it was a newspaper or magazine, it might have been printed with a [Printing press](https://en.wikipedia.org/wiki/Printing_press), possibly a [rotary printing press](https://en.wikipedia.org/wiki/Rotary_printing_press), using CMYK ink.

If it was a shipping label, it could have been printed with a [Thermal printer](https://en.wikipedia.org/wiki/Thermal_printing) with no ink at all.

If you printed it yourself, you likely used an [Inkjet printer](https://en.wikipedia.org/wiki/Inkjet_printing) with $CrazyExpensiveCartridges.

But, we also "print" on fabrics, metals, or even [ourselves](https://en.wikipedia.org/wiki/Tattoo). We've developed a lot of ways to take an image or text from the digital world (or straight from our imagination) and bring it into the physical world with ink, toner, enamel, dye, and other materials.

# ...Then Add Depth

Likewise, we've also developed a number of ways to bring those ideas into _three_ dimensions. Some of them are accessible to the average person (like Inkjet printers), while others (like a printing press) are more... Industrial.

For example, most people won't have their own [Concrete printing](https://en.wikipedia.org/wiki/3D_concrete_printing) machine.

```flare
Yeah, they literally "print" buildings now.
```

For most of us, though, "Consumer 3D printing" generally refers to two primary technologies: FDM and SLA printing.

## Fused Deposition Modeling (FDM)

![Ender 3, one of the most widely used FDM printers](https://m.media-amazon.com/images/I/61L4aoIqYOL._AC_UF894,1000_QL80_.jpg)

Also called [Fused Filament Fabrication](https://en.wikipedia.org/wiki/Fused_filament_fabrication#Fused_deposition_modeling), this process is very similar to an Inkjet printer in that there is/are:

1. A print surface (paper vs. "print bed")
2. A print head filled with a print medium (ink vs plastic)
3. Something to move the head around on the print surface...
4. ...Or something to move the print surface under the head
5. ...Or both!

As the print head is moved across the print surface, the print medium is applied. The key difference for an FDM printer is that after the first layer is done the distance between the print surface and the print head is adjusted to be ever-so-slightly larger than previously, and another layer of print medium is applied to the first.

This is repeated until all of the "Layers" are stacked atop one another, creating your object.

## Stereolithography (SLA)

![Elegoo Mars 5 Ultra, an example of an SLA printer](https://www.polyfab3d.com/10027-large_default/elegoo-mars-5-ultra.jpg)

Also called [Resin printing](https://en.wikipedia.org/wiki/Stereolithography), this type of printer is more like how movies use a series of static images to simulate motion than any traditional printing process.

Essentially,

1. You fill the print area with a light-sensitive liquid plastic called resin
2. A "print plate" is lowered into the resin slowly, squishing all but a very thin layer of the resin out from underneath it. This traps a layer between it and a very powerful light source
3. The light source displays an image of one layer of your object, then turns off
    - This solidifies _some_ of the resin directly in front of the light source, leaving the rest of the print area liquid
4. The printing plate pulls back slightly and adjusts to allow resin to re-flow between it and the light source

Steps 3 and 4 repeat until every layer is displayed and, as a result, captured in solidified resin.

# That's It?

No, no; just like Laser printers work differently than Inkjets, there are some 3D printers that use lasers to solidify materials into a shape - such as metal [for rockets](https://en.wikipedia.org/wiki/Relativity_Space) - and one could argue that [CNC](https://en.wikipedia.org/wiki/Computer_numerical_control) machines are _subtractive_ 3D printers...

## No, I Mean, That Sounds Really Easy

Ah, the _process_. Well, the devil is in the details.

Consider this: when you "Print" a document, what's all actually happening?

Somehow, the image or text you want to print was written to a file on a computer - either you created it, generated it, downloaded it, etc. - in a format (`.txt`, `.doc`, `.png`, etc.) and encoding (`utf8`, `ascii`, `(╯°□°）╯︵ ┻━┻`) that you need. Then, you need to have installed the printer's drivers, configuration, etc. so that your computer knows how to talk to the device.

THEN you need to open your file with the right application, set its margins, page layout...

```flare
There's a lot of 💩 you do to print your [motivational poster](https://m.media-amazon.com/images/I/61soF9k7z6L.jpg) that you don't really think about anymore, is what I'm saying.
```

### And In The 3D World...

Everything is ~~harder~~ different. The formats (`.stl`, `.obj`, `.step`, etc.) applications ([FreeCAD](https://www.freecad.org/), [Blender](https://www.blender.org/), [OrcaSlicer](https://www.orcaslicer.com/)), units-of-measurement (blessedly, 1/2" margins are, largely, replaced by 220mm plate sizes, so you don't need to figure out 7/16" of 3/4" offsets)...

```flare
It's a learning curve, but so is/was coaxing your computer to find your new Hewlett Brother Epson Canon 9000 (IT'S RIGHT ON THE DESK!!)
```

...But you still run out of "ink" at the worst times, so some things never change!
