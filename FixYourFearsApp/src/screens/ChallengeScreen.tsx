import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';
import { useAppData } from '../context/AppDataContext';

export function ChallengeScreen() {
  const { tasks, toggleTask } = useAppData();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {tasks.map((task) => (
        <Pressable key={task.id} onPress={() => toggleTask(task.id)}>
          <Card style={task.done ? styles.done : undefined}>
            <AppText style={styles.level}>Level {task.level}</AppText>
            <AppText>{task.title}</AppText>
            <AppText style={styles.xp}>+{task.xp} XP</AppText>
          </Card>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  done: { borderColor: colors.success, backgroundColor: '#10261C' },
  level: { color: colors.accent, marginBottom: 4 },
  xp: { marginTop: 8, color: colors.textMuted }
});
