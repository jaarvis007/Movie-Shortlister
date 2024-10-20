import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../api/movieApi';
import MovieCard from './MovieCard';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const MovieList = () => {
  const dispatch = useDispatch();

  // Updated useQuery call
  const { data, error, isLoading } = useQuery({
    queryKey: ['movies'], 
    queryFn: fetchMovies, 
  });

  const handleShortlist = (movie) => {
    dispatch({ type: 'ADD_MOVIE', payload: movie });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching movies</Text>;

  // Check if data is not empty
  if (!data || data.length === 0) {
    return <Text>No movies available</Text>;
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard movie={item} onShortlist={handleShortlist} />
        )}
      />
    </View>
  );
};

export default MovieList;
