import React from 'react';
import {Button, Input, Text} from '@ui-kitten/components';
import {Container, Content} from 'native-base';
import FormValidator from '../FormValidator';
import {updateProfile} from '../../actions';
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import {InputDateTimePicker} from './InputDateTimePicker';
import {Confidentiality} from './Confidentiality';
import {InputPhoneNumber} from './InputPhoneNumber';
import {Phone} from '../../utils';

class ProfileFormContainer extends FormValidator {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = Object.assign(this.state, this.props.profile);
    }

    state = {
        birth_date: '',
        phone_number: '',
        first_name: '',
        last_name: '',
        show_date_picker: false,
    };

    /**
     * @param input_text
     * @private
     */
    _phoneHandler(input_text) {
        const phone_number = Phone.format(input_text);
        this.setState({phone_number});
    }

    /**
     * @private
     */
    _onPressSubmit = () => {
        const {submitHandler, updateProfile} = this.props;

        this.validate({
            first_name: {minlength: 2, required: true},
            last_name: {minlength: 2, required: true},
            phone_number: {check_phone_number: 'RU', required: true},
            birth_date: {date: 'YYYY-MM-DD', required: true},
        });
        if (this.isFormValid()) {
            submitHandler(this.state);
            updateProfile(this.state);
        }
    };

    /**
     * @returns {*}
     */
    render() {
        const {country_code, phone_number, first_name, last_name, birth_date} = this.state;
        const {submitText, headerComponent} = this.props;

        return (
            <Container style={{padding: 15}}>
                <Content>
                    {headerComponent && headerComponent()}
                    <InputPhoneNumber
                        status={this.getFieldStatusText('phone_number')}
                        value={phone_number}
                        handlerPhoneNumber={(nextValue) => this._phoneHandler(nextValue)}
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

                    <InputDateTimePicker
                        error={this.isFieldInError('birth_date')}
                        onChange={(birth_date) => this.setState({birth_date})}
                        label={'Дата рождения'}
                        value_format={'YYYY-MM-DD'}
                        value={birth_date}
                        input_format={'DD.MM.YYYY'}
                    />

                    <Button style={{marginTop: 15}} onPress={this._onPressSubmit}>
                        {submitText}
                    </Button>
                    <Confidentiality/>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({profile}) => {
    return {profile};
};

const mapDispatchToProps = {
    updateProfile,
};

const ProfileForm = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ProfileFormContainer);

export default ProfileForm;
