export default class DoctorsStoreService {

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
    search(doctorsFilter) {
        console.log(doctorsFilter);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data);
            }, 1200);
        });
    }

    /**
     *
     * @returns {Array}
     */
    getInfo(doctor, filter) {
        console.log(doctor);
        console.log(this.data[doctor]);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data[doctor]);
            }, 1200);
        });
    }

}
