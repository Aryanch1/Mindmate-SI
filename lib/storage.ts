import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_SETTINGS, type AiSettings, type ChatMessage } from './types';

const SETTINGS_KEY = 'mindmate.settings.v1';
const CHAT_KEY = 'mindmate.chat.v1';

export async function loadSettings(): Promise<AiSettings> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<AiSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: AiSettings): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function loadChat(): Promise<ChatMessage[]> {
  try {
    const raw = await AsyncStorage.getItem(CHAT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveChat(messages: ChatMessage[]): Promise<void> {
  await AsyncStorage.setItem(CHAT_KEY, JSON.stringify(messages));
}

export async function clearChat(): Promise<void> {
  await AsyncStorage.removeItem(CHAT_KEY);
}
