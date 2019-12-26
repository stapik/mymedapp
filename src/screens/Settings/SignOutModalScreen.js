import React from 'react';
import {Button, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class SignOutModalScreen extends React.Component {

    _signOutAsync = async () => {
        let keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        this.props.navigation.navigate('Login');
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20}}>Вы действительно хотите выйти?</Text>

                <Button
                    onPress={() => this._signOutAsync()}
                    title="Да"
                />

                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Нет, остаться"
                />
            </View>
        );
    }
}

export {SignOutModalScreen};
