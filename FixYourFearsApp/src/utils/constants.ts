import { ChallengeTask } from '../types';

export const FEAR_OPTIONS = [
  'Public speaking',
  'Failure',
  'Rejection',
  'Social anxiety',
  'Heights',
  'Career pressure',
  'Health anxiety',
  'Money insecurity'
];

export const CHALLENGE_TASKS: ChallengeTask[] = Array.from({ length: 10 }).flatMap((_, i) => {
  const level = i + 1;
  return [
    { id: `L${level}-1`, level, title: `Level ${level}: 5-minute fear journal`, done: false, xp: 10 + level },
    { id: `L${level}-2`, level, title: `Level ${level}: One micro exposure step`, done: false, xp: 15 + level },
    { id: `L${level}-3`, level, title: `Level ${level}: Reflection + reframe`, done: false, xp: 20 + level }
  ];
});

export const DAILY_QUOTES = [
  'Courage grows when action follows fear.',
  'Your mind is trained by repeated thought; choose deliberate thought.',
  'Fear fades when purpose becomes louder than doubt.'
];
