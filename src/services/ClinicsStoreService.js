import BaseService from './BaseService';

export default class ClinicsStoreService extends BaseService {

    /**
     *
     * @returns {Array}
     */
    getList() {
        return this.api.request('clinic/index');
    }
}
