import React from 'react';
import {View, Text, Button} from 'react-native';

class Details extends React.Component {

  static navigationOptions = {
    title: 'Подробности',
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>
        <Button title='Go to Details again' onPress={() => {
          navigation.push('Details');
        }}/>
        <Button title='Go back' onPress={() => {
          navigation.goBack();
        }}/>
        <Text>{JSON.stringify(navigation.getParam('id'))}</Text>
      </View>
    );
  }
}

export {Details};
