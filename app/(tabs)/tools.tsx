import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { explainCode, rewrite, summarize } from '@/lib/ai';
import { useSettings } from '@/lib/settings-context';
import { theme } from '@/lib/theme';
import type { RewriteMode, ToolKind } from '@/lib/types';

const TOOLS: Array<{ kind: ToolKind; label: string; placeholder: string }> = [
  { kind: 'summarize', label: 'Summarize', placeholder: 'Paste the text to summarize…' },
  { kind: 'rewrite', label: 'Rewrite', placeholder: 'Paste the text to rewrite…' },
  { kind: 'explain', label: 'Explain code', placeholder: 'Paste the code to explain…' },
];

const REWRITE_MODES: Array<{ mode: RewriteMode; label: string }> = [
  { mode: 'formal', label: 'Formal' },
  { mode: 'casual', label: 'Casual' },
  { mode: 'shorter', label: 'Shorter' },
];

export default function ToolsScreen() {
  const { settings } = useSettings();
  const [tool, setTool] = useState<ToolKind>('summarize');
  const [rewriteMode, setRewriteMode] = useState<RewriteMode>('formal');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const activeTool = TOOLS.find((t) => t.kind === tool) ?? TOOLS[0];

  const run = async () => {
    const text = input.trim();
    if (!text || running) return;
    setRunning(true);
    setError(null);
    setResult(null);
    try {
      const output =
        tool === 'summarize'
          ? await summarize(text, settings)
          : tool === 'rewrite'
            ? await rewrite(text, rewriteMode, settings)
            : await explainCode(text, settings);
      setResult(output);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setRunning(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.chipRow}>
        {TOOLS.map((t) => (
          <TouchableOpacity
            key={t.kind}
            style={[styles.chip, tool === t.kind && styles.chipActive]}
            onPress={() => setTool(t.kind)}
          >
            <Text style={[styles.chipText, tool === t.kind && styles.chipTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tool === 'rewrite' ? (
        <View style={styles.chipRow}>
          {REWRITE_MODES.map((m) => (
            <TouchableOpacity
              key={m.mode}
              style={[styles.chipSmall, rewriteMode === m.mode && styles.chipActive]}
              onPress={() => setRewriteMode(m.mode)}
            >
              <Text style={[styles.chipText, rewriteMode === m.mode && styles.chipTextActive]}>
                {m.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder={activeTool.placeholder}
        placeholderTextColor={theme.muted}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={[styles.runButton, (!input.trim() || running) && styles.runButtonDisabled]}
        onPress={run}
        disabled={!input.trim() || running}
      >
        {running ? (
          <ActivityIndicator color={theme.accentText} />
        ) : (
          <Text style={styles.runText}>Run {activeTool.label}</Text>
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {result ? (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Result</Text>
            <TouchableOpacity onPress={() => Share.share({ message: result })}>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.resultText} selectable>
            {result}
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  content: { padding: 16, gap: 12 },
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: theme.surface,
  },
  chipSmall: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: theme.surface,
  },
  chipActive: { backgroundColor: theme.accent, borderColor: theme.accent },
  chipText: { color: theme.muted, fontWeight: '600', fontSize: 14 },
  chipTextActive: { color: theme.accentText },
  input: {
    minHeight: 150,
    color: theme.text,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    lineHeight: 21,
  },
  runButton: {
    backgroundColor: theme.accent,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  runButtonDisabled: { opacity: 0.45 },
  runText: { color: theme.accentText, fontWeight: '700', fontSize: 15 },
  error: { color: theme.danger, fontSize: 13 },
  resultCard: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resultTitle: { color: theme.text, fontWeight: '700', fontSize: 14 },
  shareText: { color: theme.accent, fontWeight: '600', fontSize: 13 },
  resultText: { color: theme.text, fontSize: 15, lineHeight: 22 },
});
