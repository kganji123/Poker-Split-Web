import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ChallengeTask, SessionRecord, UserProfile } from '../types';
import { CHALLENGE_TASKS } from '../utils/constants';
import { useAuth } from './AuthContext';
import { fetchProgress, fetchUserProfile, saveProgress, saveUserProfile } from '../services/firestoreData';

interface AppDataContextType {
  profile: UserProfile | null;
  sessions: SessionRecord[];
  tasks: ChallengeTask[];
  setProfile: (profile: UserProfile) => void;
  addSession: (session: SessionRecord) => void;
  toggleTask: (id: string) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const starterSessions: SessionRecord[] = [
  { date: 'Mon', fearScore: 8, minutes: 8 },
  { date: 'Tue', fearScore: 7, minutes: 9 },
  { date: 'Wed', fearScore: 6, minutes: 12 },
  { date: 'Thu', fearScore: 6, minutes: 10 },
  { date: 'Fri', fearScore: 5, minutes: 15 }
];

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [sessions, setSessions] = useState<SessionRecord[]>(starterSessions);
  const [tasks, setTasks] = useState<ChallengeTask[]>(CHALLENGE_TASKS);

  useEffect(() => {
    const load = async () => {
      if (!user?.uid) {
        setProfileState(null);
        setSessions(starterSessions);
        setTasks(CHALLENGE_TASKS);
        return;
      }
      const [userProfile, progress] = await Promise.all([fetchUserProfile(user.uid), fetchProgress(user.uid)]);
      setProfileState(userProfile);
      if (progress?.sessions?.length) {
        setSessions(progress.sessions);
      }
      if (progress?.tasks?.length) {
        setTasks(progress.tasks);
      }
    };
    load().catch(() => undefined);
  }, [user?.uid]);

  useEffect(() => {
    if (profile?.id) {
      saveUserProfile(profile).catch(() => undefined);
    }
  }, [profile]);

  useEffect(() => {
    if (user?.uid) {
      saveProgress(user.uid, sessions, tasks).catch(() => undefined);
    }
  }, [sessions, tasks, user?.uid]);

  const value = useMemo(
    () => ({
      profile,
      sessions,
      tasks,
      setProfile: (next: UserProfile) => setProfileState(next),
      addSession: (session: SessionRecord) => setSessions((prev) => [...prev, session]),
      toggleTask: (id: string) =>
        setTasks((prev) =>
          prev.map((task) => {
            if (task.id !== id) {
              return task;
            }
            return { ...task, done: !task.done };
          })
        )
    }),
    [profile, sessions, tasks]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error('useAppData must be used inside AppDataProvider');
  }
  return ctx;
}
