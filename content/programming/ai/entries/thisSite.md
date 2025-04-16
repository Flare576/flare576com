---
title: "AI Helped Me Build This Site"
date: Wed Apr 16 11:10:49 CDT 2025
published: false
tags: ["programming","ai","ideation"]
---

# Starting is the Hardest Step

I knew I needed to start over, but looking at a blank page has always been intimidating for me - give me a piece of bad code, a flawed algroithm, or an error log any day - and this was no different.

What was different is that it's 2025 and AI has come a long *long* way. I haven't used it much, though, so I'm no prompt engineer, but I am pretty good at writing things down. I opened my existing notes document and scribbled down some thoughts as I worked on other things.

```flare
I need to rebuild my website, flare576.com. The current one is decades old (see flare576.com/flare). But I'm not sure what it should look like, or what it needs to convey.

The spark for wanting to update it came from wanting to start using BlueSky, and I thought since I owned the domain, I should use it to register, but if someone goes to the page I want there to be... something there.

My interests, and things I want to post to BlueSky about, right now are:

- Steam Deck
    * Official games
    * How-Tos
    * Emulation
    * Accessories
    * Maybe reviews?
- Programming
    * Architecture
    * NodeJS
    * Bash/ZSH
- Daily life with my family
    * Board/Card Games I played
    * Interesting conversations
- New items posted to Ebay
    * Books
    * Games
    * Movies
    * Toys

I'd prefer NOT having to build and maintain a backend/API, but if necessary it'd have to be in PHP using MySQL.
```

Not crazy detailed, not super organized, and if I was working with a human I'd spend more time cleaning it up... but I can always just start the AI over, right? :: SEND ::

```assistant
...
A single-page layout works great. Here's a structure idea:
Header

   Logo or site name (“Flare576” or something quirky if you want personality)

   A short tagline: "Gaming, Coding, Life." or "Bits, Bytes & Board Games."
...
```

The AI just alliterated on me. And it's probably the best description of my life I've ever seen.

# Refinement and Questions

It had a lot to say, but a few things caught my attention

```assistant
- Small cards or blog-style tiles: one per topic (Official Games, Emulation, How-Tos, etc.)
- Embed a dynamic feed using eBay’s affiliate or seller tools (no backend required)
- Markdown-based content, no backend needed
- Sketch out the content — happy to help you wireframe or build a mockup
```

I'm no designer, so a mockup is essentially worth its weight in gold to me... well, like, _visual_ weight, I guess.

Internet idioms are hard.

Anyway, 

```flare
Please provide a wireframe or mockup so I can see how the pieces would fit together
```

I hit enter and wait for some sort of ASCII mess to show up on my screen...

![First Mockup](images/thumbnail/website_mockup.png)

Huh. That's... actually pretty great. I was imagining side navs and hero images and... But this is... simple. I mean, there's some inconsistency between the sub-categories, headings, etc., but if I look at those as "options" instead of "mistakes," I get some pretty great ideas. In fact, I think I see the folder structure already

```flare
Ok, I think I understand how I can make that work from a JavaScript and folder approach... I'm thinking

root/
├─ content/
│  ├─ steamDeck/
│  │  ├─ meta.js
│  │  ├─ entries/
│  │  │  ├─ article1.md
│  │  │  ├─ article2.md
│  ├─ programming/
│  │  ├─ meta.js
│  │  ├─ entries/
│  │  │  ├─ article1.md
│  │  │  ├─ article2.md
├─ index.js
├─ main.css
├─ index.html

Where index.js would parse through the folder structure, read the title/description for each folder from meta.js, and then render the cards on the main page.... I think I'm building more of a Single-page-application here, and there's two things I noticed that I don't have good solutions for:

1. When do the md files get converted into HTML?
2. Where does the system get the pageName or other meta type of info for those MD files? Adding it to the top-level folder's meta.js would allow a lot of control over when articles go live, but it's also likely a very manual process...
```

# The Answers May Surprise You

Here's where the AI legitimately surprises me, though.

```assistant
Let's dive into your questions

✅ 1. When Do the .md Files Get Converted Into HTML?

There are a couple of ways to handle Markdown-to-HTML conversion on the client side, so you don’t need a backend:
Client-Side Markdown Rendering

You can use a small JS library like:

    Marked – fast and popular
    markdown-it – extensible and robust

In your index.js, you’d fetch each .md file via fetch() or XMLHttpRequest, then run it through the parser and inject it into your DOM.
Example:

import { marked } from 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';

fetch('content/steamDeck/entries/article1.md')
  .then(res => res.text())
  .then(md => {
    const html = marked(md);
    document.querySelector('#content').innerHTML = html;
  });

This lets you keep your articles as raw Markdown and only convert them as needed in the browser — no pre-compiling needed.

✅ 2. Where Does Metadata for Each .md Come From?

You have a few options here, and each has trade-offs in terms of automation vs. control:
Option A: Top-Level meta.js Defines All Entries

This is what you mentioned — and it's actually very clean.

Option B: Use Front Matter in Each Markdown File

This is popular in static site generators (e.g. Eleventy, Hugo, etc.).
```

I... didn't ask for client-side rendering. I didn't ask about "Front Matter." Hell, I've never even **HEARD** of Front Matter.

But they're both **EXACTLY** what I need for this. I prepare to start to search the web for more information on formatting, customizing, etc. when I realize that's the _old way_ of searching, where I need to know what I'm asking. What if...

# Open-ended Questions

```flare
I'm drafting my first article to test the idea and realize I'm probably going to want a little formatting control - for example, I'm going to have my messages to you and your responses back, and it'd be great to be able to color-code them. Does markdown (or either of the tools you recommended for client-side rendering) support in-markdown styling?
```

```assistant
✅ 1. Use HTML Directly in Markdown

Markdown allows raw HTML by default, so you can do this:

<p class="user-msg">Holy smokes, "Front Matter" looks amazing...</p>
<p class="assistant-msg">Yes! You’re in luck — Markdown doesn’t support styling out of the box, but...</p>

Then in main.css:

.user-msg {
  background-color: #1e3a8a; /* blue-ish */
  color: white;
  padding: 0.75em;
  border-radius: 8px;
  margin-bottom: 1em;
}

.assistant-msg {
  background-color: #334155; /* darker gray */
  color: white;
  padding: 0.75em;
  border-radius: 8px;
  margin-bottom: 1em;
}
```

Ehhh, if I wanted to write HTML, I'd just write HTML... that idea isn't gre...

````assistant
✅ 2. Use Code Fencing + Language Classes (Good for Dialogs)

Another clean approach is to repurpose code blocks for styled messages:

```user
Holy smokes, "Front Matter" looks amazing...
```

```assistant
Yes! You’re in luck — Markdown doesn’t support styling out of the box...
```

Then use CSS:

pre code.language-user {
  background-color: #1e3a8a;
  color: #ffffff;
  padding: 1em;
  border-radius: 10px;
  display: block;
  margin-bottom: 1em;
}

pre code.language-assistant {
  background-color: #334155;
  color: #ffffff;
  padding: 1em;
  border-radius: 10px;
  display: block;
  margin-bottom: 1em;
}

And make sure your renderer (e.g., marked) isn’t stripping out language classes — which it usually doesn’t.
````

...I'd forgotten about language classes. And now I know I can use them, how `marked` is likely to render them, and how to style them.

# Coding

Ok, I've got 80% of this article written, I'm curious if I can get something to render. I'm going to need to get a template `index.html`, remember the `<HTML>` line, or is it DOCTYPE... and the... wait.

```flare
Can you give me a quick index.html template with all the modern tags stubbed?
```

```assistant
Absolutely! Here's a clean, modern index.html template with:

- Sensible <meta> tags
- Mobile-responsive setup
- Favicon stub
- Minimal Tailwind-style layout if you want to expand on it later
- Code fencing support via Marked.js with syntax highlighting and custom language styling support

✅ index.html
...

✅ main.css (Styling Snippets)
...

✅ index.js (Quick Starter)
...
```

Yup.

# Blank Page Syndrome: Solved

I didn't even have to ask, or explain that my brain sees a blank page as a brick wall.

Is the code perfect? Or complete? No, obviously not. But I'm not starting from blank pages, I have a better idea of what I want, and I **Learned** things. Any tool is only as good as how you use it, and the only way to get better with one is to practice; I intend to continue to practice.
