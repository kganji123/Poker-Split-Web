import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { ChallengeTask, SessionRecord, UserProfile } from '../types';

export async function fetchUserProfile(userId: string) {
  const ref = doc(db, 'users', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function saveUserProfile(profile: UserProfile) {
  const ref = doc(db, 'users', profile.id);
  await setDoc(ref, profile, { merge: true });
}

export async function fetchProgress(userId: string): Promise<{ sessions: SessionRecord[]; tasks: ChallengeTask[] } | null> {
  const ref = doc(db, 'progress', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as { sessions: SessionRecord[]; tasks: ChallengeTask[] }) : null;
}

export async function saveProgress(userId: string, sessions: SessionRecord[], tasks: ChallengeTask[]) {
  const ref = doc(db, 'progress', userId);
  await setDoc(ref, { sessions, tasks }, { merge: true });
}

export async function updateFearScore(userId: string, fearScore: number) {
  const ref = doc(db, 'progress', userId);
  await updateDoc(ref, { fearScore });
}
