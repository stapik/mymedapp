import React from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {persistor} from '../../store';
import {resetStore} from '../../actions';
import compose from '../../utils/compose';
import {connect} from 'react-redux';

import {Button, Divider, Text} from '@ui-kitten/components';
import Api from '../../Api';

class SignOutModalContainer extends React.Component {

    _signOutAsync = async () => {
        Api.logout();
        let keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        await persistor.purge();
        this.props.resetStore();
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15}}>
                <Text category={'h6'} style={{textAlign: 'center'}}>Вы действительно хотите выйти?</Text>
                <Divider style={{height: 30, backgroundColor: '#fff'}}/>
                <Button
                    appearance={'outline'}
                    onPress={() => this._signOutAsync()}
                >Да</Button>
                <Divider style={{height: 20, backgroundColor: '#fff'}}/>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                >Нет, остаться</Button>
            </View>
        );
    }
}

export {SignOutModalContainer};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = {
    resetStore: resetStore,
};

const SignOutModalScreen = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(SignOutModalContainer);

export {SignOutModalScreen};
