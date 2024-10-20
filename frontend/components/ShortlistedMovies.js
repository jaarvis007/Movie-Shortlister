import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { useDispatch } from 'react-redux';
import ShortlistMovieCard from './ShortlistMovieCard';

const ShortlistedMovies = () => {
  const dispatch = useDispatch();
  const shortlistedMovies = useSelector((state) => state.shortlistedMovies);

  const handleShortlist = (movie) => {
    dispatch({ type: 'REMOVE_MOVIE', payload: movie });
  };

  if (!shortlistedMovies || shortlistedMovies.length === 0) {
    return <Text>No Shortlist Movies..</Text>;
  }

  return (
    <View>
      <FlatList
        data={shortlistedMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ShortlistMovieCard movie={item} onShortlist={handleShortlist} />
        )}
      />
    </View>
  );
};

export default ShortlistedMovies;
