import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MessageBubble } from '@/components/MessageBubble';
import { chatCompletion } from '@/lib/ai';
import { useSettings } from '@/lib/settings-context';
import { clearChat, loadChat, saveChat } from '@/lib/storage';
import { theme } from '@/lib/theme';
import type { ChatMessage } from '@/lib/types';

function newId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi, I'm MindMate. Ask me anything, or try the AI Tools tab to summarize text, rewrite it, or explain code.",
  createdAt: 0,
};

export default function ChatScreen() {
  const { settings, loaded } = useSettings();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    loadChat().then((stored) => setMessages(stored.length ? stored : [WELCOME]));
  }, []);

  useEffect(() => {
    if (messages.length && messages[0]?.id !== 'welcome') {
      void saveChat(messages);
    }
  }, [messages]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || sending) return;
    const userMessage: ChatMessage = {
      id: newId(),
      role: 'user',
      content: text,
      createdAt: Date.now(),
    };
    const history = [...messages.filter((m) => m.id !== 'welcome'), userMessage];
    setMessages([...history]);
    setInput('');
    setSending(true);
    setError(null);
    try {
      const reply = await chatCompletion(
        history.map((m) => ({ role: m.role, content: m.content })),
        settings,
      );
      setMessages([
        ...history,
        { id: newId(), role: 'assistant', content: reply, createdAt: Date.now() },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setSending(false);
    }
  }, [input, messages, sending, settings]);

  const reset = useCallback(async () => {
    await clearChat();
    setMessages([WELCOME]);
    setError(null);
  }, []);

  const inDemo = settings.demoMode || !settings.apiKey.trim();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          {inDemo ? 'Demo mode — replies are generated on-device' : `Live · ${settings.model}`}
        </Text>
        <TouchableOpacity onPress={reset} accessibilityLabel="Clear chat">
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {sending ? (
        <View style={styles.typingRow}>
          <ActivityIndicator color={theme.accent} size="small" />
          <Text style={styles.typingText}>MindMate is thinking…</Text>
        </View>
      ) : null}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder={loaded ? 'Message MindMate…' : 'Loading…'}
          placeholderTextColor={theme.muted}
          multiline
          editable={!sending}
          onSubmitEditing={send}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!input.trim() || sending) && styles.sendButtonDisabled]}
          onPress={send}
          disabled={!input.trim() || sending}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.border,
  },
  bannerText: { color: theme.muted, fontSize: 12 },
  clearText: { color: theme.accent, fontSize: 13, fontWeight: '600' },
  listContent: { paddingVertical: 12 },
  error: { color: theme.danger, paddingHorizontal: 16, paddingVertical: 6, fontSize: 13 },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  typingText: { color: theme.muted, fontSize: 13 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.border,
    backgroundColor: theme.surface,
  },
  input: {
    flex: 1,
    color: theme.text,
    backgroundColor: theme.surfaceAlt,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: theme.accent,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  sendButtonDisabled: { opacity: 0.45 },
  sendText: { color: theme.accentText, fontWeight: '700', fontSize: 15 },
});
