import React from 'react';
import OnboardingSlide from './OnboardingsSlide';

export default function OnboardingScreen2({ navigation }: any) {
  const skip = () => navigation.getParent()?.replace('Main');
  return (
    <OnboardingSlide
      step={2} total={5}
      title="Choose a direction"
      description="The app collects different places — coasts, forests and urban spaces. Each location has a photo, exact coordinates and a detailed description."
      buttonLabel="Perfectly!"
      image={require('../../assets/onboarding_2.png')}
      onPress={() => navigation.navigate('Onboarding3')}
      onSkip={skip}
    />
  );
}