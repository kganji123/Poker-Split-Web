import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { AuthScreen } from '../screens/AuthScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ChallengeScreen } from '../screens/ChallengeScreen';
import { AiChatScreen } from '../screens/AiChatScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AwarenessScreen } from '../screens/AwarenessScreen';
import { GuidedSessionScreen } from '../screens/GuidedSessionScreen';
import { EmergencyScreen } from '../screens/EmergencyScreen';
import { useAppData } from '../context/AppDataContext';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: 'home-outline',
            Challenge: 'flag-outline',
            AI: 'chatbubbles-outline',
            Progress: 'stats-chart-outline',
            Profile: 'person-outline'
          };
          return <Ionicons name={iconMap[route.name]} color={color} size={size} />;
        }
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Challenge" component={ChallengeScreen} />
      <Tabs.Screen name="AI" component={AiChatScreen} />
      <Tabs.Screen name="Progress" component={ProgressScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const { user } = useAuth();
  const { profile } = useAppData();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: colors.bg, card: colors.card, text: colors.text, border: colors.border }
      }}
    >
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.bg }, headerTintColor: colors.text }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        ) : !profile ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ title: 'Welcome' }} />
        ) : (
          <>
            <Stack.Screen name="Main" component={AppTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Awareness" component={AwarenessScreen} />
            <Stack.Screen name="Guided Session" component={GuidedSessionScreen} />
            <Stack.Screen name="Emergency" component={EmergencyScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
