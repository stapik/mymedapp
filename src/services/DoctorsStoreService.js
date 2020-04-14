import BaseService from './BaseService';

export default class DoctorsStoreService extends BaseService {

    /**
     *
     * @returns {Array}
     */
    search(filter) {
        return this.api.request('doctor/search', filter);
    }

    /**
     *
     * @returns {Array}
     */
    getInfo(doctor, filter) {
        return this.api.request('doctor/show/' + doctor, filter);
    }

    /**
     *
     * @returns {Array}
     */
    getFavoriteDoctors() {
        return this.api.request('favorite_doctors/index');
    }

    /**
     *
     * @param doctor
     * @param status
     * @returns {*}
     */
    toggleFavoriteStatus(doctor, status) {
        const uri = status ? `favorite_doctors/add/${doctor}` : `favorite_doctors/destroy/${doctor}`;
        return this.api.request(uri);
    }
}
