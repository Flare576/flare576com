---
title: "Steam Link"
date: Tue Jul 15 11:57:40 CDT 2025
published: true
description: "Control your Steam Deck from another device"
goal: 3
solution: 1
tags: ["steamdeck","steamlink","guide","tip"]
---
# Steam Link

This might actually be a tip for **any** computer running Steam, but I've only tried it with the Steam Deck.

## OSX

Open up the App Store, search for "Steam Link", and install it.

## Windows

I can't vouch for [these steps](https://steamcommunity.com/app/353380/discussions/8/3105764348181505385/), but probably works?

### And Then

Run it and your Deck should show up. Click it.

That's literally it - now you can control your Steam Deck from your other computer, making it very easy to turn

```nerd-solution-level-4
Need an external keyboard
```

Into

```nerd-solution-level-1
Desktop mode
```

![Steam Link From Mac](./images/thumbnail/steamlink.png)

# Alternative - Rustdesk

Steam Link doesn't support clipboards, or multiple monitors/desktops, or a few other "Nerdy" things, so I went looking for alternatives.

[RustDesk](https://rustdesk.com/) is exactly what I needed:

- On the SteamDeck, you can install it from Discover via Flathub
    * It doesn't need any extra permissions
- You run it like any other app
    * The "Server" and "Client" are the same app, just run `Rustdesk`
- You can add a "Permanent" password to the SteamDeck for easy reconnection\
    ![Rustdesk](./images/thumbnail/rustdesk.png)
    * Just click the "kebab" icon, then "Security", then scroll down to "Password"
    * While you're in the settings, you can also adjust your audio input from "General"
- Click "Home" at the top of the window, grab your ID
- On OSx, you install it via `brew install --cask rustdesk`
- Enter your ID into your OSX, Windows, Android, iOS, etc. client, enter the password

And you're off to the races. There's a little pull-down menu at the top of the screen you can use to switch your displays

```flare
It's worth mentioning that this is NOT designed for gaming or multimedia out-of-the-box. I'm guessing you can get fancy with self-hosting and other options, but for my use case, this is PERFECT
```
