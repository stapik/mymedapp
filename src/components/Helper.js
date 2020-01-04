const Helper = {

    /**
     *
     * @param text
     * @returns {*}
     */
    formatMobilePhone: function (text) {
        var re = /(?:([\d]{1,}?))??(?:([\d]{1,3}?))??(?:([\d]{1,3}?))??(?:([\d]{2}))??([\d]{2})$/;
        text = this.clearNumber(text).replace(re, function (all, a, b, c, d, e) {
            return (b ? '(' + b + ') ' : '') + (c ? c + '-' : '') + (d ? d + '-' : '') + e;
        });
        return text;
    },

    /**
     *
     * @param number
     * @returns {boolean | NavigationReplaceAction | void | string | never}
     */
    clearNumber: function (number) {
        return number.replace(/[^0-9]/g, '');
    },
};

export default Helper;
