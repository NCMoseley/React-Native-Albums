import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  state = { albums: [] };

  componentWillMount() {
    const databaseRef = firebase.database().ref();
    databaseRef.once('value').then(
      function(snapshot) {
        console.log(snapshot.val());
        const data = snapshot.val();
        this.setState({ albums: data });
      }.bind(this)
    );
  }

  renderAlbums() {
    return this.state.albums.map(album => (
      <AlbumDetail key={album.title} album={album} />
    ));
  }

  render() {
    return <ScrollView>{this.renderAlbums()}</ScrollView>;
  }
}

export default AlbumList;
