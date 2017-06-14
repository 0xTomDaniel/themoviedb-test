'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const tmdbImageUri = 'https://image.tmdb.org/t/p/w780';

export default class extends React.Component {
  render() {
    const {state} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          style={styles.backdropImage}
          source={{uri: `${tmdbImageUri}/${state.params.movieDataJson.backdrop_path}`}}
        />
        <View style={styles.backdropOverlay}>
          <Text style={styles.title}>
            {state.params.movieDataJson.title}&nbsp;
            <Text style={styles.year}>({state.params.movieDataJson.release_date.substr(0,4)})</Text>
          </Text>
          <TopContent
            posterPath={state.params.movieDataJson.poster_path}
            voteAverage={state.params.movieDataJson.vote_average}
            releaseDate={state.params.movieDataJson.release_date}
          />
          <View style={styles.bottomContent}>
            <Text style={styles.overview} numberOfLines={10}>
              {state.params.movieDataJson.overview}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const TopContent = props => {
  return (
    <View style={styles.topContainer}>
      <Image
        style={styles.posterImage}
        source={{uri: `${tmdbImageUri}/${props.posterPath}`}}
      />
      <View style={styles.topContent}>
        <View>
          <Text style={styles.topContentText}>
            {props.voteAverage}
          </Text>
          <Text style={styles.topContentLabel}>
            User Score
          </Text>
        </View>
        <View>
          <Text style={styles.topContentText}>
            {props.releaseDate.substr(5)}
          </Text>
          <Text style={styles.topContentLabel}>
            Release Date
          </Text>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  backdropImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  backdropOverlay: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 30,
    color: '#fff',
  },
  year: {
    fontWeight: '400',
    fontSize: 25,
    color: '#aaa',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
  },
  posterImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  topContent: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topContentLabel: {
    fontWeight: '300',
    fontSize: 20,
    color: '#aaa',
    alignSelf: 'center',
  },
  topContentText: {
    fontWeight: '300',
    fontSize: 30,
    color: '#fff',
    alignSelf: 'center',
  },
  bottomContent: {
    flex: 1,
    paddingTop: 30,
  },
  overview: {
    fontWeight: '400',
    fontSize: 16,
    color: '#fff',
  },
});