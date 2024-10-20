import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen.js';
import ShortlistScreen from '../screens/ShortlistScreen.js';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
     <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Popular Movies') {
              iconName = focused ? 'film' : 'film-outline';  // Ionicons icon name for movie
            } else if (route.name === 'Shortlisted Movies') {
              iconName = focused ? 'heart' : 'heart-outline'; // Icon for shortlisted movies
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#f4511e', // Customize active tab color
          tabBarInactiveTintColor: 'gray',  // Customize inactive tab color
          tabBarStyle: {
            backgroundColor: '#fff',        // Background color of tab bar
            borderTopWidth: 0,              // Remove top border for a cleaner look
            elevation: 5,                   // Add shadow for elevation effect
            height: 60,                     // Increase height for better spacing
          },
          tabBarLabelStyle: {
            fontSize: 12,                   // Customize font size
            fontWeight: 'bold',             // Make labels bold
            marginBottom: 5,                // Add margin for better spacing
          },
        })}
      >
        <Tab.Screen name="Popular Movies" component={HomeScreen} />
        <Tab.Screen name="Shortlisted Movies" component={ShortlistScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
