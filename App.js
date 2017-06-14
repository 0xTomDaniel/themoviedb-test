'use strict';

import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeView from './HomeView';
import MovieView from './MovieView';

// Using 'React Navigation' library for screen navigation
const AppScreens = StackNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: () => ({
      title: 'The Movie DB Accessor',
      headerTitleStyle: styles.stackNavHeaderTitle,
      headerStyle: styles.stackNavHeader,
      headerTintColor: '#fff',
    }),
  },
  MovieDetails: {
    screen: MovieView,
    navigationOptions: ({navigation}) => ({
      title: `Info - ${navigation.state.params.movieDataJson.title}`,
      headerTitleStyle: styles.stackNavHeaderTitle,
      headerStyle: styles.stackNavHeader,
      headerTintColor: '#fff',
    }),
  },
});

// Using 'Create React Native App' with the Expo mobile app
export default class App extends React.Component {
  render() {
    return (
      <AppScreens />
    );
  }
}

const styles = StyleSheet.create({
  stackNavHeaderTitle: {
    color: '#00d373',
  },
  stackNavHeader: {
    backgroundColor: '#081c24',
  }
});