---
title: "Vim For Writing"
date: Sun Aug 17 12:24:01 PM CDT 2025
published: false
description: "I go further down the dictionary/thesaurus rabbit hole"
goal: N/A
solution: N/A
tags: ["vim","config","dictionary","thesaurus","writing"]
---
# Dictionaries, Thesauruses, and Vim, Oh My!

## TL;DR

I updated my [Vim install script](https://github.com/Flare576/dotfiles/blob/main/setup/APPS/vim.sh) from my [dotfiles](https://github.com/Flare576/dotfiles) project, but the short-and-sweet is:

- I found a StarDict-formatted version of the [Collaborative International Dictionary of English](https://en.wikipedia.org/wiki/Collaborative_International_Dictionary_of_English) and started [hosting it](https://flare576.com/files/CIDE-2.4.2.tar.gz)
    * Source: [green via StackExchange](https://askubuntu.com/a/191268)
- I found the go-to [Moby Thesaurus](https://github.com/words/moby) and started [hosting it](https://flare576.com/files/mthesaur.txt)
- I put both of 'em someplace safe on my machine:
```bash
$HOME/.local/share
├── thesaurus.txt
└── stardict
    └── CIDE-2.4.2/
```
- I found a [CLI version of StarDict](https://dushistov.github.io/sdcv/) and created an alias in my shell for it:
```bash
alias dict='sdcv -2 ~/.local/share/stardict'
```
- I found a Vim plugin called [Thesaurus Query](https://github.com/Ron89/thesaurus_query.vim) that replaces Vim's normal thesaurus feature, but needs a little config:
```vim
" General settings
" Set vim's thesaurus to moby
set thesaurus+=$HOME/.local/share/thesaurus.txt
" Define the program to call for `K`
set keywordprg=dict

" Don't make any API calls, just hit the local file
let g:tq_enabled_backends=["mthesaur_txt"]
" Point to our normal file
let g:tq_mthesaur_file=&thesaurus
" Limit the secondary lists to 5 items
let g:tq_truncation_on_syno_list_size = 5
" use &lt;leader&gt;k, a mirror of K for lookup
nnoremap &lt;leader&gt;k :ThesaurusQueryReplaceCurrentWord&lt;CR&gt;
vnoremap &lt;leader&gt;k y:ThesaurusQueryReplace &lt;C-r&gt;"&lt;CR&gt;
```

![Editing a file](/images/thumbnail/vim-write-1.png)

So, now, as I'm using Vim, I can hit `K` to immediately look up the definition of the word my cursor is on

![Definition of Synonym](/images/thumbnail/vim-write-2.png)

... Or I can hit `<leader>k` and see a list of synonyms!

![Synonyms of Synonym](/images/thumbnail/vim-write-3.png)

# Story Time

A long time ago, in [December of 2020](https://github.com/Flare576/dotfiles/commit/26b5da16b7a5ec430517793068c427d39d728111) actually (it's crazy being able to look through a project and find this kind of thing), I added a value to the `thesaurus` setting in Vim.

I don't know if I ever actually **tried** it, though. Vim isn't, technically, a _writers_ tool, so a "thesaurus" for programmers isn't quite the same thing as for most people. Vim's behavior was

```flare
"take the word that was just typed and find it ANYWHERE in the thesaurus, then spit back all the lines that have it"
```

Imagine typing `cat`, hitting the lookup button and seeing "section"... because `category`.

Dictionaries are even worse because... Actually, let's quickly define some words so we can tell when we're talking Computer:

- thesaurus: Any document that allows mapping between terms based on their meaning or value
- Thesaurus: Note the big **`T`** - This is a document specifically designed to help you find English words that share meanings with other English words.
- dictionary: Any document that contains the correct spellings of words or phrases, and possibly common misspellings and a mapping to their correct forms
- Dictionary: Note the big **`D`** - This is a document that DEFINES English words, possibly with examples of their use
- spellcheck: The process of detecting a misspelling
- lookup: The process providing a DEFINITION to a word

## Seriously, You Had To Define Those?

Kinda, yeah. You see, in computer land, a **dictionary** isn't the same as a **Dictionary**. By-and-large, when you see something talking about a "dictionary" on your machine, it's just a list of words. If you type "compuper", your spellchecker needs to know to put a squiggle under it, or highlight it, or whatever.

Basically, your computer needs a way to tell you that you screwed up, and that's what a **dictionary** is for.

```you
So, how do you describe a file or tool that you can use to find out that computer means
```

```
-->computer

electronic device \electronic device\ n.
   a device depending on the principles of electronics and using
   the manipulation of electron flow for its operation.
   [PJC]

   Note: Numerous electronic devices are in daily use, among
         them the {television}, {radio}, {computer}, {robot},
         {transmitter}, {receiver}, {VCR}, {CD player}, etc.
         [PJC]
```

The answer is... Well, you usually don't.

```you
Why don't you?
```

WAIT, that's a [rabbit hole](#/programming/scripting/vim-for-writing?scrollTo=rabbit-hole) INSIDE a rabbit hole. Let's pause this one for a sec and get back to it

```you
YOU'RE THE ONE TYPING THE QUESTIONS!
```

**`FOCUS`**: We're talking about computers, and specifically Vim.

```you
So, Vim's **Thesaurus** functionality is bad for writing, and it's **Dictionary** is worse...
```

Well, its **thesaurus** functionality, right? Because it doesn't do big-**`T`hesaurus**, and its **`D`ictionary** is actually non-existant. It has a `K` command to look up computer commands, though, and you can _overwrite it_.

```you
That sounds promissing...
```

In a strange twist, it actually is! If we grab a program like [sdcv](https://dushistov.github.io/sdcv/) that can do actual **`D`ictionary** style **lookups**, and give it a [English Dictionary](https://flare576.com/files/CIDE-2.4.2.tar.gz), we can write a little helper script like:

```bash
alias dict='sdcv -2 ~/.local/share/stardict'
```

Now, we can run `dict computer` and get the definition we saw earlier! Then, we just tell Vim about it:

```vim
set keywordprg=dict
```

And NOW when we have our cursor over a word, we just type big **`K`** and get our definition!

```FLARE
Quick note: it took me quite a while to find a tool that was well-known enough to be part of Arch Linux's main repository AND available via OSX's `brew` command. It **ALSO** took an unreasonable amount of time to track down a decent dictionary file, so I hope I'm saving you a few hours of work!
```

### Dictionaries Aren't Thesauruses

Astute - and we did start our story time with **Thesauruses**, didn't we. Well, unfortunately, there's no great way to make Vim's built-in **thesaurus** functionality work effectively for English... So, we just get a plugin!

#### Thesaurus_query.vim

I tried making my own solution, and something called [vim-lexical](https://github.com/preservim/vim-lexical) based on a [blog post](https://burnicki.pl/en/2021/04/23/setting-up-vim-for-blogging.html) I found, but it still used the basic built-in functionality.

But [Thesaurus Query](https://github.com/Ron89/thesaurus_query.vim) builds a totally separate system... but the basic configuration is still noisy, so I recommend the following adjustments:

```vim
" I don't want it to call any APIs, so I limited it to my thesaurus file..
let g:tq_enabled_backends=["mthesaur_txt"]
" ... and told it where the file is
let g:tq_mthesaur_file=&thesaurus

" This controls the number of terms each synonym pulls in; it defaults to 200
let g:tq_truncation_on_syno_list_size = 5

" I like leader+k, sort of a mirror of `K` for dictionary
nnoremap &lt;leader&gt;k :ThesaurusQueryReplaceCurrentWord&lt;CR&gt;
vnoremap &lt;leader&gt;k y:ThesaurusQueryReplace &lt;C-r&gt;"&lt;CR&gt;
```

So, that's it! Now I can write a blog post (or anything else) and think to myself "Huh, I use the word _actually_ quite a bit... maybe it's time for _clearly_, or _quite_, or _naturally_," and if I type a word and think to myself "...I do not think that word means what you think it means," I can quickly check myself before I wreck myself.

# Rabbit Hole

When was the last time you looked up a word in a physical, paper dictionary?

Now, when was the last time you looked up a word WITHOUT a web browser, ChatGPT, Gemini, or other tool not _specifically_ designed for defining words, but capable of it?

Very infrequently do we use a traditional "Dictionary," physically or digitally.

And that sorta bothers me...

You see, _Language_ is THE basic building block of... well, everything. Even before written language, we had oral language, and before that we had gestures to communicate.

Before language, I'd argue, we weren't _human_.

## That Seems... Hyperbolic

If so, only slightly. "Knowledge is Power," but you can't express knowledge without a shared language...

... and if all of our understanding of the language we use is eventually learned from the internet, a very amorphous place constantly shifting with no 'central' knowledge base, then who is to say that any of us is actually speaking the same language as our listeners.

So, I like the idea of having a _static_ resource, something that exists independent of Google or OpenAI, that can tell me the nuance of a word.
