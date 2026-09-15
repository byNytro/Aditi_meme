# Aditi — Birthday Surprise (v1)

A step-by-step surprise site. No spoilers upfront — she discovers everything as she goes.

## Flow

1. **"Do you wanna see what I made?"**
2. **Lights on** — room brightens, string lights appear
3. **Play music** — plays `music/birthday.mp3` (or a soft fallback tune)
4. **Decorate** — bunting, balloons, confetti
5. **Cut the cake** — cake appears, she taps to cut it
6. **"Well, I have a message for you"** — personal note pops up

## Run locally

```bash
cd Aditi_simple
npm install
npm start
```

Open **http://localhost:3000**

## Deploy on Vercel

1. Import **https://github.com/byNytro/Aditi_meme** as a new Vercel project
2. Framework Preset: **Other**
3. Build Command: leave empty
4. Output Directory: leave empty (serves the repo root)
5. Deploy

No build step — Vercel serves `index.html` as a static site.

## Customize

Edit the top of **`script.js`**:

```js
const CONFIG = {
  name: "Aditi",
  message: "Your message here...",
  signed: "— Without Pyar",
  musicUrl: "music/birthday.mp3",  // add your mp3 to music/ folder
};
```

Drop an MP3 into `music/birthday.mp3` for real background music. It plays **twice**, then stops. If the file is missing, a short tune plays instead.
