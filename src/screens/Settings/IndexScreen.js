import React from 'react';
import {View, Button} from 'react-native';

class IndexScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button title="Выход" onPress={() => this.props.navigation.navigate('SignOut')}/>
            </View>
        );
    }
}

export {IndexScreen};

