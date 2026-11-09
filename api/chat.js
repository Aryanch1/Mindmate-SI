/**
 * Hosted chat endpoint for the MindMate web version (Vercel serverless
 * function). Holds the Gemini API key server-side in the GEMINI_API_KEY
 * environment variable so the public web app can answer with live AI
 * without visitors ever seeing or entering a key.
 *
 * The app (lib/ai.ts) posts { messages } here; the response is passed
 * through in OpenAI chat-completions shape.
 */

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
const MODEL = 'gemini-3.5-flash-lite';
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 8000;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: { message: 'Method not allowed' } });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(501).json({ error: { message: 'Hosted AI is not configured' } });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }
  const incoming = Array.isArray(body?.messages) ? body.messages : [];
  const messages = incoming
    .filter(
      (m) =>
        m &&
        typeof m.content === 'string' &&
        (m.role === 'system' || m.role === 'user' || m.role === 'assistant'),
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS_PER_MESSAGE) }));
  if (messages.length === 0) {
    res.status(400).json({ error: { message: 'No messages provided' } });
    return;
  }

  try {
    const upstream = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({ model: MODEL, messages, temperature: 0.7 }),
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', 'application/json');
    res.send(text);
  } catch {
    res.status(502).json({ error: { message: 'Upstream request failed' } });
  }
}
