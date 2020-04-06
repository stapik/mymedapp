import Api from '../Api';

export default class BaseService {

    api;

    /**
     *
     */
    constructor() {
        this.api = Api.make();
    }
}
