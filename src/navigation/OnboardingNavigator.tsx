import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen1 from '../screens/onboarding/OnboardingsScreen1';
import OnboardingScreen2 from '../screens/onboarding/OnboardingsScreen2';
import OnboardingScreen3 from '../screens/onboarding/OnboardingsScreen3';
import OnboardingScreen4 from '../screens/onboarding/OnboardingsScreen4';
import OnboardingScreen5 from '../screens/onboarding/OnboardingsScreen5';

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
      <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
      <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
      <Stack.Screen name="Onboarding4" component={OnboardingScreen4} />
      <Stack.Screen name="Onboarding5" component={OnboardingScreen5} />
    </Stack.Navigator>
  );
}