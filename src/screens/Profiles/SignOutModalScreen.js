import React from 'react';
import {View} from 'react-native';
import {Button, Divider, Text} from 'react-native-elements';
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
                <Divider style={{height: 20, backgroundColor: '#fff'}}/>
                <Button
                    type={'outline'}
                    onPress={() => this._signOutAsync()}
                    title="Да"
                />
                <Divider style={{height: 20, backgroundColor: '#fff'}}/>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Нет, остаться"
                />
            </View>
        );
    }
}

export {SignOutModalScreen};
