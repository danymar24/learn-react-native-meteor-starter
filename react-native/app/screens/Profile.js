import React, { Component } from 'react';
import Container from '../components/Container';
import { Header } from '../components/Text';
import { PrimaryButton } from '../components/Form';
import Meteor from 'react-native-meteor';
import { NavigationActions } from 'react-navigation';

class Profile extends Component {
  signOut = () => {
    Meteor.logout(() => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'SignUp'})
        ]
      });
      this.props.navigation.dispatch(resetAction);
    });
  };

  render() {
    return (
      <Container>
        <Header>
          Profile
        </Header>
        <PrimaryButton title="Sign Out"
                       onPress={this.signOut} />
      </Container>
    );
  }
}

export default Profile;
