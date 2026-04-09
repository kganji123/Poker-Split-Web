import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { ChatMessage } from '../types';
import { fetchCoachReply } from '../services/openai';
import { useAppData } from '../context/AppDataContext';

export function AiChatScreen() {
  const { profile } = useAppData();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Fear is normal. Tell me one fear you are facing now, and I will give one practical next step.',
      createdAt: Date.now()
    }
  ]);

  const send = async () => {
    if (!input.trim()) {
      return;
    }
    const userMsg: ChatMessage = { id: String(Date.now()), role: 'user', content: input.trim(), createdAt: Date.now() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');

    const reply = await fetchCoachReply(next, profile);
    setMessages((prev) => [...prev, { id: `${Date.now()}-ai`, role: 'assistant', content: reply, createdAt: Date.now() }]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Card style={[styles.msg, item.role === 'user' ? styles.userCard : styles.aiCard]}>
            <AppText>{item.content}</AppText>
          </Card>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput value={input} onChangeText={setInput} placeholder="Type your fear..." placeholderTextColor={colors.textMuted} style={styles.input} />
        <PrimaryButton title="Send" onPress={send} style={{ width: 80 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  msg: { marginBottom: 8 },
  userCard: { backgroundColor: '#1D2D5E' },
  aiCard: { backgroundColor: colors.card },
  inputRow: { padding: 12, flexDirection: 'row', gap: 8, borderTopWidth: 1, borderColor: colors.border },
  input: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 10, color: colors.text, paddingHorizontal: 10 }
});
