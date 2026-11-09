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
  <img src="https://img.shields.io/badge/React_Native-0.76-61DAFB?logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-SDK_58-000020?logo=expo&logoColor=white" alt="Expo SDK 58" />
  <img src="https://img.shields.io/badge/Platforms-Android%20%7C%20iOS-brightgreen" alt="Platforms" />
  <img src="https://img.shields.io/badge/PRs-welcome-orange.svg" alt="PRs welcome" />
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

1. Install **Expo Go** on your Android or iPhone.
2. On your computer:
   ```bash
   git clone https://github.com/Aryanch1/mindmate-ai.git
   cd mindmate-ai
   npm install
   npx expo start
   ```
3. Scan the QR code with Expo Go. Done — the app opens on your phone. 🎉

### Option 2 — Build a standalone APK (Android)

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

EAS builds in the cloud and gives you a downloadable **.apk** you can install directly on your phone — no Expo Go needed afterwards. (The `preview` profile in `eas.json` is already set to produce an APK.)

### Then, to unlock live AI

Open the **Settings** tab in the app, paste your API key, set the base URL and model (defaults work for OpenAI), and start chatting. Leave the key empty anytime to return to demo mode.

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
