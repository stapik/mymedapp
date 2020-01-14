import React from 'react';
import {View} from 'react-native';
import {TextSmall} from '../../components/base';

class IndexScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20}}>
                <TextSmall style={{textAlign: 'center'}}>Выгодные акции и предложения будут совсем скоро!</TextSmall>
            </View>
        );
    }
}

export {IndexScreen};
