---
title: "Python/Pip on SteamOS"
date: Sat Jun 28 04:22:30 PM CDT 2025
published: true
description: "Easiest, cleanest, and most robust way to get Python packages"
goal: 6
solution: 7
tags: ["linux","python","pip","guide"]
---
````flare
```nerd-goal-level-6
Goal: Install and use Python packages
```
```nerd-solution-level-7
Solution: Create and activate a python virtual environment
```
````

```flare
Heads up - this is one of those things where I highly recommend using [ZSH on SteamOS](#steamdeck/guides/zsh-on-steamos) as you're going to want to add somthing to your Shell profile.
```

# Virtual Snake

Most programming languages I'm familiar with have a concept of the "global" environment, and a local "virtual" environment. NodeJS uses `npm --global install` to install globally, for example.

Python discourages using the "global" space.

![Python error](./images/thumbnail/python_1.png)

But, I already alluded to the solution - and it's in the error message - we should use something called "Virtual Environments!" But... there's a LOT of ways to create and use them.

# What's the Right Way?

As all engineers will tell you when you ask that question, "It depends."

BUT, I do have a recommendation. If all you want to do is install some Python packages or tools, don't mess around with `pyenv` or `pipenv` or `virtualenvwrapper` or `asdf`, or probably a dozen others. Just use Python!

```bash
python -m venv "$HOME/myenv"
echo 'source "$HOME/myenv/bin/activate"' >> "$HOME/.zshrc"
source $HOME/myenv/bin/activate
```

> Note - if you're using Bash, you'll need to change the second line to use `"$HOME/.bashrc"`, but you're using [ZSH on SteamOS](#steamdeck/guides/zsh-on-steamos), right?

This will use your Steam Deck's built-in Python instance, create a local environment for your user, and then write a line to your Profile file to pick it up each time you open a new terminal.

## Now What?

Now you can do this:

```bash
pip install llm
```

And then take advantage of [AI On The CLI](#programming/ai/ai-on-the-cli)!

# How Do I Get Rid Of It?

VERY easily - you just "deactivate" it to remove the envars it sets, then delete the folder

```bash
deactivate
rm -rf "$HOME/myenv"
```

> Don't forget to remove the `source "$HOME/myenv/bin/activate"` line from your Profile!

