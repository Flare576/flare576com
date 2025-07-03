---
title: "Claude Code"
date: Wed Jul  2 11:13:52 CDT 2025
published: false
description: "I experiment and learn about using Claude Code"
goal: N/A
solution: N/A
tags: ["programmin","ai","claude","cli"]
---
# Claude Code Adventure

## Project Type

```flare
    I think it's important to call out that this article discusses a POC code base, not something with maturity/rigor or multiple previous developers.
```

It's an important distinction because it's the difference between asking a mechanic to work on a Honda Civic (a common car they've likely seen before) or a "car" you built from random parts that runs as long as you turn the key twice while pumping the gas.

Yeah, the mechanic (Claude Code in our case, but any AI or even other devs) will **EVENTUALLY** figure out how to fix the car, but giving them a list of parts you used, what problems you see, etc. is going to help them do it MUCH faster (and _probably_ with less swearing).

# Context is King

To that end, my overall finding is:

```flare
Investing a few hours up-front to build out the context of the project is **VITAL**.
```

 You don't have to do it alone, but you can't expect the AI to do it alone, either.

My first attempt did exactly that - forced Claude to effectively solo the understanding phase - and it wasn't an unreasonable expectation. The code base wasn't extensive and the output was useful, but not [Business Intelligence](https://en.wikipedia.org/wiki/Business_intelligence)-level of complexity. All I really wanted to do initially was replace the three **.csv** files it used for its data with API calls.

Maybe not _unreasonable_, but woefully under-developed and ill-informed.

## Details, Details, Details

What API's were we going to use? Where do we get the authorization information? What files can we change?  What files should we not? What is the output? Do we need any other data?

All answerable, all something any developer or entity would need to accomplish the goal, but I'd _assumed_ the AI would ask me if it needed anything.

```flare
AI won't ask questions it doesn't know it needs to ask - it _assumes_ you're smart enough to know the difference between a POC and enterprise software.
```

So, both sides of the AI/Human relationship were _assuming_ the other knew what was going on... Hindsight is 20/20, but it's not hard to see where this is gong.

# Two Days Later

> Honestly, two days of flailing to learn a lesson about how to engage with the future of development is actually pretty impressive, and I'm not tooting my own horn or anything - it speaks volumes to the speed that you can iterate with a tool like Claude Code.

The first sign that things were going off-the-rails was actually a day or two earlier, when we added an API call that returned an authorization error, but shouldn't have. It was caused because the AI had discovered an API called "myProduct.com", but the **ACTUAL** API we needed to use was "myProductApp.com" - a similar-but-completely-unrelated company and service.

The correct API was also undocumented.

And unofficial.

And uses a different Account-ID.

## But That's Just This Project

It is, but it also isn't.

```flare
Any project beyond "Hello World" is going to involve tying multiple systems together in some way, and defining those relationships in your context is where you'll save your time.
```

Yes, the API I had to use was complicated, but maybe the SDK you're using is 2 years old, or the package you're using is 2 days old - either way, adding a line or two in your context is going to save you time in the long run.

# Starting Over

The best part about Claude, Cursor, ChapGPT, and any other existing tool is that a clean slate is only a click or command away.

```flare
You can't tell another human to "Forget everything we've talked about and start over", but that's exactly what LLMs do on every message.
```

Use that fact to your advantage. For example, over the last 24 hours I learned more about the intent of the tool, the availability of the APIs, and the desired data than I knew when I first started Claude, so a lot of what we build already needs drastic changes...

Or, I just backup my **CLAUDE.md**, **CLAUDE.local.md**, any valuable notes or code, and revert the rest to how it was when I started. I restarted Claude, fed in my updated context files with my discoveries and new goal/starting points and started working _with_ the AI instead of expecting it to work _for_ me.

## An Assistant, Not A Slave

I read the code it produced, I double-checked it's plans, and I even wrote a bit of my own code, too. It found errors I missed, and vice versa. Ultimately, I did more work than in my first approach, but I did WAY less work than if I'd have had to do it all myself.

```flare
Be clear with the AI that you made some changes, or that you're *guessing* about a cause, and it'll know it needs to double-check things.
```

## Claude Cost Results

Here's my results from migrating the CSV tool to APIs:

**`The Wrong Way`**
```claude
> /cost
  ⎿  Total cost:            $59.30
     Total duration (API):  Ok, You got me; I didn't copy the actual
     Total duration (wall): output, but I got the other stats from
     Total code changes:    the web for cost and tokens!
     Usage by model:
         claude-3-5-haiku:  2.1m input, 46.1k output, 0 cache read, 0 cache write
            claude-sonnet:  5.48k input, 361k output, 67.9m cache read, 7.6m cache write

# Never actually worked
```

**`The Right Way`**
```claude
> /cost
  ⎿  Total cost:            $12.18
     Total duration (API):  1h 30m 50.5s
     Total duration (wall): 4h 18m 57.7s
     Total code changes:    1181 lines added, 229 lines removed
     Usage by model:
         claude-3-5-haiku:  1.2m input, 23.6k output, 0 cache read, 0 cache write
            claude-sonnet:  39.1k input, 91.7k output, 13.2m cache read, 1.5m cache write

# Works
```

# Final Thoughts

## About Using AI

LLMs are a very strange entity set. They're simultaneously the most capable, knowledgable, robust tools mankind has ever built... and yet if you don't hold their digital hands, they will ruin your whole day.

I often hear them compared to "Junior Devs," but that's a bad analogy - no "Junior Dev" is going to read "please add caching and API throttling to these API methods," and come back in 10 seconds with a solution that works.

Similarly, no LLM is going to get the prompt "Please replace these CSV files with API calls" and know to ask "should we use the XYZ API, or the ABC API?"

Humans, for the most part, are better at realizing they simply don't have the information they need to accomplish what is being asked of them. That's the risk of having literally the sum of human knowledge at your fingertips - _every_ response from an LLM is probabilistic - sometimes an LLM "hallucinates" because the probability of it's next word is BARELY above it's threshold, so all it can do is assume it's _right_.

## Specifically About Claude Code

I love this tool. I use a combination of VS Code and Vim to edit files, work with Databases, make diagrams, etc., and needing something like [Cursor](https://cursor.com/en) in ADDITION to VS Code always felt clunky.

Claude Code is a command-line tool, so I just have it running in a separate terminal. With it's planning mode, I can work with it to establish an understanding of the task at hand, see where it's going off-course before it even starts, and ask it to do research for me (I told it it had permission to directly call the APIs we were using, and it immediately updated its suggestions to fit the data patterns). It's exactly how I want to interact with AI.

```flare
A tip for those still reading: **CLAUDE.md** and **CLAUDE.local.md** are two files in the root of a project that Claude Code reads for every message you send. I recommend using **CLAUDE.md** to describe your project - think of it as an in-depth README.md - and using your **CLAUDE.local.md** to define your current goal, local tool set, cli preferences, etc. Check **CLAUDE.md** into source control, but add **CLAUDE.local.md** to the .gitignore list.
```
