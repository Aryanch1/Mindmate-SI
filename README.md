<p align="center">
  <img src="./banner.gif" alt="MindMate AI" width="100%" />
</p>

<h1 align="center">MindMate AI</h1>

<p align="center">
  <strong>Your pocket AI assistant — chat, summarize, rewrite, and understand code, right from your phone.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React_Native-0.88-61DAFB?logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-SDK_58-000020?logo=expo&logoColor=white" alt="Expo SDK 58" />
  <img src="https://img.shields.io/badge/Platforms-Android%20%7C%20iOS-brightgreen" alt="Platforms" />
  <img src="https://img.shields.io/badge/PRs-welcome-orange.svg" alt="PRs welcome" />
</p>

<p align="center">
  <strong>▶ Try it live: <a href="https://mindmate-si.vercel.app">mindmate-si.vercel.app</a></strong><br />
  Open it in any browser — for live AI answers, add your own API key in the app's Settings tab.
</p>

---

## 🤖 What is MindMate AI?

**MindMate AI** is a free, open-source mobile app that puts an AI assistant in your pocket. Ask questions in chat, paste in long text and get a summary, rewrite anything in a different tone, or drop in code and get a plain-English explanation of what it does.

It works with **your own API key** and **any OpenAI-compatible API** — OpenAI, or any provider or local server that speaks the same protocol. There is **no account to create, no backend server, and no tracking**: your key stays on your phone, and requests go straight from your phone to the endpoint *you* choose.

> **No API key? No problem.** MindMate ships with a built-in **demo mode** that answers on-device, so the whole app works the moment you install it — no key, no sign-up, no internet needed.

---

## ❤️ Why people like it

- 🔐 **Private by design** — your API key and settings are stored only on your device; there is no MindMate server collecting anything.
- 🎭 **Demo mode built in** — try every feature instantly, even offline, before plugging in a key.
- 🔌 **Provider freedom** — not locked to one company; point it at any OpenAI-compatible endpoint and pick your model.
- 🆓 **Free and open source** — MIT licensed. Read the code, fork it, make it yours.
- 📱 **Runs anywhere** — Android and iOS from a single TypeScript codebase.
- 🌙 **Clean dark UI** — a calm, readable interface designed for phones.

---

## ✨ Features

| Feature | What it does |
| --- | --- |
| 💬 **AI Chat** | A friendly chat screen for questions, ideas, drafts, and everyday help. |
| 📝 **Summarize** | Paste long text — articles, notes, emails — and get the key points back in seconds. |
| ✍️ **Rewrite** | Restyle any text three ways: **Formal**, **Casual**, or **Shorter**. |
| 💻 **Explain Code** | Paste a code snippet and get a plain-language walkthrough of what it does. |
| 🎭 **Demo Mode** | Full app experience with on-device sample intelligence — no key, no network. |
| ⚙️ **Your Settings** | API key, base URL, and model name, saved on your device with AsyncStorage. |
| 🧭 **Simple Tabs** | Chat, Tools, and Settings — everything is one tap away. |

---

## 📲 Get the app on your phone

### Option 1 — Run it with Expo Go (fastest)

**You need:** Node.js 20+ on your computer, the **Expo Go** app on your phone (SDK 58), and a free Expo account. Your phone and computer must be on the **same Wi-Fi network** — the phone loads the app from your computer over Wi-Fi, so if they are on different networks the QR code will not connect.

**Step 1 — Download the project.** Either clone it:
```bash
git clone https://github.com/Aryanch1/Mindmate-SI.git
cd Mindmate-SI
```
…or download the ZIP from GitHub (green **Code** button → *Download ZIP*), unzip it, and open a terminal (PowerShell on Windows) inside the project folder. Every command below is run in that folder.

**Step 2 — Install the dependencies.**
```bash
npm install
```
This downloads everything the project needs into a `node_modules` folder. You only need to re-run it when the project's dependencies change.

**Step 3 — Check whether you are logged in to Expo.**
```bash
npx expo whoami
```
- If it prints your Expo account name (shown in **green**), you are logged in — skip to Step 6.
- If it says **"Not logged in"**, continue to Step 4.

**Step 4 — Log in.**
```bash
npx expo login
```
This opens a browser sign-in. When it finishes, run `npx expo whoami` again. If it now prints your account name in green, you are logged in — skip to Step 6. If it *still* says "Not logged in" (the browser sign-in sometimes finishes without the terminal noticing), use the access-token method in Step 5 — it always works.

**Step 5 — Log in with an access token (the reliable method).**
1. Go to **expo.dev** and sign in → open your account → **Settings** → **Access tokens** → **Create token**. Give it any name and create it.
2. **Copy the token right away** — it is shown only once. If you lose it, just delete it and create a new one.
3. In the **same PowerShell window** you will run the app from, set the token (paste your token between the quotes):
   ```powershell
   $env:EXPO_TOKEN = "paste-your-token"
   ```
   On macOS/Linux instead: `export EXPO_TOKEN="paste-your-token"`
   
   The token only lives in that one window — if you close PowerShell or open a new window, set it again in the new window before starting.

**Step 6 — Verify the login.**
```bash
npx expo whoami
```
It should now print the name of the account you are logged in with, **in green**. That green name is the proof you are signed in — do not continue until you see it.

**Step 7 — Start the app.**
```bash
npx expo start
```
A **QR code** appears in the terminal. Leave this window open while you use the app — it is the server your phone talks to. (Press `r` in this window to reload the app after changing code, and `Ctrl+C` to stop the server.)

**Step 8 — Open it on your phone.**
1. Open **Expo Go** on your phone and sign in (Profile tab) with the **same Expo account / email** you logged in with on the computer in Steps 3–6. This must match — if the phone is signed in with a different account (or not signed in), Expo Go will refuse to open the project.
2. Scan the QR code from Step 7 — with Expo Go's scanner on Android, or the Camera app on iPhone.
3. The app opens on your phone. 🎉 That's it!

### Option 2 — Build a standalone APK (Android)

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

EAS builds in the cloud and gives you a downloadable **.apk** you can install directly on your phone — no Expo Go needed afterwards. (The `preview` profile in `eas.json` is already set to produce an APK.)

### Then, to unlock live AI

The app works out of the box in an on-device **demo mode**. For real AI answers, open the **Settings** tab, turn **Demo mode OFF**, paste an API key, set the base URL and model, and tap **Save settings**.

Free option — Google Gemini (key from Google AI Studio, aistudio.google.com/apikey):

- **Base URL:** `https://generativelanguage.googleapis.com/v1beta/openai/`
- **Model:** `gemini-3.5-flash-lite`

OpenAI also works with the defaults (base URL `https://api.openai.com/v1`, model `gpt-4o-mini`) and your own OpenAI key.

---

## 🧠 How it works

- **One codebase, every phone** — React Native + Expo Router with file-based tabs (Chat / Tools / Settings).
- **A tiny AI client** (`lib/ai.ts`) talks to any OpenAI-compatible chat-completions endpoint using your key, and falls back to on-device demo replies when no key is set.
- **On-device storage** (`lib/storage.ts`) persists your settings with AsyncStorage — nothing is synced anywhere.
- **Type-safe end to end** — written in TypeScript and checked in CI on every push.

```
app/
  (tabs)/index.tsx      → Chat screen
  (tabs)/tools.tsx      → Summarize · Rewrite · Explain Code
  (tabs)/settings.tsx   → API key, base URL, model
lib/
  ai.ts                 → OpenAI-compatible client + demo mode
  storage.ts            → On-device settings
  theme.ts              → Dark theme
components/
  MessageBubble.tsx     → Chat bubbles
```

---

## 🛠️ Tech stack

**TypeScript** · **React Native 0.88** · **Expo SDK 58** · **Expo Router** · **AsyncStorage** · **GitHub Actions CI**

---

## ❓ FAQ

**Is it really free?**
Yes — the app is MIT-licensed open source. If you connect your own API key, your provider's usage pricing applies to your requests; demo mode is always free.

**Do I need an API key?**
No. Demo mode covers the full app offline. A key only makes the answers live.

**Where is my API key stored?**
Only on your phone, in the app's local storage. It is sent only to the API endpoint you configure — never to us (there is no "us"; the app has no backend).

**Can I use a local model?**
Yes — point the base URL in Settings at any OpenAI-compatible local server (for example, one running on your own machine or network).

---

## 🗺️ Roadmap

- [ ] Streaming responses, token by token
- [ ] Saved chat history
- [ ] Voice input
- [ ] Share text into MindMate from other apps
- [ ] More rewrite styles

Ideas welcome — open an issue!

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a branch, and open a pull request. Please run `npm run typecheck` before submitting so CI stays green. See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

<p align="center">
  Built by <a href="https://github.com/Aryanch1"><strong>Aryanmouli Cherupalli</strong></a> · If MindMate AI is useful to you, a ⭐ on the repo is the best thank-you!
</p>
