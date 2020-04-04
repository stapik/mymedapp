export default class SpecialtiesStoreService {

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
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(this.data);
            }, 1200);
        });
    }

}
