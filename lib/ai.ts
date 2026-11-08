import type { AiSettings, ChatMessage, RewriteMode } from './types';

/**
 * AI client for MindMate.
 *
 * Talks to any OpenAI-compatible chat-completions endpoint using the
 * user's own API key (bring your own key — nothing is proxied through
 * a MindMate server, because there isn't one).
 *
 * When demo mode is on, or no API key is configured, replies are
 * produced by a small on-device demo engine so the app is fully
 * explorable without a key.
 */

const SYSTEM_PROMPT =
  'You are MindMate, a concise and helpful AI assistant inside a mobile app. ' +
  'Answer clearly, use short paragraphs, and prefer plain language.';

interface ChatCompletionResponse {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
}

export async function chatCompletion(
  messages: Pick<ChatMessage, 'role' | 'content'>[],
  settings: AiSettings,
): Promise<string> {
  if (settings.demoMode || !settings.apiKey.trim()) {
    return demoReply(messages);
  }

  const url = `${settings.baseUrl.replace(/\/+$/, '')}/chat/completions`;
  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${settings.apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: settings.model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
      }),
    });
  } catch {
    throw new Error('Network request failed. Check your connection and the API base URL in Settings.');
  }

  const data = (await response.json().catch(() => ({}))) as ChatCompletionResponse;
  if (!response.ok) {
    throw new Error(data.error?.message ?? `API request failed with status ${response.status}.`);
  }
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error('The API returned an empty response.');
  }
  return content;
}

export function summarize(text: string, settings: AiSettings): Promise<string> {
  return chatCompletion(
    [
      {
        role: 'user',
        content:
          'Summarize the following text in at most 5 bullet points, keeping the key facts and numbers:\n\n' +
          text,
      },
    ],
    settings,
  );
}

export function rewrite(text: string, mode: RewriteMode, settings: AiSettings): Promise<string> {
  const instruction =
    mode === 'formal'
      ? 'Rewrite the following text in a professional, formal tone. Return only the rewritten text.'
      : mode === 'casual'
        ? 'Rewrite the following text in a friendly, casual tone. Return only the rewritten text.'
        : 'Rewrite the following text to be as short as possible while keeping its meaning. Return only the rewritten text.';
  return chatCompletion([{ role: 'user', content: `${instruction}\n\n${text}` }], settings);
}

export function explainCode(code: string, settings: AiSettings): Promise<string> {
  return chatCompletion(
    [
      {
        role: 'user',
        content:
          'Explain what the following code does, step by step, in plain language. ' +
          'Mention its time and space complexity if it is an algorithm:\n\n' +
          code,
      },
    ],
    settings,
  );
}

/* ------------------------------------------------------------------ */
/* Demo engine: canned, deterministic replies so the app works with   */
/* no API key at all. It pattern-matches the last user message and    */
/* clearly labels itself as a demo in the UI.                         */
/* ------------------------------------------------------------------ */

function lastUserText(messages: Pick<ChatMessage, 'role' | 'content'>[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'user') return messages[i].content;
  }
  return '';
}

export function demoReply(messages: Pick<ChatMessage, 'role' | 'content'>[]): string {
  const text = lastUserText(messages);
  const lower = text.toLowerCase();

  if (/^(hi|hello|hey)\b/.test(lower)) {
    return "Hello! I'm MindMate running in demo mode. Add your own API key in Settings to get live AI answers — or keep exploring here. Try asking me to summarize something, or open the Tools tab.";
  }
  if (lower.includes('summarize') || lower.includes('summary')) {
    const body = text.replace(/summarize[:\s]*/i, '').trim();
    if (body.length > 40) {
      const sentences = body.split(/(?<=[.!?])\s+/).filter(Boolean);
      const bullets = sentences.slice(0, 3).map((s) => `• ${s.trim()}`);
      return `Here is a quick demo summary:\n${bullets.join('\n')}\n\n(Turn off demo mode with a real API key for a fuller summary.)`;
    }
    return 'Paste the text you want summarized after the word "summarize" and I will condense it — or use the Summarize tool in the Tools tab.';
  }
  if (lower.includes('joke')) {
    return 'Why do programmers prefer dark mode? Because light attracts bugs. (Demo mode has a limited joke budget.)';
  }
  if (lower.includes('who are you') || lower.includes('your name')) {
    return "I'm MindMate, an open-source AI assistant app. Right now you're talking to my built-in demo engine — connect an API key in Settings to talk to a real model.";
  }
  if (lower.includes('thank')) {
    return "You're welcome! Anything else you'd like to try — a summary, a rewrite, or a code explanation?";
  }
  return [
    `You said: "${text.length > 120 ? `${text.slice(0, 120)}…` : text}"`,
    '',
    "This is a demo reply — MindMate isn't connected to a live model yet. Add an OpenAI-compatible API key in Settings and turn off demo mode to get real answers to questions like this one.",
  ].join('\n');
}
