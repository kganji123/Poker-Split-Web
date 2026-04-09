import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card } from '../components/Card';
import { AppText } from '../components/AppText';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';

export function ProfileScreen() {
  const { profile } = useAppData();
  const { logout } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <AppText style={styles.name}>{profile?.name}</AppText>
        <AppText>{profile?.email}</AppText>
        <AppText>Persona: {profile?.persona}</AppText>
        <AppText>Tone: {profile?.tone}</AppText>
      </Card>
      <Card>
        <AppText style={styles.title}>Achievements</AppText>
        {profile?.badges.length ? profile.badges.map((badge) => <AppText key={badge}>🏅 {badge}</AppText>) : <AppText>No badges yet.</AppText>}
      </Card>
      <Card>
        <AppText style={styles.title}>Preferences</AppText>
        <AppText>Fears: {profile?.fears.join(', ')}</AppText>
        <AppText>Intensity: {profile?.intensity}/10</AppText>
      </Card>
      <PrimaryButton title="Logout" onPress={logout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  name: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  title: { marginBottom: 8, color: colors.textMuted }
});
