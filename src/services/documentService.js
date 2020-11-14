import { endpoints } from './endpoints';
import BaseService from './baseService';

class DocumentService extends BaseService{
    constructor(){
        super();
    }

    upload(data){
        return this.sendAPIRequest(endpoints.documents, 'POST', data);
    }

    getDocument(){
        return this.sendAPIRequest(endpoints.documents, 'GET');
    }
}

export default new DocumentService();