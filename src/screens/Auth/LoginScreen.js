import React from 'react';
import {Text, Divider} from '@ui-kitten/components';
import {Container} from 'native-base';
import FormValidator from '../../components/FormValidator';
import {TouchableOpacity} from 'react-native';
import {Agreement} from '../../components/uikit';
import {InputPhoneNumber} from '../../components/uikit/InputPhoneNumber';
import {Phone} from '../../utils';

class LoginScreen extends FormValidator {

    state = {
        phone_number: '',
        phone_error: false,
    };

    componentDidMount(): void {
        this.props.navigation.setParams({checkPhoneNumber: this.checkPhoneNumber});
    }

    static navigationOptions = ({navigation}) => {
        const checkPhoneNumber = navigation.getParam('checkPhoneNumber');
        return {
            headerRight: (
                <TouchableOpacity
                    style={{marginRight: 5, padding: 10}}
                    activeOpacity={0.7}
                    onPress={() => checkPhoneNumber(true)}>
                    <Text category={'s1'} status='primary'>Далее</Text>
                </TouchableOpacity>
            ),
        };
    };

    /**
     *
     */
    checkPhoneNumber = (highlight = false) => {
        const rules = {
            phone_number: {check_phone_number: 'RU', required: true},
        };

        if (!this.validate(rules)) {
            if (highlight) {
                this.setState({phone_error: true});
            }
            return;
        }
        this.setState({phone_error: false});

        const phone_number = this.state.phone_number;
        this.props.navigation.navigate('CheckSms', {phone_number});
    };

    /**
     * @param input_text
     */
    _phoneNumberHandler(input_text) {
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
                    caption={<Agreement/>}
                    status={phone_error ? 'danger' : 'default'}
                    value={this.state.phone_number}
                    handlerPhoneNumber={(value) => this._phoneNumberHandler(value)}
                />
            </Container>
        );
    }
}

export {LoginScreen};
