import React from 'react';
import {Button, Text, View} from 'react-native';

class LoginScreen extends React.Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>LoginScreen!</Text>
                <Button title='Login' onPress={() => {
                    navigation.navigate('TabsNav');
                }}/>
            </View>
        );
    }
}

export {LoginScreen};
