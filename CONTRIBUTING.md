# Contributing to MindMate AI

Thanks for your interest in contributing! This project is open to contributions of all kinds — bug reports, documentation, design ideas, and code.

## Getting set up

```bash
git clone https://github.com/Aryanch1/mindmate-ai.git
cd mindmate-ai
npm install
npx expo start
```

Before opening a pull request, make sure the TypeScript check passes:

```bash
npm run typecheck
```

## Guidelines

- Keep changes focused: one feature or fix per pull request.
- Write TypeScript in strict mode; avoid `any` unless there is no alternative.
- The app must keep working in **demo mode** with no API key — please don't add features that require a key to launch the app.
- Never commit API keys, `.env` files with secrets, or personal data.
- For UI changes, describe how you tested them (device or simulator, platform).

## Reporting bugs

Open an issue with:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Your platform (iOS/Android) and Expo Go or SDK version

## License

By contributing, you agree that your contributions will be licensed under the project's MIT license.
