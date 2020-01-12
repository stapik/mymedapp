import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

class SupportScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>В разработке</Text>
            </View>
        );
    }
}

export {SupportScreen};
