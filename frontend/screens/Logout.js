import React from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const Logout = () => {
  const navigation = useNavigation();
  const shortlistedMovies = useSelector((state) => state.shortlistedMovies); 

  const handleLogout = async () => {
    const userId = await AsyncStorage.getItem('user'); 

    user=JSON.parse(userId)
    console.log(user.id);
    console.log(shortlistedMovies);


    try {
      const response = await axios.post('http://172.29.37.83:3000/api/logout', {
        userId: user.id,
        shortlistedMovies: shortlistedMovies,
      });
      console.log(response.data.message);

      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('shortlistedMovies');

      navigation.navigate("Login");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Button
      title="Logout"
      onPress={handleLogout}
    />
  );
};
