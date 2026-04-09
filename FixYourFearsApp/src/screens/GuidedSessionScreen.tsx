import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import { BreathingAnimation } from '../components/BreathingAnimation';
import { AppText } from '../components/AppText';
import { PrimaryButton } from '../components/PrimaryButton';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';

export function GuidedSessionScreen() {
  const [seconds, setSeconds] = useState(180);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const playAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: 'https://cdn.pixabay.com/download/audio/2022/10/30/audio_5342d5f8a0.mp3?filename=meditation-ambient-114064.mp3'
      });
      await sound.playAsync();
    } catch {
      Alert.alert('Audio unavailable', 'Could not play calming audio in this environment.');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={{ width: '100%' }}>
        <AppText style={styles.timer}>Timer: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</AppText>
      </Card>
      <BreathingAnimation />
      <PrimaryButton title="Play Guided Audio" onPress={playAudio} style={{ width: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, alignItems: 'center', justifyContent: 'center' },
  timer: { textAlign: 'center', fontSize: 28, fontWeight: '700' }
});
