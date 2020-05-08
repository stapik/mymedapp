import BaseService from './BaseService';

export default class VisitStoreService extends BaseService {

    /**
     *
     * @returns {Array}
     */
    getList() {
        return this.api.request('visits/index');
    }

    /**
     *
     * @returns {Array}
     */
    create(data) {
        return this.api.request('visit/create/', data);
    }

    /**
     *
     * @returns {Array}
     */
    delete(visit_id) {
        return this.api.request('visit/delete/' + visit_id);
    }

    /**
     *
     * @returns {Array}
     */
    cancel(visit_id) {
        return this.api.request('visit/cancel/' + visit_id);
    }
}
