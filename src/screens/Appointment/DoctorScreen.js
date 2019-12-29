import React from 'react';
import {View, Text, Button} from 'react-native';

class DoctorScreen extends React.Component {

  static navigationOptions = {
    title: 'Врач',
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>
        <Button title='Открыть поиск' onPress={() => {
          navigation.navigate('Index');
        }}/>
        <Button title='Go back' onPress={() => {
          navigation.goBack();
        }}/>
        <Text>{JSON.stringify(navigation.getParam('id'))}</Text>
      </View>
    );
  }
}

export {DoctorScreen};
