import React from 'react';
import OnboardingSlide from './OnboardingsSlide';

export default function OnboardingScreen3({ navigation }: any) {
  const skip = () => navigation.getParent()?.replace('Main');
  return (
    <OnboardingSlide
      step={3} total={5}
      title="Explore on the map"
      description="All places are marked on an interactive map so that you can see them in space and discover them in any order. You choose where to start and where to move on."
      buttonLabel="Continue"
      image={require('../../assets/onboarding_3.png')}
      onPress={() => navigation.navigate('Onboarding4')}
      onSkip={skip}
    />
  );
}