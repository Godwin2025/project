import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './components/Navigation';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </>
  );
}