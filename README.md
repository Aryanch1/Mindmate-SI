# MindMate AI

An open-source **AI assistant mobile app** built with **React Native (Expo)** and **TypeScript**.

Chat with an AI model, summarize long text, rewrite it in a different tone, and get plain-language explanations of code — all from your phone, using **your own API key** with any OpenAI-compatible provider. No account, no backend, no tracking: your key and your chats never leave your device except to the API endpoint *you* configure.

> **No API key? No problem.** MindMate ships with a built-in **demo mode** that generates replies on-device, so you can explore the whole app immediately after installing it.

## Features

- **AI Chat** — multi-turn chat against any OpenAI-compatible chat-completions API, with on-device history persistence.
- **Summarize** — condense long text into key bullet points.
- **Rewrite** — rephrase text in a *formal*, *casual*, or *shorter* style.
- **Explain code** — paste a snippet and get a step-by-step plain-language explanation, including complexity for algorithms.
- **Bring your own key** — works with OpenAI and any compatible endpoint (custom base URL + model in Settings).
- **Demo mode** — deterministic on-device replies, zero setup.
- **Private by design** — settings and chat history are stored only in the app's local storage.

## Screenshots

| Chat | AI Tools | Settings |
| --- | --- | --- |
| _Coming soon_ | _Coming soon_ | _Coming soon_ |

## Getting started

### Prerequisites

- Node.js 18 or newer
- The [Expo Go](https://expo.dev/go) app on your phone, or an Android/iOS simulator

### Run locally

```bash
git clone https://github.com/Aryanch1/mindmate-ai.git
cd mindmate-ai
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

### Connect a live model (optional)

1. Open the **Settings** tab.
2. Turn **Demo mode** off.
3. Paste your API key, base URL (default `https://api.openai.com/v1`), and model name (default `gpt-4o-mini`).
4. Tap **Save settings** — the Chat tab now talks to the live model.

## Project structure

```
app/
  _layout.tsx            Root layout + settings provider
  (tabs)/
    _layout.tsx          Bottom tab navigation
    index.tsx            Chat screen
    tools.tsx            Summarize / Rewrite / Explain code
    settings.tsx         API key, base URL, model, demo mode
components/
  MessageBubble.tsx      Chat message bubble
lib/
  ai.ts                  OpenAI-compatible client + demo engine
  storage.ts             AsyncStorage persistence (settings + chat)
  settings-context.tsx   React context for shared settings
  types.ts               Shared TypeScript types
  theme.ts               Color palette
```

## Tech stack

- React Native 0.76 · Expo SDK 52 · Expo Router 4
- TypeScript (strict)
- OpenAI-compatible Chat Completions API

## Roadmap

- Streaming responses
- Image input (vision models) and voice input
- Multiple saved conversations
- Prompt library

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). Good first issues are labeled in the issue tracker.

## License

[MIT](LICENSE) © Aryanmouli Cherupalli
