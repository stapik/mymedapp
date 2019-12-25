import React from 'react';
import {Text, View} from 'react-native';

class DefaultScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>DefaultScreen!</Text>
            </View>
        );
    }
}

export {DefaultScreen};
