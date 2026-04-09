import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card } from '../components/Card';
import { AppText } from '../components/AppText';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAppData } from '../context/AppDataContext';
import { DAILY_QUOTES } from '../utils/constants';
import { colors } from '../theme/colors';

export function HomeScreen({ navigation }: any) {
  const { profile, tasks } = useAppData();
  const done = tasks.filter((t) => t.done).length;
  const progress = Math.round((done / tasks.length) * 100);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <AppText style={styles.title}>Today&apos;s Fear</AppText>
        <AppText>{profile?.fears[0] ?? 'Fear of failure'}</AppText>
      </Card>
      <Card>
        <AppText style={styles.title}>Daily Challenge</AppText>
        <AppText>Take one tiny action where fear is present for 5 minutes.</AppText>
      </Card>
      <View style={styles.row}>
        <Card style={styles.half}>
          <AppText style={styles.title}>Streak</AppText>
          <AppText style={styles.big}>{profile?.streak ?? 0} days</AppText>
        </Card>
        <Card style={styles.half}>
          <AppText style={styles.title}>Progress</AppText>
          <AppText style={styles.big}>{progress}%</AppText>
        </Card>
      </View>
      <Card>
        <AppText style={styles.quote}>“{DAILY_QUOTES[new Date().getDate() % DAILY_QUOTES.length]}”</AppText>
      </Card>
      <PrimaryButton title="Awareness" onPress={() => navigation.navigate('Awareness')} />
      <PrimaryButton title="Guided Session" onPress={() => navigation.navigate('Guided Session')} style={{ marginTop: 10 }} />
      <PrimaryButton title="Emergency Mode" onPress={() => navigation.navigate('Emergency')} style={{ marginTop: 10, backgroundColor: colors.danger }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  row: { flexDirection: 'row', gap: 8 },
  half: { flex: 1 },
  title: { color: colors.textMuted, marginBottom: 6 },
  big: { fontSize: 22, fontWeight: '700' },
  quote: { fontStyle: 'italic' }
});
