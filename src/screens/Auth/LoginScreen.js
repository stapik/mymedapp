import React from 'react';
import {View} from 'react-native';
import {Text, Divider, Input} from 'react-native-elements';
import {TextSmall} from '../../components/base';
import Helper from '../../components/Helper';
import Api from '../../Api';

class LoginScreen extends React.Component {

    state = {
        phone_number: '',
        country_code: '+7 ',
    };

    /**
     *
     */
    checkPhoneNumber = () => {
        if (Helper.clearNumber(this.state.phone_number.toString()).length !== 10) {
            return;
        }

        let phone_number = this.state.country_code + Helper.formatMobilePhone(this.state.phone_number);
        let api = Api.make();
        api.getSms(Helper.clearNumber(phone_number))
            .catch(({response}) => {
                Api._showError(response.data.message);
            });

        this.props.navigation.navigate('CheckSms', {phone_number});
    };

    /**
     *
     * @param phone_number
     * @private
     */
    _typePhoneNumberHandler(phone_number) {
        phone_number = Helper.clearNumber(phone_number);
        this.setState({phone_number}, () => {
            this.checkPhoneNumber();
        });
    }

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <View style={{
                flex: 1,
                padding: 20,
                paddingTop: '10%',
            }}>
                <Text h3>Добро пожаловать!</Text>
                <Divider style={{height: 15, backgroundColor: 'transparent'}}/>
                <Text>Войдите, чтобы записываться к врачам</Text>
                <Divider style={{height: 30, backgroundColor: 'transparent'}}/>

                <Input
                    label={'Номер телефона'}
                    placeholder=''
                    autoFocus={true}
                    value={this.state.phone_number}
                    onChangeText={(value) => this._typePhoneNumberHandler(value)}
                    keyboardType={'numeric'}
                    maxLength={10}
                    style={{fontSize: 18}}
                    leftIcon={
                        <Text style={{paddingRight: 5, fontSize: 18, marginTop: -1}}>{this.state.country_code}</Text>
                    }
                />

                <TextSmall style={{padding: 10}}>Номер телефона нужен только для защиты вашего аккаунта.
                    Никаких рекламных СМС.</TextSmall>
            </View>
        );
    }
}

export {LoginScreen};
