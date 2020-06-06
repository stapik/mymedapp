import {
    formatIncompletePhoneNumber,
    getCountryCallingCode,
    parsePhoneNumberFromString,
    AsYouType,
} from 'libphonenumber-js';
import Str from './Str';

const Phone = {

    country_code: 'RU',

    /**
     * @returns {string}
     */
    countryCallingCode: function (withPlus = false) {
        const code = getCountryCallingCode(this.countryCode());
        return withPlus ? '+' + code : code;
    },

    /**
     * @returns {string}
     */
    countryCode: function () {
        return this.country_code;
    },

    /**
     * @returns {string}
     */
    format: function (phoneNumber, addCountryCode = false, addPlus = false) {
        phoneNumber = (addCountryCode ? this.countryCallingCode(addPlus) + ' ' + phoneNumber : phoneNumber).toString();
        phoneNumber = !addCountryCode && addPlus ? '+' + phoneNumber : phoneNumber;
        return formatIncompletePhoneNumber(phoneNumber, this.countryCode());
    },

    /**
     * @param phone
     * @returns {boolean}
     */
    valid: function (phone) {
        const phoneNumber = parsePhoneNumberFromString(phone, this.countryCode());
        return phoneNumber ? phoneNumber.isValid() : false;
    },

    /**
     * @returns {string}
     */
    clear: function (phoneNumber, addCountryCode = false) {
        return Str.onlyDigits(this.format(phoneNumber, addCountryCode));
    },
};

export default Phone;
