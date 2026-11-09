import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useSettings } from '@/lib/settings-context';
import { theme } from '@/lib/theme';

export default function SettingsScreen() {
  const { settings, loaded, update } = useSettings();
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [model, setModel] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loaded) {
      setApiKey(settings.apiKey);
      setBaseUrl(settings.baseUrl);
      setModel(settings.model);
    }
    // Only sync the form when settings first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const save = async () => {
    await update({
      apiKey: apiKey.trim(),
      baseUrl: baseUrl.trim() || 'https://generativelanguage.googleapis.com/v1beta/openai/',
      model: model.trim() || 'gemini-3.5-flash-lite',
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.label}>Demo mode</Text>
          <Text style={styles.hint}>
            Replies are generated on-device. Turn off for live AI — the web version is live automatically; the mobile app uses your API key below.
          </Text>
        </View>
        <Switch
          value={settings.demoMode}
          onValueChange={(v) => update({ demoMode: v })}
          trackColor={{ true: theme.accent, false: theme.surfaceAlt }}
        />
      </View>

      <Text style={styles.label}>API key</Text>
      <TextInput
        style={styles.input}
        value={apiKey}
        onChangeText={setApiKey}
        placeholder="sk-…"
        placeholderTextColor={theme.muted}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.hint}>
        Bring your own key from any OpenAI-compatible provider. It is stored only on this device
        and sent only to the base URL below — MindMate has no server.
      </Text>

      <Text style={styles.label}>API base URL</Text>
      <TextInput
        style={styles.input}
        value={baseUrl}
        onChangeText={setBaseUrl}
        placeholder="https://generativelanguage.googleapis.com/v1beta/openai/"
        placeholderTextColor={theme.muted}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.label}>Model</Text>
      <TextInput
        style={styles.input}
        value={model}
        onChangeText={setModel}
        placeholder="gemini-3.5-flash-lite"
        placeholderTextColor={theme.muted}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity style={styles.saveButton} onPress={save}>
        <Text style={styles.saveText}>{saved ? 'Saved ✓' : 'Save settings'}</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        MindMate AI is open source (MIT). Contributions are welcome — see the project repository.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  content: { padding: 16, gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  rowText: { flex: 1, gap: 4 },
  label: { color: theme.text, fontWeight: '700', fontSize: 15, marginTop: 8 },
  hint: { color: theme.muted, fontSize: 13, lineHeight: 18 },
  input: {
    color: theme.text,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: theme.accent,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: { color: theme.accentText, fontWeight: '700', fontSize: 15 },
  footer: { color: theme.muted, fontSize: 12, marginTop: 16, lineHeight: 17 },
});
