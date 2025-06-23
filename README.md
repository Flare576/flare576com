# Flare576.com

This is the source code for my site on [Flare576.com](https://flare576.com). The **.html**, **.css**, and **.js** make up the framework, and the **.md** and **.json** files make up the content.

## Scripts

- **post** - A script that integrates with the file structure and Markdown files to make it possible to post to [Bluesky](https://bsky.app/profile/flare576.com) from command line
- **deploy** - A script that creates the landing pages, updates **index.js** with a fresh cache-bust ID, and deploys my site to my webhost
- **addNew** - A script that makes adding a new post super easy, updating the necessary **.json** file(s) and creating the **.md** file automatically

## Running locally

You don't NEED `live-server` specifically - there's no NPM dependencies or `package.json` or anything, but it's the easiest hot-reloading tool I found.

```bash
npm -g install live-server # run once
live-server --port=48888 --ignore="**/tags*" # run to start
```

> Note: the `--ignore` doesn't seem to do anything, but I leave it there 'cause eventually I'd like to get it working ¯\&#95;(ツ)&#95;/¯

## Linting

Install [shellcheck](https://www.shellcheck.net/)

```bash
npm -g install eslint@8 # run once, be sure you get V8

# Run these to check files
eslint index.js
shellcheck deploy post addNew
```
