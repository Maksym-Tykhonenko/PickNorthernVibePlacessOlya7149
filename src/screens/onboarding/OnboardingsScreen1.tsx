import React from 'react';
import OnboardingSlide from './OnboardingsSlide';

export default function OnboardingScreen1({ navigation }: any) {
  const skip = () => navigation.getParent()?.replace('Main');
  return (
    <OnboardingSlide
      step={1} total={5}
      title="Hi, I'm Leia"
      description="I'll help you discover places in Canada without unnecessary noise and complicated actions. You just open the app and see what resonates right now."
      buttonLabel="Hello, Leia"
      image={require('../../assets/onboarding_1.png')}
      onPress={() => navigation.navigate('Onboarding2')}
      onSkip={skip}
    />
  );
}