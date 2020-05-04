import React from 'react';
import {Text, Divider, Input} from '@ui-kitten/components';
import Helper from '../../components/Helper';
import Api from '../../Api';
import {formatPhone} from '../../utils';
import {Container, Content} from 'native-base';
import FormValidator from '../../components/FormValidator';

class LoginScreen extends FormValidator {

    state = {
        phone_number: '',
        country_code: '+7 ',
    };

    /**
     *
     */
    checkPhoneNumber = () => {
        const rules = {
            phone_number: {check_phone_number: 'RU', required: true},
        };
        if (!this.validate(rules)) {
            return;
        }

        let phone_number = formatPhone(this.state.phone_number, this.state.country_code);
        this.props.navigation.navigate('CheckSms', {phone_number});
    };

    /**
     * @param input_text
     */
    _phoneNumberHandler(input_text) {
        const phone_number = formatPhone(input_text, this.state.country_code);
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
            <Container style={{padding: 15}}>
                <Content style={{paddingTop: 20}}>
                    <Text category={'h4'}>Добро пожаловать!</Text>
                    <Divider style={{height: 20, backgroundColor: 'transparent'}}/>
                    <Text>Войдите, чтобы записываться к врачам</Text>
                    <Divider style={{height: 20, backgroundColor: 'transparent'}}/>
                    <Input
                        label={'Номер телефона'}
                        placeholder='+7'
                        caption={'Номер телефона нужен только для защиты вашего аккаунта. Никаких рекламных СМС.'}
                        autoFocus={true}
                        value={this.state.phone_number}
                        onChangeText={(value) => this._phoneNumberHandler(value)}
                        keyboardType={'numeric'}/>
                </Content>
            </Container>
        );
    }
}

export {LoginScreen};
