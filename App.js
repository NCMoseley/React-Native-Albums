import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';
import LoginForm from './src/components/LoginForm';
import Button from './src/components/Button';
import Spinner from './src/components/Spinner';
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
            <AlbumList />
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Header headerText={'Music for Sale'} />
          {this.renderContent()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,
    width: 120
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  modules: {
    margin: 20
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center'
  }
});

export default App;
