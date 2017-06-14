'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

const apiKey = '0aaca111fb69dd26e45c61a2f9b23070';
const tmdbMovieApiBaseUri = 'https://api.themoviedb.org/3/movie';
const tmdbNowPlayingUri = `now_playing?api_key=${apiKey}&language=en-US&page=1`;
const tmdbMovieCreditsUri = `credits?api_key=${apiKey}`;
const tmdbImageUri = 'https://image.tmdb.org/t/p/w185';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return getNowPlayingMovies()
      .then((responseJson) => {
        const movieArray = responseJson.results;
        this.setState({
          nowPlayingDataArray: movieArray,
        });
        return Promise.all(movieArray.map(function (movie) {
          return getMovieCredits(movie.id);
        }))
      })
      .then((creditsArray) => {
        this.setState({
          isLoading: false,
          movieCreditsDataMap: getMovieCreditNamesMap(6, creditsArray),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <MovieList
        navigation={this.props.navigation}
        isLoading={this.state.isLoading}
        nowPlayingArray={this.state.nowPlayingDataArray}
        movieCreditsMap={this.state.movieCreditsDataMap}
      />
    );
  }
}

const MovieList = props => {
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderTitle}>
          Now Playing
        </Text>
      </View>
      {props.isLoading ? (
        <View style={{flex: 1, paddingTop: 40}}>
          <ActivityIndicator/>
        </View>
      ) : (
        <View style={styles.main}>
          <FlatList
            style={styles.flatList}
            data={props.nowPlayingArray}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => {
              return (
                <TouchableHighlight
                  onPress={() => navigate('MovieDetails', {movieDataJson: item})
                  }>
                  <View style={{flex: 1}}>
                    <MovieItem
                      name={item.title}
                      posterPath={item.poster_path}
                      crew={props.movieCreditsMap.get(item.id).crew}
                      cast={props.movieCreditsMap.get(item.id).cast}
                    />
                  </View>
                </TouchableHighlight>
              )
            }}
          />
        </View>
      )}
    </View>
  )
};

const MovieItem = props => {
  return (
    <View style={styles.movieItem}>
      <Image
        style={styles.posterImage}
        source={{uri: `${tmdbImageUri}/${props.posterPath}`}}
      />
      <View style={styles.movieItemContent}>
        <Text style={styles.movieItemTitle} numberOfLines={2}>{props.name}</Text>
        <Text style={styles.movieItemDetailHeader} numberOfLines={3}>Creators:&nbsp;
          <Text style={styles.movieItemText}>
            {/* TODO: These array items should not be static, but rather should
             be produced based on the actual number of items in the array*/}
            {props.crew[0]}, {props.crew[1]}, {props.crew[2]}, {props.crew[3]}, {props.crew[4]}, {props.crew[5]}
          </Text>
        </Text>
        <Text style={styles.movieItemDetailHeader} numberOfLines={3}>Actors:&nbsp;
          <Text style={styles.movieItemText}>
            {/* TODO: These array items should not be static, but rather should
             be produced based on the actual number of items in the array*/}
            {props.cast[0]}, {props.cast[1]}, {props.cast[2]}, {props.cast[3]}, {props.cast[4]}, {props.cast[5]}
          </Text>
        </Text>
      </View>
    </View>
  )
};

async function getNowPlayingMovies() {
  try {
    const response = await fetch(`${tmdbMovieApiBaseUri}/${tmdbNowPlayingUri}`);
    const responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

async function getMovieCredits(movieId) {
  try {
    const response = await fetch(`${tmdbMovieApiBaseUri}/${movieId}/${tmdbMovieCreditsUri}`);
    const responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

const getMovieCreditNamesMap = (numberOfNames, movieCreditsArray) => {
  const movieCreditsMap = new Map();
  movieCreditsArray.forEach(function(movieCredits){
    const movieCastNameArray = [];
    const movieCrewNameArray = [];
    let i;
    for (i = 0; i <= numberOfNames; i++) {
      try {
        movieCastNameArray.push(movieCredits.cast[i]['name']);
        movieCrewNameArray.push(movieCredits.crew[i]['name']);
      } catch(e) {
        console.log(`Movie credits name could not be found for movie id: ${movieCredits.id}`)
      }
    }
    movieCreditsMap.set(movieCredits.id, { 'cast': movieCastNameArray, 'crew': movieCrewNameArray });
  });
  return movieCreditsMap;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  listHeaderTitle: {
    color: '#666',
    fontWeight: '300',
    fontSize: 30,
    textAlign: 'center',
  },
  listHeader: {
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  main: {
    flex: 1,
  },
  flatList: {
    flex: 40,
    backgroundColor: '#f4f4f4',
  },
  movieItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    margin: 10,
    height: 173,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.20,
    shadowRadius: 3,
    elevation: 3,
  },
  posterImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  movieItemContent: {
    flex: 2,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    padding: 5,
  },
  movieItemTitle: {
    fontWeight: '500',
    fontSize: 20,
    marginLeft: 5,
  },
  movieItemDetailHeader: {
    color: '#666',
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 5,
  },
  movieItemText: {
    color: '#666',
    fontWeight: '300',
    fontSize: 13,
  },
});