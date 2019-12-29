import React from 'react';
import {TextInput, Text, View, Button} from 'react-native';
import Api from '../../components/Api';
import Helper from '../../components/Helper';

class LoginScreen extends React.Component {

    state = {
        phone_number: '',
        country_code: '+7 ',
    };

    static navigationOptions = (({navigation}) => {
        return {
            headerRight: (
                <Button title="Далее" onPress={navigation.getParam('checkPhoneNumber')}/>
            ),
        };
    });

    /**
     *
     */
    componentDidMount() {
        this.props.navigation.setParams({checkPhoneNumber: this.checkPhoneNumber});
    }

    /**
     *
     */
    checkPhoneNumber = () => {
        /**
         * TODO: check number, send sms, open screen for check sms
         */
        if (this.state.phone_number.toString().length !== 10){
            return;
        }

        let formatted_phone_number = this.state.country_code + Helper.formatPhoneNumber(this.state.phone_number);
        let data = {phone_number: formatted_phone_number};
        this.props.navigation.navigate('CheckSms', data);
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
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingTop: '40%',
                padding: 20,
            }}>
                <Text style={{fontSize: 18}}>Пожалуйста, введите ваш номер телефона</Text>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    fontSize: 20,
                    paddingTop: 20,
                    paddingBottom: 20,
                }}>
                    <Text style={{fontSize: 28, flex: 0.1, textAlign: 'right', paddingRight: 10}}>+7</Text>
                    <View style={{
                        borderWidth: 1,
                        borderColor: '#dadada',
                        flex: 0.7,
                    }}>
                        <TextInput
                            autoFocus={true}
                            keyboardType={'numeric'}
                            maxLength={10}
                            placeholder='Номер телефона'
                            onChangeText={(value) => this._typePhoneNumberHandler(value)}
                            style={{
                                fontSize: 22,
                                padding: 10,
                                paddingLeft: 20,
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export {LoginScreen};
