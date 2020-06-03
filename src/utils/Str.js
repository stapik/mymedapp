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
};

export default Str;
