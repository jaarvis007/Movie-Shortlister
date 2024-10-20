import React from 'react';
import { Button, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MovieList from '../components/MovieList';

const HomeScreen = () => {
  return (
    <>
     <GestureHandlerRootView style={{ flex: 1 }}>
      <MovieList />
    </GestureHandlerRootView>
  
    </>
   
  );
};

export default HomeScreen;
