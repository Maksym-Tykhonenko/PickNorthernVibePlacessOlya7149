import React from 'react';
import OnboardingSlide from './OnboardingsSlide';

export default function OnboardingScreen4({ navigation }: any) {
  const skip = () => navigation.getParent()?.replace('Main');
  return (
    <OnboardingSlide
      step={4} total={5}
      title="More than just places"
      description="In addition to the locations themselves, there are northern facts and a blog with atmospheric materials about the country, its nature and features."
      buttonLabel="Next"
      image={require('../../assets/onboarding_4.png')}
      onPress={() => navigation.navigate('Onboarding5')}
      onSkip={skip}
    />
  );
}