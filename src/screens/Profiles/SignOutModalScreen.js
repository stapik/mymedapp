import React from 'react';
import {View} from 'react-native';
import compose from '../../utils/compose';
import {Button, Divider, Text} from '@ui-kitten/components';
import {withApi} from '../../components/hoc';

class SignOutModalContainer extends React.Component {

    /**
     * @returns {Promise<void>}
     * @private
     */
    _signOutAsync = () => {
        this.props.api.logout();
    };

    /**
     * @returns {*}
     */
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

const SignOutModalScreen = compose(
    withApi(),
)(SignOutModalContainer);

export {SignOutModalScreen};
