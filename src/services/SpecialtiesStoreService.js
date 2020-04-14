import BaseService from './BaseService';

export default class SpecialtiesStoreService extends BaseService {

    /**
     *
     * @returns {Array}
     */
    getList() {
        return this.api.request('specialty/index');
    }

}
