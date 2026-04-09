import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import { BreathingAnimation } from '../components/BreathingAnimation';
import { AppText } from '../components/AppText';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';

export function EmergencyScreen() {
  const trigger = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_113b7b57f4.mp3?filename=calm-meditation-30s-5875.mp3'
      });
      await sound.playAsync();
    } catch {
      Alert.alert('Emergency mode', 'Breathing animation started. Audio failed to load.');
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Emergency Calm Mode</AppText>
      <BreathingAnimation />
      <PrimaryButton title="Start Calming Audio" onPress={trigger} style={{ width: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 }
});
