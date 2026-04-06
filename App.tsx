import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { SavedProvider } from './src/context/SavedContext';

export default function App() {
  return (
    <SavedProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SavedProvider>
  );
}