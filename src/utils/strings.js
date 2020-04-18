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

export {searchInStr};
