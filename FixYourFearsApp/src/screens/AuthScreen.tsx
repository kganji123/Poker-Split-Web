import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { AppText } from '../components/AppText';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { signInWithGoogleToken } from '../services/firebase';

WebBrowser.maybeCompleteAuthSession();

export function AuthScreen() {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
  });

  useEffect(() => {
    const handle = async () => {
      if (response?.type === 'success' && response.params.id_token) {
        await signInWithGoogleToken(response.params.id_token);
      }
    };
    handle().catch((e) => Alert.alert('Google login error', e.message));
  }, [response]);

  const run = async (mode: 'login' | 'register') => {
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      Alert.alert('Auth error', (err as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Fix Your Fears</AppText>
      <Card>
        <TextInput placeholder="Email" placeholderTextColor={colors.textMuted} style={styles.input} value={email} onChangeText={setEmail} />
        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <PrimaryButton title="Login" onPress={() => run('login')} />
        <PrimaryButton title="Create Account" onPress={() => run('register')} style={{ marginTop: 10 }} />
        <PrimaryButton
          title="Continue with Google"
          onPress={() => promptAsync()}
          style={{ marginTop: 10, backgroundColor: colors.cardSoft, opacity: request ? 1 : 0.6 }}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: colors.bg },
  title: { fontSize: 32, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    color: colors.text,
    borderRadius: 10,
    marginBottom: 12,
    padding: 12
  }
});
