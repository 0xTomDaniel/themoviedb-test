# The Movie DB Accessor
This is a small project created to learn React Native and demonstrate my mobile development abilities.

## Usage
[Create React Native App](https://github.com/react-community/create-react-native-app) was used to develop and test this app. In order to run this React Native app, you will first need to install Expo on your iOS or Android device.
- Assuming that you have Node installed, you can use yarn to install the create-react-native-app command line utility:
```sh
$ yarn global add create-react-native-app
```
- Then run the following commands to create a new React Native project called "themoviedb-test":
```sh
$ create-react-native-app themoviedb-test
$ cd themoviedb-test
```
- Next copy all files from this repo into the 'themoviedb-test' directory. Overwrite any existing files. Then run the following commands:
```sh
$ yarn add react-navigation
$ yarn start
```
- Ensure your mobile device is connected to the same wireless network as your computer. Using the Expo app, scan the QR code from your terminal to open your project.

## Objective
1. Make a small React Native application that can compile to both iOS and Android. 
2. Access the movie db API (https://www.themoviedb.org/documentation/api) and pull any collection of movies (top rated, upcoming etc.), the choice is yours. 
3. Render a ListView component displaying the thumbnail of the movie picture, the title, the creators, and the main actors (you can cap that amount of actors to 2 or 3 if you want). 
4. The component can have as many items as you please. The more items you can pull, the better (keeping performance in mind)! 
5. Each cell in the ListView should be able to render a new view with all details of the movie once clicked, let’s call this new view MovieView. What you render inside this component is up to you, but it’s your chance to show us your skills. Display any data you choose of the given movie, and feel free to add visual styling and other cool things. 
6. You may use any library or tool of you choosing as long as it is open source.

## Overview
- This app will query The Movie DB API to obtain a list of 'now playing' movies.
- It will then present a list of the movies. Each movie is presented in a card format with the movie poster and other details.
- When a movie is pressed, a new screen will present to show more details of the movie with an option to return to the movie list.
- I decided to use FlatList instead of ListView
    - FlatList is the replacement for ListView and the latter is planned to be depreciated
	- https://github.com/facebook/react-native/commit/a3457486e39dc752799b1103ebe606224a8e8d32#commitcomment-21097746
