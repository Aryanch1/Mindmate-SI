import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { SettingsProvider } from '@/lib/settings-context';

export default function RootLayout() {
  return (
    <SettingsProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SettingsProvider>
  );
}
