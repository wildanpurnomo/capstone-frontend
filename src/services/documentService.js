import { endpoints } from './endpoints';
import BaseService from './baseService';

class DocumentService extends BaseService {
    constructor() {
        super();
    }

    upload(data) {
        return this.sendAPIRequest(endpoints.uploadDocuments, 'POST', data, undefined, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    getDocuments(folderSlug) {
        return this.sendAPIRequest(endpoints.browseDocuments, 'GET', undefined, folderSlug);
    }

    delete(documentId) {
        return this.sendAPIRequest(endpoints.deleteDocuments, 'DELETE', undefined, documentId);
    }
}

export default new DocumentService();