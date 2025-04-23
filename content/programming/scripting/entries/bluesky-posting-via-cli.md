---
title: "Bluesky Posting via CLI"
date: Wed Apr 23 13:59:25 CDT 2025
published: true
tags: ["bash","cli","bluesky","scripting"]
---
# I'm a Nerd

I know that's not a shocking revelation, but I feel like I should _qualify_ the statement, as there's a lot of different kinds of nerds (like purple, red, blue...)

When I want to add a post to my website, I don't open SquareSpace, or Wix, or even a web browser. I open my terminal and type

```bash
entry -s programming -u scripting -e -t "Bluesky Posting via CLI" -a "bash,cli,bluesky,scripting" "#I'm a Nerd"
```

`entry` is an [alias](https://en.wikipedia.org/wiki/Alias_(command)) to [a script](https://github.com/Flare576/flare576com/blob/main/addNew) I wrote (with a little help from AI, not gonna lie). It takes the `-s` (Section] and `-u` (sUbsection) of my site, some properties of the post, and then writes a file in [Markdown](https://www.markdownguide.org/) to start me off.

Then it opens the file in my editor ([vim](https://www.vim.org/)). I write the whole post in Markdown, save it, and run an [NPM](https://www.npmjs.com/) tool called [live-server](https://www.npmjs.com/package/live-server) to host my site locally. I verify it renders well, fix it if it doesn't, and then use [ANOTHER script](https://github.com/Flare576/flare576com/blob/main/deploy) I wrote to deploy the site to my server.

# Didn't I Mention BlueSky, Like, An Hour Ago?

Oh, right, [THAT Script](https://github.com/Flare576/flare576com/blob/main/post). That's the one I wanted to tell you about! The other scripts are pretty geared toward my stupid website design, but I think this one might be useful to other folks!

```bash
post "This is my voice on TV"
```

This opens your `$EDITOR`, filled with the content you passed in. You write your post, save, and quit.

Then MAGIC happens.

```bash
generate_facets() {
  local text="$1"
  local facets=()
  local utf8_text
  utf8_text=$(echo -n "$text" | iconv -f utf-8 -t utf-8)

  # Use grep-compatible URL pattern (matches most http/https URLs)
  local url_regex='https?://[^ ]+'

  while read -r url; do
    # Get byte offsets of each match
    start=$(printf "%s" "$utf8_text" | grep -b -o "$url" | head -n1 | cut -d: -f1)
    end=$((start + ${#url}))

    # Append facet object
    facets+=("{
      \"index\": {\"byteStart\": $start, \"byteEnd\": $end},
      \"features\": [{\"\$type\": \"app.bsky.richtext.facet#link\", \"uri\": \"$url\"}]
    }")
  done < <(grep -oE "$url_regex" <<< "$utf8_text")
...
```

You see, BlueSky uses something called [Facets](https://docs.bsky.app/docs/advanced-guides/post-richtext) to mark where URLs, Hashtags, and @mentions are in your post. With the help of code like the above snippet, my script finds them in your post, generates the facets for you, and includes them in your submission! And it's (almost) all in bash - the only extra tool you need is [jq](https://jqlang.org/) (and if you've never used JQ before and have to do ANYTHING with JSON, you'll thank me for the introduction).

If folks let me know they'd like to use it, I'll spin it up as another [Flare's Scripts](https://github.com/Flare576/scripts) project!
