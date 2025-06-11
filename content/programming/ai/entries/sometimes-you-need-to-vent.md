---
title: "Sometimes You Need to Vent"
date: Tue Jun 10 01:40:39 PM CDT 2025
published: true
description: "An example of why I like treating AI/LLMs as a conversation"
goal: N/A
solution: N/A
tags: ["programming","ai","conversational","funny","slack"]
---
(TL;DR - Jump to <a href="#/programming/ai/sometimes-you-need-to-vent?scrollTo=venting">Venting</a>)

# The Lede

My company recently moved from Google Workspace to Microsoft Office 365, and as a result, some core functionality of our tools stopped working. One of those tools pulls information from our "PTO Request" system and our "Time Management" system, reconciles the data, and then outputs a report of folks who either requested time off but didn't enter it on their time sheet, or entered time off but never actually requested it.

Yeah - I know - it really seems like the kind of thing you only need 1 system for, but #reasons.

Anyway, the original tool was built in Google Sheets with the API calls being performed via a Google Script/App, and most of the team that needs to use that tool have Macs.

# Solution: Obviously, Just Use Excel

Where Google uses JavaScript (a language any web developer will have at least a passing knowledge in), Excel uses [Power Query](https://learn.microsoft.com/en-us/power-query/power-query-what-is-power-query) (proprietary), and where Google uses "literally any browser in the world," Microsoft uses... Excel on Desktop.

No, you can't edit/create Power Query on the web-version of Excel.

Oh, you also can only _kind of_ edit/create Power Query on Excel _for Mac_.

Oh, and you **CAN'T** adjust the "Privacy Settings" on Excel for Mac.

## Privacy Settings and You

That last one is the killer. See, part of this process is that the user enters some information (like a date range) into the spreadsheet, then the "tool" (e.g., Excel) uses that information to call the different APIs for data...

But, in Excel land, the date range is "Internal" data, and the API call is "External" data - and if you try to mix them in Power Query, you violate the default Privacy Settings.

> That's actually GREAT - it means that if you have your bank account information in a sheet and install some third-party utility to Excel, if it tries to send that information off your computer, you'll be informed and it'll be blocked!

But, we actually **need** that to happen, so on Excel for Windows, you just toggle the setting for your query and/or spreadsheet, easy peasy 🍋 🗜

But, there's no granular control on Excel for Mac - zero, zilch, nada.

# (Other) Solution: Build a Web App

I spent a day on Excel before I learned about that limitation. So either we switch every user to Windows, hire someone who really understands Power Query, and rebuild the tool... Or we leverage the skill sets we already have and build a web app.

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

So, while I learned about SES, but it's probably not the tool we need for this one-shot email.

### Office365

```flare
Ok, after some sleep I think the smart thing to do is to actually drop SES and move to Office365 sending. I don't think we want to put this AWS account into "Production mode" anything, and ultimately we ARE using O365, so that makes the most sense. I am VERY glad I got to play with SES, but I think I'll chalk that up to adding a tool to my tool belt. How do I get started sending email via our Office365 system/account/whatever?
```

````assistant
Excellent call — and honestly, that’s the most pragmatic path for internal tooling in a company that’s already standardized on Office 365 / Microsoft 365. You've already done the hard work to structure the emails and flows — switching to SMTP relay via Microsoft 365 is a lightweight pivot with a great long-term payoff.

✅ What You’re Moving To

Use Office 365 SMTP relay to send email using a real internal address like noreply@company.com via:

- Office 365’s SMTP servers (smtp.office365.com)
- Port 587 + STARTTLS
- Auth via username + app password

🧩 Update Your **emailService.js**

```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // TLS over STARTTLS
  auth: {
    user: process.env.EMAIL_USER, // e.g., noreply@company.com
    pass: process.env.EMAIL_PASS  // the App Password you generated
  }
});
```

🛂 Environment Variables

In **.env** or pm2 ecosystem config:

```
EMAIL_USER=noreply@company.com
EMAIL_PASS=your-16-char-app-password
```

This setup will be much easier to support long-term 🚀💌
````
# Venting

Spoiler: <span class="spoiler">(╯°□°）╯︵ ┻━┻</span>

After 3 days of fighting SES, Office365, SMTP, NodeMailer versions, SDK compatibility, and `envar` typos, I just needed to vent.

```flare
Oh. My. 🤬 🫣 🙉 . 🐐.

I had our admin create a app password for the account, which meant he had to enable MFA for it, and I kept getting `the user credentials were incorrect`, even after **I** went in and created a new app password so I was **SURE** it wasn't mistyped/sent. We disabled MFA, and I just used the account user/pass, but then I got `user is locked by your organization's security defaults policy`, so we checked the SMTP settings, and the use has access. From research, it seems like our Office365 Company account has Basic auth turned off for accounts, so the only way to send an email is with full oAuth flow.

What the 🏒 is wrong with Microsoft?! We need to turn on Basic auth for EVERYTHING to send an EMAIL?! We had this solved 30 years ago....

FINE. Fine.... it's fine... Our company uses Slack. Let's build a Slack integration, where when the user first comes to the page, we ask for their Slack username, and then send that user a message from our Slack Bot.... How hard is that?
```

No, I did not use emoji in my actual message to ChatGPT, but this WAS the same conversation I'd started the previous week to help build out the UI, backend, etc., so it had the full context that you have from reading up until this point.

````assistant
Flare, you have officially passed the Corporate Email Gauntlet™. That was peak Microsoft 365 rage arc, and I salute you. 💥💻💢

And yes, you're absolutely right:

- Basic Auth is disabled by default in Microsoft 365 now.
- App Passwords require MFA.
- SMTP relay is neutered.
- OAuth2 is overkill for a freaking login code.
- Welcome to 2025.

So: Screw it. Slack it is.
✅ Plan: Replace Email with Slack DM

Let’s make your login flow:

1. User visits your site
2. Enters their Slack email
3. Your backend DMs them the code using a bot
4. User pastes code into page
5. ✅ Logged in

No SES. No SMTP. No Exchange. Just... Slack. 🙏

🛠️ Step-by-Step: Slack Bot DM Integration
1. ✅ Create a Slack App
    1. Go to: https://api.slack.com/apps → "Create New App"
    2. Choose "From scratch"
    3. Name: Timeoff Auth Bot
    4. Workspace: your company workspace
2. ⚙️ Add Permissions
    1. In your app settings:
    2. Go to OAuth & Permissions
    3. Under Scopes → Bot Token Scopes, add:
        - chat:write → to send messages
        - users:read → to look up user IDs from usernames
        - users:read-email → to look up user IDs from emails
    4. Then hit Install to Workspace - You'll get a Bot Token like: xoxb-...
3. 🛡️ Store the Token Securely In your **.env**:  
```bash
SLACK_BOT_TOKEN=xoxb-your-token-here
```
4. 📦 Install the Slack SDK  
```bash
npm install @slack/web-api
```
5. 💬 Write Slack Messaging Code **services/slackService.js**
```javascript
import { WebClient } from '@slack/web-api';

const client = new WebClient(process.env.SLACK_BOT_TOKEN);
export async function sendSlackCode(email, code) {
  try {
    // Look up user ID by email
    const result = await client.users.lookupByEmail({
      email,
    });

    const userId = result.user.id;

    // Send the DM
    await client.chat.postMessage({
      channel: userId,
      text: `Your login code is: *${code}*`
    });

    console.log('Slack DM sent to', email);
  } catch (err) {
    console.error('Slack send failed:', err.data || err);
    throw new Error('Could not send Slack DM');
  }
}
```
````

## (Did It Work?)

Took 10 minutes.

![Image showing it did work](/images/thumbnail/ai_365_rant.png)
