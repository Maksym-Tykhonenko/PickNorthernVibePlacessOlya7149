import React from 'react';
import { CommonActions } from '@react-navigation/native';
import OnboardingSlide from './OnboardingsSlide';

export default function OnboardingScreen5({ navigation }: any) {
  const goMain = () =>
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Main' }] }));
  return (
    <OnboardingSlide
      step={5} total={5}
      title="Try your direction"
      description="I have prepared a 20-question quiz for you that will help you pay attention to details and better understand different places."
      buttonLabel="Let's start"
      image={require('../../assets/onboarding_5.png')}
      onPress={goMain}
      onSkip={goMain}
    />
  );
}