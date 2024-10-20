import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/Login';
import Signup from './screens/Signup';


console.log(store);
// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    // <LoginScreen/>
    // <Signup/>

    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
