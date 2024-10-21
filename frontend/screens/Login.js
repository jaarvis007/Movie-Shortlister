import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setShortlistedMovies } from '../redux/actions'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://172.29.37.83:3000/api/login', {
        email,
        password,
      });

      await AsyncStorage.setItem('user', JSON.stringify(response.data.user)); 

     
      const userId = response.data.user.id; 
      const moviesResponse = await axios.get(`http://172.29.37.83:3000/api/user/${userId}/shortlisted-movies`);
      console.log(moviesResponse.data.shortlistedMovies);

     
      dispatch(setShortlistedMovies(moviesResponse.data.shortlistedMovies));

      console.log("Login Successful");
      navigation.navigate("app"); 
    } catch (error) {
      console.log(error);
      Alert.alert("Login failed", error.response?.data.message || 'Please try again.'); // Error alert
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Movie-Shortlister</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        <View style={styles.buttonSpacer} />
        <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%', 
  },
  buttonSpacer: {
    width: 10, 
  },
  
  appName: {
    fontSize: 36, 
    fontWeight: 'bold',
    marginBottom: 40, 
    color: '#0000FF',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff', 
  },
});

export default LoginScreen;
