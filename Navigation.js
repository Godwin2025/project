import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import VideoConsultationScreen from '../screens/VideoConsultationScreen';
import AppointmentBookingScreen from '../screens/AppointmentBookingScreen';
import HealthTrackingScreen from '../screens/HealthTrackingScreen';
import PrescriptionScreen from '../screens/PrescriptionScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Healthcare Dashboard' }} 
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ title: 'Details' }} 
        />
        <Stack.Screen 
          name="VideoConsultation" 
          component={VideoConsultationScreen} 
          options={{ title: 'Video Consultation' }} 
        />
        <Stack.Screen 
          name="AppointmentBooking" 
          component={AppointmentBookingScreen} 
          options={{ title: 'Book Appointment' }} 
        />
        <Stack.Screen 
          name="HealthTracking" 
          component={HealthTrackingScreen} 
          options={{ title: 'Health Tracking' }} 
        />
        <Stack.Screen 
          name="Prescriptions" 
          component={PrescriptionScreen} 
          options={{ title: 'Prescriptions' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;