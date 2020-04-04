/**
 *
 * @param search
 * @param string
 * @returns {boolean}
 */
const searchInStr = (search, string) => {
    let search_value_upper = search
        .toString()
        .toUpperCase()
        .replace(/[^A-ZА-Я]+/g, '');

    let specialty_title_upper = string.toString().toUpperCase();
    if (specialty_title_upper.search(search_value_upper.toString()) < 0) {
        return false;
    }
    return true;
};

export {searchInStr};
