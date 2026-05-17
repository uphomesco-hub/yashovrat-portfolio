# Yashovrat Portfolio

Fresh standalone portfolio copy built from the saved Mahesh-style reference, with Git history and remote origin removed.

## Featured Order

1. Zeno AI / Vision Voice Agent - https://vision-voice-agent.netlify.app/
2. Agent Native App Framework - https://github.com/uphomesco-hub/agent-native-app-framework
3. UpHomes - https://uphomes.in/
4. Raddie - https://raddie.in/

## Stack

React, TypeScript, Vite, Tailwind, Framer Motion, Lenis, and the inherited scroll-stack motion system.

## Contact Form

The portfolio form follows the VenomHunt Google Apps Script pattern, but this is the standalone portfolio copy.

Current endpoint:

    https://script.google.com/macros/s/AKfycbzjO3XZm7daOWttCOoW_RW7rQi3Om12XWIWR7ehqyULeJ1s1yK3XK3qArYk8o5lt9C_aQ/exec

It is deployed from yashovrat56@gmail.com as a web app with access set to anyone. If it ever needs to be replaced, copy scripts/google-apps-script/contact-form-email.gs into Apps Script, deploy as a web app, then set VITE_CONTACT_FORM_ENDPOINT to the new /exec URL before building.

Submissions are sent to yashovrattiwari@gmail.com. The person submitting the form also receives a confirmation email saying their request was sent to Yashovrat Tiwari from the portfolio website. Because the script uses MailApp, the sender is the Google account that deploys the web app.

## Run

```bash
npm install
npm run dev
```
