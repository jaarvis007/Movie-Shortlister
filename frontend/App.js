import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/Login';
import Signup from './screens/Signup';
import { Logout } from './screens/Logout';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      
        <NavigationContainer>
          <Stack.Navigator initialRouteName={isLoggedIn ? "app" : "Login"}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Logout" component={Logout} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="app" component={AppNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
