---
title: "VIM + Airline + ByteCount = BlueSky"
date: Mon Apr 28 07:59:10 CDT 2025
published: true
description: "Airline.vim config to add byte count to statusline"
tags: ["vim","programming","airline","customization"]
---
# Why?

Using VIM to post to BlueSky means that I have to know when I hit 300 characters, and the easiest way to do that is to see a Byte count with [`g` + `Ctlr+g`](https://vimtricks.com/p/count-words-and-lines/)... or is it? I use Airline to customize my status line at the bottom of VIM; what if I could add it there...

# Turns Out, You Can

![CLI Screenshot](/images/thumbnail/post_cli.png)

If you add this to your `.vimrc`, you can get ByteCount at the end of your SectionZ (the farthest to the right by default).

```vim
function! ByteCount()
  let l:bytecount = line2byte(line('$') + 1)
  if l:bytecount <= 0
    return ' B:1'
  endif
  let l:bytecount -= 1

  if l:bytecount < 1024
    return printf(' B:%d', l:bytecount)
  elseif l:bytecount < 1024 * 1024
    return printf(' B:%.1fk', l:bytecount / 1024.0)
  elseif l:bytecount < 1024 * 1024 * 1024
    return printf(' B:%.1fM', l:bytecount / (1024.0 * 1024))
  else
    return printf(' B:%.1fG', l:bytecount / (1024.0 * 1024 * 1024))
  endif
endfunction

augroup AirlineCustom
  autocmd!
  autocmd User AirlineAfterInit call airline#parts#define_function('bytecount', 'ByteCount')
  autocmd User AirlineAfterInit call s:append_to_airline_section_z()
augroup END

function! s:append_to_airline_section_z()
  " Get existing z section if defined, otherwise use default parts
  let l:orig = get(g:, 'airline_section_z', airline#section#create_right(['%3p%%', '%l:%c']))

  " If it's a List, append; if String, create a List first
  if type(l:orig) == type([])
    let l:newz = add(copy(l:orig), 'bytecount')
  else
    let l:newz = [l:orig, 'bytecount']
  endif

  let g:airline_section_z = airline#section#create_right(l:newz)
endfunction
```

# Explanation

It looks long, but breaking it down isn't too bad!

```vim
  let l:bytecount = line2byte(line('$') + 1)
  if l:bytecount <= 0
    return ' B:1'
  endif
  let l:bytecount -= 1
```
At its core, this uses `line2byte` to get the total bytes of the file by checking the byte _after_ the last one, then subtracts 1... Because programming, I guess?

```vim
  if l:bytecount < 1024
    return printf(' B:%d', l:bytecount)
  elseif l:bytecount < 1024 * 1024
    return printf(' B:%.1fk', l:bytecount / 1024.0)
  elseif l:bytecount < 1024 * 1024 * 1024
    return printf(' B:%.1fM', l:bytecount / (1024.0 * 1024))
  else
    return printf(' B:%.1fG', l:bytecount / (1024.0 * 1024 * 1024))
  endif
```
All of this is just formatting - if the file is over 1024B, it starts using kB, then MB, then (🐐 help you) GB.

```vim
augroup AirlineCustom
  autocmd!
  autocmd User AirlineAfterInit call airline#parts#define_function('bytecount', 'ByteCount')
  autocmd User AirlineAfterInit call s:append_to_airline_section_z()
augroup END
```
This taps into Airline's customization engine so we can safely append to the section via our custom function below.

```vim
function! s:append_to_airline_section_z()
  " Get existing z section if defined, otherwise use default parts
  let l:orig = get(g:, 'airline_section_z', airline#section#create_right(['%3p%%', '%l:%c']))

  " If it's a List, append; if String, create a List first
  if type(l:orig) == type([])
    let l:newz = add(copy(l:orig), 'bytecount')
  else
    let l:newz = [l:orig, 'bytecount']
  endif

  let g:airline_section_z = airline#section#create_right(l:newz)
endfunction
```
If the original value of `g:airline_section_z` is an array, append to it. If it isn't, create a new array and append to it, then setup the section with the new values.

# You Used AI, didn't you

Lord yes, and it STILL took 4 or 5 iterations and some trial-and-error. Pro-tip: NEVER close your last editor window until you're 100% sure your changes to `.vimrc` are stable.
