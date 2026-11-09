export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: number;
}

export interface AiSettings {
  /** OpenAI-compatible API key. Stored only on the device. */
  apiKey: string;
  /** Base URL of an OpenAI-compatible API. */
  baseUrl: string;
  /** Model name sent with every request. */
  model: string;
  /** When true (or when no API key is set), replies come from the on-device demo engine. */
  demoMode: boolean;
}

export const DEFAULT_SETTINGS: AiSettings = {
  apiKey: '',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  model: 'gemini-3.5-flash-lite',
  demoMode: false,
};

export type RewriteMode = 'formal' | 'casual' | 'shorter';

export type ToolKind = 'summarize' | 'rewrite' | 'explain';
