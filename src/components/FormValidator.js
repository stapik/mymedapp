import React from 'react';
import ValidationComponent from 'react-native-form-validator';
import defaultRules from 'react-native-form-validator/defaultRules';
import defaultMessages from 'react-native-form-validator/defaultMessages';
import {parsePhoneNumberFromString} from 'libphonenumber-js';

export default class FormValidator extends ValidationComponent {

    /**
     * @param props
     * @returns {boolean}
     */
    constructor(props) {
        super(props);

        const messages = {
            ...defaultMessages,
            ru: {
                numbers: 'Поле "{0}" должно быть номером.',
                email: 'Поле "{0}" должно быть E-mail адрес.',
                required: 'Поле обязательно для заполнения.',
                check_phone_number: 'Поле "Номер телефона" обязательно для заполнения.',
                date: 'Поле "{0}" должно быть датой ({1}).',
                minlength: 'Длинна поля "{0}" должна быть больше, чем {1}.',
                maxlength: 'Длинна поля "{0}" должна быть меньше, чем {1}.',
            },
        };

        const rules = {
            ...defaultRules,
            check_phone_number(country, value) {
                const phoneNumber = parsePhoneNumberFromString(value, country);
                return phoneNumber ? phoneNumber.isValid() : false;
            },
        };

        this.errors = [];
        this.deviceLocale = 'ru';
        this.rules = rules;
        this.messages = messages;
    }

    /**
     * @param fieldName
     * @returns {string}
     */
    getFieldStatusText(fieldName) {
        return this.isFieldInError(fieldName) ? 'danger' : '';
    }
}



