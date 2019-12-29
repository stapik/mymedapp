import React from 'react';
import {Button, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, NavigationActions} from 'react-navigation';

class SignOutModalScreen extends React.Component {

    _signOutAsync = async () => {
        let keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);

        // reset login info
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Main'}),
            ],
        });
        this.props.navigation.dispatch(resetAction);

        //
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
