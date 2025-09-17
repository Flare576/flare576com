---
title: "Python Preferred Practices"
date: Mon Sep  1 10:12:49 PM CDT 2025
published: true
description: "After spinning up on a Python project or two for the first time in almost a decade, I have thoughts."
goal: N/A
solution: N/A
tags: ["programming","python","pip","venv","pipenv", "uv"]
---
```flare
Warning: If you're on a project with opinions on how these things are done, do it that way. This post is based on my observations and research, but it doesn't mean anything if you can't run or write your app!
```

# Introduction

[Python](https://www.python.org/) was first introduced in 1991, and Python 3.0 (the latest [Major](https://semver.org/#summary) release) in 2008. Over the 17 years since Python 3.0 was released, there have been [Minor](https://semver.org/#summary) releases, with the latest being 3.13.

For a language with over 30 years of history, there's an unsurprising amount of options (and opinions) for setting up projects.

# First: "Applications" vs. "Packages"

For the most part, if you're interested in a application/tool that happens to be written in Python, you'll probably want to install it like you would any other tool.

If it's not in the "Main" source of apps (`brew` or `pacman`), or in the "Secondary" source (`brew taps` or `AUR/yay`), you can "Install" it with `uv`:

```bash
# OSx - Mainline Apps
brew install llm
### Secondary Sources
brew install flare576/scripts/vroom
### Tertiary Python-specific
brew install uv && uv tool install llm

# Arch Linux / SteamOS*
sudo pacman -S code
### Secondary Sources
yay -S opencode-bin
### Tertiary Python-specific
sudo pacman -S python-uv && uv tool install llm

# Windows
凸 (｀0´)凸
¯\_(ツ)_/¯
&lt;(^.^&lt;)  (>^.^)>  &lt;(^.^)>
```

```flare
\* - For all of the SteamOS pieces, don't do those without first standing up [distrobox](#steamdeck/guides/distrobox)
```

## This Seems Complex

We haven't even gotten to the hard part yet, but maybe a quick explanation on modern software development is in order:

```flare
Anytime someone goes through the work of making a new tool, they start by pulling in components that already do some part of what they want.

These are called "Dependencies," and they're both the best part of software development and the worst. They're great because you don't need to rewrite "read an image from the hard drive" process...

...but as soon as you pull in a dependency, you get THAT package's dependencies... and those ones, and all the way down ("dependency chain").

You can also get "locked" to a specific version of that dependency - If ImageReadingPackage releases a 3.0 version, it might break your app that uses version 2.0.

To avoid YOU, the end-user, from having to deal with this madness, app developers frequently package all of these things together and ship them as an "Application"
```

That's (basically) what you're getting when you do one of the commands above, or download a program and install it.

## What About uv?

Great question - that tool doesn't _technically_ install an "Application" in the same way as the others. What it actually does is create a **`Virtual Environment`**, which I'm going to talk about in a second. From your perspective, though, it DOES pull all of the dependencies, including Python version, into one place for the "Application."

Of all the ways I looked at to accomplish this, `uv` is the one I'd recommend, because

- It's faster than alternatives
- It solves multiple problems, so if you get into Python, it'll be what you need for a while
- It lets you "Preview" tools with `uvx` (See [Official Docs](https://docs.astral.sh/uv/guides/tools/#running-tools))
- It allows you to manage "global" Python versions if you need that

But, if your curious...

# Virtual Environments
### Or "What If You ARE A Developer?"

I'm so sorry.

Seriously, though - answering "What is a **`Virtual Environment`** is _vastly_ easier than any question starting with "How":

```flare
A **`Virtual Environment`** is simply a folder or other mechanism to ISSOLATE a:

- Particular version of Python and...
- Particular set of packages...
- At a Particular version
```

The problem with the "How" is that there are just so many ways to manage **`Virtual Environments`**, Python or otherwise:

```bash
python -m venv
uv
pipenv
venv
pyenv
virtualenv
asdf
distrobox
...
```
And, depending on when your project was started, it might be using any of them, or a different one, or MULTIPLE of them...

## Starting Fresh

If you can swing it, use `uv`. [Here's a 27min video](https://youtu.be/AMdG7IjgSPM) by [Corey Schafer](https://coreyms.com) that shows additional reasons why if my bullet points above weren't enough.

## Pretty Diagram

I had an entirely different article written, then I discovered `uv` and it made everything so ridiculously easy that most of what I wrote wasn't necessary anymore.

But I did draw this, which might help "Visual Learners" understand **`Virtual Environments`**.

![Python System Version](/images/thumbnail/python_venv_2.png)
