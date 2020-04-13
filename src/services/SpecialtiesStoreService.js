import BaseService from './BaseService';

export default class SpecialtiesStoreService extends BaseService {

    data = [
        {id: 1, title: 'Терапевт'},
        {id: 2, title: 'Мамолог'},
        {id: 3, title: 'Андролог'},
        {id: 4, title: 'Хирург'},
    ];

    /**
     *
     * @returns {Array}
     */
    getList() {
        return this.api.request('specialty/index');
    }

}
