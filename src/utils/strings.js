import {AsYouType, parsePhoneNumberFromString} from 'libphonenumber-js';

/**
 *
 * @param search
 * @param string
 * @returns {boolean}
 */
const searchInStr = (search, string) => {
    search = search ? search.toString().trim().toUpperCase().replace(/[^A-ZА-Я]+/g, '') : '';
    string = string ? string.toString().trim().toUpperCase() : '';
    return string.search(search) >= 0;
};
/**
 *
 * @param input_text
 * @param country_code
 * @returns {string}
 */
const formatPhone = (input_text, country_code) => {
    const type = new AsYouType('RU');
    let filtered_text = input_text.toString().replace(country_code, '');
    return filtered_text ? country_code + ' ' + type.input(filtered_text) : '';
};

export {searchInStr, formatPhone};
