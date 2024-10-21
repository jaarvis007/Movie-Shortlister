import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.js';
import ShortlistScreen from '../screens/ShortlistScreen.js';
import Profile from '../screens/Profile.js';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Popular Movies') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Shortlisted Movies') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Popular Movies" component={HomeScreen} />
      <Tab.Screen name="Shortlisted Movies" component={ShortlistScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
