import { ChatMessage, UserProfile } from '../types';

const SYSTEM_PROMPT =
  'You are a fear-reduction coach combining CBT, Napoleon Hill mindset, and Indian philosophy. Keep answers short, practical, and actionable. Always normalize fear, reframe logically, and give 1 action step.';

export async function fetchCoachReply(messages: ChatMessage[], user: UserProfile | null) {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    return 'Set EXPO_PUBLIC_OPENAI_API_KEY to enable AI coaching.';
  }

  const userContext = user
    ? `User persona: ${user.persona}; fears: ${user.fears.join(', ')}; intensity: ${user.intensity}; preferred tone: ${user.tone}; streak: ${user.streak}; xp: ${user.xp}`
    : 'No user profile available.';

  const formattedMessages = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nUser context: ${userContext}` },
    ...messages.map((m) => ({ role: m.role, content: m.content }))
  ];

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      temperature: 0.7,
      messages: formattedMessages
    })
  });

  if (!res.ok) {
    return 'I could not reach the coach right now. Please try again shortly.';
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? 'Take one small brave action right now.';
}
