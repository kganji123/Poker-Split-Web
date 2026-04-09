export type Persona = 'kid' | 'teen' | 'adult' | 'professional';
export type Tone = 'calm' | 'coach' | 'warrior';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  persona: Persona;
  fears: string[];
  intensity: number;
  tone: Tone;
  streak: number;
  xp: number;
  badges: string[];
}

export interface ChallengeTask {
  id: string;
  level: number;
  title: string;
  done: boolean;
  xp: number;
}

export interface SessionRecord {
  date: string;
  fearScore: number;
  minutes: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
}
