import React from 'react';
import {Text, Divider, Button} from '@ui-kitten/components';
import {Container} from 'native-base';
import FormValidator from '../../components/FormValidator';
import {Agreement} from '../../components/uikit';
import {InputPhoneNumber} from '../../components/uikit/InputPhoneNumber';
import {Phone} from '../../utils';

class LoginScreen extends FormValidator {

    state = {
        phone_number: '',
        phone_error: true,
    };

    /**
     *
     */
    submitHandler = () => {
        const phone_number = this.state.phone_number;
        this.props.navigation.navigate('CheckSms', {phone_number});
    };

    /**
     *
     */
    checkPhoneNumber = () => {
        const valid = Phone.valid(this.state.phone_number);
        this.setState({phone_error: !valid});
    };

    /**
     * @param input_text
     */
    phoneNumberHandler(input_text) {
        const phone_number = Phone.format(input_text);
        this.setState({phone_number}, () => {
            this.checkPhoneNumber();
        });
    }

    /**
     *
     * @returns {*}
     */
    render() {
        const {phone_error} = this.state;
        return (
            <Container style={{padding: 15}}>
                <Text category={'h4'}>Добро пожаловать!</Text>
                <Divider style={{height: 20, backgroundColor: 'transparent'}}/>
                <Text>Войдите, чтобы записываться к врачам</Text>
                <Divider style={{height: 20, backgroundColor: 'transparent'}}/>
                <InputPhoneNumber
                    value={this.state.phone_number}
                    handlerPhoneNumber={(value) => this.phoneNumberHandler(value)}
                />
                <Button status={'danger'}
                        disabled={phone_error} style={{marginTop: 15}}
                        onPress={() => this.submitHandler()}>
                    Войти
                </Button>
                <Agreement/>
            </Container>
        );
    }
}

export {LoginScreen};
