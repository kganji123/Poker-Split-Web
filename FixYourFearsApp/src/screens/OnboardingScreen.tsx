import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { FEAR_OPTIONS } from '../utils/constants';
import { Persona, Tone } from '../types';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';

export function OnboardingScreen() {
  const { user } = useAuth();
  const { setProfile } = useAppData();
  const [name, setName] = useState('');
  const [persona, setPersona] = useState<Persona>('adult');
  const [fears, setFears] = useState<string[]>(['Failure']);
  const [intensity, setIntensity] = useState(5);
  const [tone, setTone] = useState<Tone>('calm');

  const toggleFear = (fear: string) => {
    setFears((prev) => (prev.includes(fear) ? prev.filter((f) => f !== fear) : [...prev, fear]));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <AppText style={styles.title}>Set up your fear-reduction plan</AppText>
      <Card>
        <AppText>Name</AppText>
        <TextInput placeholder="Your name" placeholderTextColor={colors.textMuted} style={styles.input} value={name} onChangeText={setName} />
      </Card>
      <Card>
        <AppText style={styles.label}>Persona</AppText>
        <View style={styles.row}>{(['kid', 'teen', 'adult', 'professional'] as Persona[]).map((item) => chip(item, persona, setPersona))}</View>
      </Card>
      <Card>
        <AppText style={styles.label}>Fears</AppText>
        <View style={styles.rowWrap}>{FEAR_OPTIONS.map((fear) => multiChip(fear, fears.includes(fear), () => toggleFear(fear)))}</View>
      </Card>
      <Card>
        <AppText style={styles.label}>Intensity (1–10)</AppText>
        <View style={styles.row}>{Array.from({ length: 10 }).map((_, i) => chip(String(i + 1), intensity, setIntensity))}</View>
      </Card>
      <Card>
        <AppText style={styles.label}>Tone</AppText>
        <View style={styles.row}>{(['calm', 'coach', 'warrior'] as Tone[]).map((t) => chip(t, tone, setTone))}</View>
      </Card>
      <PrimaryButton
        title="Finish Onboarding"
        onPress={() =>
          setProfile({
            id: user?.uid ?? 'local',
            email: user?.email ?? '',
            name: name || 'Brave User',
            persona,
            fears,
            intensity,
            tone,
            streak: 1,
            xp: 0,
            badges: []
          })
        }
      />
    </ScrollView>
  );
}

function chip<T>(item: T, current: T, setter: (v: T) => void) {
  const selected = item === current;
  return (
    <Pressable key={String(item)} style={[styles.chip, selected && styles.chipSelected]} onPress={() => setter(item)}>
      <AppText style={selected ? styles.selectedText : undefined}>{String(item)}</AppText>
    </Pressable>
  );
}

function multiChip(item: string, selected: boolean, onPress: () => void) {
  return (
    <Pressable key={item} style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      <AppText style={selected ? styles.selectedText : undefined}>{item}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  input: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.border,
    borderWidth: 1,
    color: colors.text,
    borderRadius: 10,
    padding: 12,
    marginTop: 8
  },
  label: { marginBottom: 8, color: colors.textMuted },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: 999, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 10, paddingVertical: 6, marginBottom: 6 },
  chipSelected: { backgroundColor: colors.primary },
  selectedText: { color: '#08112B', fontWeight: '700' }
});
