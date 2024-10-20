import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ShortlistMovieCard = ({ movie, onShortlist }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.movieImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview} numberOfLines={3}>{movie.overview}</Text>
        <Button title="Remove" onPress={() => onShortlist(movie)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  movieImage: {
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  overview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
});

export default ShortlistMovieCard;
