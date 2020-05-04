import React from 'react';
import {Button, Layout, Input, Text} from '@ui-kitten/components';
import {formatPhone} from '../../utils';
import {DatePicker} from 'native-base';
import moment from 'moment';
import {Container, Content} from 'native-base';
import FormValidator from '../FormValidator';

class ProfileForm extends FormValidator {

    state = {
        country_code: '+7',
        birth_date: '',
        phone_number: '',
        first_name: '',
        last_name: '',
    };

    /**
     * @param input_text
     * @private
     */
    _phoneHandler(input_text) {
        const phone_number = formatPhone(input_text, this.state.country_code);
        this.setState({phone_number});
    }

    /**
     * @private
     */
    _onPressButton = () => {
        const {submitHandler} = this.props;

        this.validate({
            first_name: {minlength: 2, required: true},
            last_name: {minlength: 2, required: true},
            phone_number: {check_phone_number: 'RU', required: true},
            birth_date: {date: 'DD.MM.YYYY', required: true},
        });
        if (this.isFormValid()) {
            submitHandler(this.state);
        }
    };

    /**
     * @returns {*}
     */
    render() {
        const {country_code, birth_date, phone_number, first_name, last_name} = this.state;
        const {submitText} = this.props;
        return (
            <Container style={{padding: 15}}>
                <Content>
                    <Input
                        label='Номер телефона'
                        placeholder={country_code}
                        value={phone_number}
                        keyboardType={'numeric'}
                        status={this.getFieldStatusText('phone_number')}
                        onChangeText={(nextValue) => this._phoneHandler(nextValue)}
                    />
                    <Input
                        label='Фамилия'
                        placeholder=''
                        value={last_name}
                        status={this.getFieldStatusText('last_name')}
                        onChangeText={(last_name) => this.setState({last_name})}
                    />
                    <Input
                        label='Имя'
                        placeholder=''
                        value={first_name}
                        status={this.getFieldStatusText('first_name')}
                        onChangeText={(first_name) => this.setState({first_name})}
                    />
                    <Text appearance={'hint'} category={'label'} style={{paddingBottom: 5, paddingTop: 1}}>
                        Дата рождения
                    </Text>
                    <Layout level={'2'}
                            style={{
                                borderRadius: 5,
                                borderColor: this.isFieldInError('birth_date') ? '#ff0000' : '#e5e5e5',
                                borderWidth: 1,
                                paddingLeft: 5,
                            }}>
                        <DatePicker
                            defaultDate={birth_date ? moment(birth_date).toDate() : null}
                            textStyle={{fontSize: 15, color: '#343434'}}
                            placeHolderTextStyle={{color: '#9e9e9e'}}
                            locale={'ru'}
                            placeHolderText={' '}
                            formatChosenDate={(date) => moment(date).format('DD.MM.YYYY')}
                            androidMode={'spinner'}
                            onDateChange={(birth_date) => this.setState({birth_date})}
                        />
                    </Layout>
                    <Button style={{marginTop: 25}} onPress={this._onPressButton}>
                        {submitText}
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default ProfileForm;
