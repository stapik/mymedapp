import BaseService from './BaseService';

export default class DoctorsStoreService extends BaseService{

    data = [
        {
            id: 0,
            name: 'brynn1',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        },
        {
            id: 1,
            name: 'brynn2',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        },
        {
            id: 2,
            name: 'brynn3',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        },
    ];

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
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data[doctor]);
            }, 1200);
        });
    }

}
