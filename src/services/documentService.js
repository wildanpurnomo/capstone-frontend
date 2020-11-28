import { endpoints } from './endpoints';
import BaseService from './baseService';

class DocumentService extends BaseService {
    constructor() {
        super();
    }

    upload(data) {
        return this.sendAPIRequest(endpoints.documents, 'POST', data, undefined, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    getDocuments(id) {
        return this.sendAPIRequest(endpoints.documents, 'GET', undefined, id);
    }

    delete(data) {
        return this.sendAPIRequest(endpoints.documents, 'DELETE', undefined, data);
    }
}

export default new DocumentService();