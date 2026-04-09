import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card } from '../components/Card';
import { AppText } from '../components/AppText';
import { colors } from '../theme/colors';
import { useAppData } from '../context/AppDataContext';

export function ProgressScreen() {
  const { width } = useWindowDimensions();
  const { sessions } = useAppData();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <AppText style={styles.title}>Fear Score Trend</AppText>
        <LineChart
          width={Math.max(width - 60, 300)}
          height={220}
          data={{ labels: sessions.map((s) => s.date), datasets: [{ data: sessions.map((s) => s.fearScore) }] }}
          yAxisSuffix=""
          withVerticalLabels
          chartConfig={{
            backgroundGradientFrom: colors.card,
            backgroundGradientTo: colors.card,
            decimalPlaces: 0,
            color: () => colors.accent,
            labelColor: () => colors.textMuted
          }}
          bezier
          style={{ borderRadius: 12 }}
        />
      </Card>
      <Card>
        <AppText style={styles.title}>Sessions Logged</AppText>
        <AppText>{sessions.length} sessions</AppText>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { marginBottom: 8, color: colors.textMuted }
});
