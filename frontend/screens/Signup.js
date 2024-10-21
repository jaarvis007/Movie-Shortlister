import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://172.29.37.83:3000/api/signup', {
        name,
        email,
        password
      });

      Alert.alert('Registration Successful');
      setError('');
      navigation.navigate('Login');
    } catch (err) {
      console.error(err);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Movie-Shortlister</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Signup" onPress={handleSignup} color="#007BFF" />
      <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', // Light gray background
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
    borderColor: '#007BFF', // Blue border
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff', // White background for inputs
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  loginLink: {
    marginTop: 20,
    color: '#007BFF', // Blue text for the login link
    textDecorationLine: 'underline',
  },
});

export default Signup;
