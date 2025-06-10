---
title: "Sometimes you need to vent"
date: Tue Jun 10 01:40:39 PM CDT 2025
published: false
description: "An example of why I like treating AI/LLMs as a conversation"
goal: N/A
solution: N/A
tags: ["programming","ai","conversational","funny"]
---
# The Lede

My company recently moved from Google Workspace to Microsoft Office 365, and as a result, some core functionality of our tools stopped working. One of those tools pulls information from our "PTO Request" system and our "Time Management" system, reconciles the data, and then outputs a report of folks who either requested time off but didn't enter it on their time sheet, or entered time off but never actually requested it.

Yeah, I know, really seems like the kind of thing you only need 1 system for, but #reasons.

That tool was built in Google Sheets with the API calls being performed via a Google Script/App, and most of the team that needs to use that tool have Mac machines - that'll be important in a second.

# Solution: Obviously, Just Use Excel

Where Google uses JavaScript (a language any web developer will have at least a passing knowledge in), Excel uses [Power Query](https://learn.microsoft.com/en-us/power-query/power-query-what-is-power-query) (proprietary), and where Google uses "literally any browser in the world," Microsoft uses... Excel on Desktop.

No, you can't edit/create Power Query on the web-version of Excel.

Oh, you also can only _kind of_ create/edit them on Excel for Mac.

Oh, and you can't adjust the "Privacy Settings" on Excel for Mac.

## Privacy Settings and You

That last one is the killer. See, part of this process is that the user enters some information (like a date range) into the spreadsheet, then the "tool" (e.g., Excel) uses that information to call the different APIs for data...

But,in Excel land, the date range is "Internal" data, and the API call is "External" data - and if you try to mix them in Power Query, you violate the default Privacy Settings.

That's actually GREAT - it means that if you have your bank account information in a sheet and install some third-party utility to Excel, if it tries to send that information off your computer, you'll be informed and it'll be blocked! But, that's not what we're building, so on Excel for Windows, you just toggle the setting for your query or spreadsheet, easy peasy...

But, there's no granular control on Excel for Mac - zero, zilch, nada.

# (Other) Solution: Build a Web App

I spent a day on Excel before I learned about that limitation. So either we switch 'em all to Windows, hire someone who really understands Power Query, and rebuild the tool... Or we leverage the skill sets we already have and build a web app.

Spoiler: <span class="spoiler">I did the second thing</span>

## Build It Quick, Cheap, But Secure

I didn't want to spend weeks building out a replacement system, so I opted to skip Oauth, SSO, etc., and just use a "Passwordless" login. A user will

1. Access the tool's website.
2. Enter their company email address
3. Copy a code from their email into the tool
4. Start using the tool

All of my APIs will check for that code, so only someone with an email address we recognize (based on the domain) will be sent a code, and only someone with access to a company inbox will be able to get the code and put it into the form.

## That Sounds Simple... Why Are You 500 Words Into A Post Already

Apparently, sending an Email is **infuriatingly, unnecessarily complicated** now, at least "programmatically."

### SES

We ship most of our code to Amazon Web Services (AWS), and AWS has a service called Simple Email Service (SES). The idea is that if your code is running on an AWS service, it's SUPER EASY<sup>tm</sup> to connect to SES and generate email...

Except that, by default, there's no valid "From" that you can use.

And the only "To" addresses you can use have to be hard-coded and verified.

And the only way to send to other emails is to turn the whole thing into "Production" mode, which opens up the floodgates to send emails to ANYONE from the app, so typos (or jerks) could potentially generate emails outside of our company...

So, I learned about SES, but it's probably not the tool we need for this one-shot email.

### Office365

```flare

