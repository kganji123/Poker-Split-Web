# Fix Your Fears (Expo + Firebase + OpenAI)

A mobile app for fear-reduction coaching with structured daily actions.

## Features
- Firebase Auth (Email/Password + Google)
- Onboarding for persona, fears, intensity, coaching tone
- Home dashboard with daily focus, streak, progress
- Awareness module (stats + explanation + quote)
- Guided breathing session with timer + audio
- Challenge ladder (levels 1-10) with XP tasks and badge-ready profile
- AI chat coach powered by OpenAI Chat Completions API
- Progress tracking with fear score graph
- Emergency calm mode with breathing animation + calming audio
- Profile with achievements + preference summary

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Add env vars in `.env`:
   - `EXPO_PUBLIC_FIREBASE_API_KEY`
   - `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
   - `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `EXPO_PUBLIC_FIREBASE_APP_ID`
   - `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`
   - `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID`
   - `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
   - `EXPO_PUBLIC_OPENAI_API_KEY`
3. Start:
   ```bash
   npm run start
   ```

## Navigation
Bottom tabs:
- Home
- Challenge
- AI
- Progress
- Profile

## Folder Structure
```
src/
  components/
  context/
  navigation/
  screens/
  services/
  theme/
  types/
  utils/
```
