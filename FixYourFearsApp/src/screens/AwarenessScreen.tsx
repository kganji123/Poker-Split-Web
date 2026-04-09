import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';
import { useAppData } from '../context/AppDataContext';

export function AwarenessScreen() {
  const { profile } = useAppData();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <AppText style={styles.title}>Fear Statistics</AppText>
        <AppText>Current intensity: {profile?.intensity ?? 0}/10</AppText>
        <AppText>Main triggers: {profile?.fears.join(', ')}</AppText>
      </Card>
      <Card>
        <AppText style={styles.title}>Explanation</AppText>
        <AppText>
          Fear is a protective response from your nervous system. It becomes unhelpful when the signal is stronger than actual risk. Repeated small exposure retrains the alarm.
        </AppText>
      </Card>
      <Card>
        <AppText style={styles.title}>Quote</AppText>
        <AppText>“Strength does not come from what you can do; it comes from overcoming what you once feared.”</AppText>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8 }
});
