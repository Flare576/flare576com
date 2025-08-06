---
title: "AI on the CLI"
date: Thu Jun 26 10:42:49 CDT 2025
published: true
description: "I've discovered tools and techniques for using AI from the command line"
goal: N/A
solution: N/A
tags: ["programming","ai","cli","llm","smartcat"]
---
(Note - if you're interested in using LLMs from the command line, I put together a small [Getting Started](#/programming/ai/setup-llm) post!)
```flare
_EDITED 2025-08-06_: I refined the way interact with the `repeat` functionality in llm.
```


# The Scenario

A coworker of mine told me about a tool he thought I'd be interested called [smartcat (sc)](https://github.com/efugier/smartcat), and I eventually found another one called [llm](https://github.com/simonw/llm)

## Smartcat (sc)

The idea is that you can run something like this from the command line

```bash
sc "Create a html page that hosts a nerd's interests" > thispage.html
```

The `sc` command comes pre-configured with a "System" prompt that prepends some information to your prompt, and passes it to the LLM you have configured, so Gemini, Claude, ChatGPT, etc. get something like

```json
{
    "system": "You are an extremely skilled programmer with a keen eye for detail and an emphasis on readable code. You have been tasked with acting as a smart version of the cat unix program. You take text and a prompt in and write text out. For that reason, it is of crucial importance to just write the desired output. Do not under any circumstance write any comment or thought as your output will be piped into other programs. Do not write the markdown delimiters for code as well. Sometimes you will be asked to implement or extend some input code. Same thing goes here, write only what was asked because what you write will be directly added to the user's editor. Never ever write ``` around the code. Make sure to keep the indentation and formatting.",
    "user": "Create a html page that hosts a nerd's interests"
}
```
`sc` takes the output of the LLM tool and spits it out to standard output, then the `> thispage.html` just writes whatever the command returns to a file.

## llm

The feature set of this tool is much _much_ broader. To that effect, you do need to do one additional piece of setup since it isn't focused on programming/code:

```bash
llm --extract --system "You are an extremely skilled programmer with a keen eye for detail and..." --save sc # 'sc' is arbitrary, but I'm using this name later!
llm -t sc "Create a html page that hosts a nerd's interests" > thispage.html
```

`llm`'s capabilities are so broad that I believe it's able to do everything that `sc` can do plus a plethora of other things... Except one.

# The Feature Miss

You see, while you have your text editor open, you can invoke `sc` with the `-r` option, and it first returns back your prompt, so you can highlight something you've written, invoke the tool, and build on what you have instead of replacing it.

```markdown
# AI on Command line

`smartcat` and `llm` two tools with similar goals. Both are great, but `llm` has a bit more support, and `smartcat` has a feature I like.

# Summary
```

You can highlight all of that, and in Vim enter **`:'<,'>!sc -r "summarize this"`**, and you'll end up with

```markdown
# AI on Command line

`smartcat` and `llm` two tools with similar goals. Both are great, but `llm` has a bit more support, and `smartcat` has a feature I like.


# Summary
`smartcat` and `llm` are both tools with similar goals, but `llm` has more support, while `smartcat` has a feature the author likes.
```

Pretty nifty, but `llm` doesn't have a comparable "repeat" or "echo" function... But that's the beauty of scripting!

From: [Flare576's Dotfiles - llm helper](https://github.com/Flare576/dotfiles/blob/main/.zshenv.llm)

```bash
# emulate smartcat (https://github.com/efugier/smartcat) -r functionality
# Note: This assumes you've installed the `llm` tool
llmr () {
  [ ! -t 0 ] && input=$(cat)
	echo "$input"
	echo -n "$input" | llm "$@"
}
```

Then, inside of my editor, I have two sets of shortcuts

From: [Flare576's Dotfiles - .vimrc](https://github.com/Flare576/dotfiles/blob/main/.vimrc#L139-L148)
```vimrc

"########################## LLM / AI
nnoremap <leader>llm :r !llm
xnoremap <leader>llm :!llm

" 'SC' stands for 'SmartCat', which ships with a great prompt for CLI coding assistance
" I stole it and created a template for 'llm'
nnoremap <leader>sc :r !llm -t sc 
nnoremap <leader>scr :r !llmr -t sc 
xnoremap <leader>sc :!llm -t sc 
xnoremap <leader>scr :!llmr -t sc 
```

With this `llmr` tool and the VIM mappings, I can operate in either Normal or Visual mode and use `<leader>sc` (and `scr` if I want the repeat) if I want to use the standard **sc** template, or `<leader>llm` (and `llmr`) if there's a different template I want to use.

Since I'm using `llm` 100%, I can also continue the previous thread/conversation via another CLI, I can do `llm -c "Hello again, smartcat-imposter"`.
