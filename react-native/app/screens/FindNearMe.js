import React, { Component } from 'react';
import Container from '../components/Container';
import { Header } from '../components/Text';
import { connectAlert } from '../components/Alert';
import Meteor from 'react-native-meteor';

import LocateMeButton from '../components/LocateMeButton';

class FindNearMe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  handleGeolocationSuccess = (position) => {
    const params = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    this.setState({ loading: true });
    Meteor.call('Locations.getNearestLocations', params, (err, locations) => {
      if(err) {
        this.props.alertWithType('error', 'Error', err.reason);
      } else {
        this.props.navigation.navigate('NearMe', { locations, position });
      }
      this.setState({ loading: false });
    })
  }

  handleGeolocationError = (error) => {
    this.props.alertWithType('error', 'Error', error.message);
  }

  goToNearMe = () => {
    navigator.geolocation.getCurrentPosition(
      this.handleGeolocationSuccess,
      this.handleGeolocationError,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  };
  
  render() {
    return (
      <Container>
        <LocateMeButton onPress={this.goToNearMe} loading={this.state.loading} />
        <Header>
          Find Near Me
        </Header>
      </Container>
    );
  };
}

export default connectAlert(FindNearMe);
