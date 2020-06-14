const Str = {

    /**
     *
     * @param needle
     * @param haystack
     * @returns {boolean}
     */
    search: function (haystack, needle) {
        needle = needle ? needle.toString().trim().toUpperCase().replace(/[^A-ZА-Я]+/g, '') : '';
        haystack = haystack ? haystack.toString().trim().toUpperCase() : '';
        return haystack.search(needle) >= 0;
    },

    /**
     * @param string
     * @returns {string}
     */
    onlyDigits: function (string) {
        return string.replace(/[^0-9]/g, '');
    },

    /**
     *
     * @param data
     * @returns {string}
     */
    encodeQueryData: function (data) {
        const ret = [];
        for (let d in data) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }
        return ret.join('&');
    },

    /**
     *
     * @param number
     * @param titles [1, 2, 5]
     * @returns {*}
     */
    numberStr: function (number, titles) {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    },
};

export default Str;
