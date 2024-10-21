import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { Logout } from './Logout'; // Import the Logout component

const img = require('../assets/profile.png'); // Ensure the path is correct

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const shortlistedMovies = useSelector((state) => state.shortlistedMovies);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user'); // Change 'user' to your actual key
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserData(data);
    } catch (e) {
      console.error('Failed to fetch user data from AsyncStorage:', e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  console.log(userData);

  if (userData === null) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image 
          source={img} // Use the imported image directly
          style={styles.profilePicture} 
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <Text style={styles.shortlistedMovies}>
          Shortlisted Movies: {shortlistedMovies.length}
        </Text>
        
  
        {/* <TouchableOpacity style={styles.logoutButton} > */}
          <Logout/>
          {/* <Text style={styles.logoutButtonText}>Logout</Text> */}
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 30,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 25,
    color: '#555',
    marginBottom: 10,
  },
  shortlistedMovies: {
    fontSize: 20,
    color: '#333',
    marginBottom: 30, // Increased margin for better spacing
  },
  loadingText: {
    fontSize: 20,
    color: '#555',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#0096FF', // Tomato color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 3, // Adds a shadow effect
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
