import React from 'react';
import {Text, Divider, Input} from '@ui-kitten/components';
import {formatPhone} from '../../utils';
import {Container} from 'native-base';
import FormValidator from '../../components/FormValidator';
import {TouchableOpacity} from 'react-native';

class LoginScreen extends FormValidator {

    state = {
        phone_number: '',
        country_code: '+7 ',
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
        const {phone_error} = this.state;
        return (
            <Container style={{padding: 15}}>
                <Text category={'h4'}>Добро пожаловать!</Text>
                <Divider style={{height: 20, backgroundColor: 'transparent'}}/>
                <Text>Войдите, чтобы записываться к врачам</Text>
                <Divider style={{height: 20, backgroundColor: 'transparent'}}/>
                <Input
                    label={'Номер телефона'}
                    placeholder='+7'
                    caption={'Номер телефона нужен только для защиты вашего аккаунта. Никаких рекламных СМС.'}
                    autoFocus={true}
                    status={phone_error ? 'danger' : 'default'}
                    value={this.state.phone_number}
                    onChangeText={(value) => this._phoneNumberHandler(value)}
                    keyboardType={'numeric'}/>
            </Container>
        );
    }
}

export {LoginScreen};
