import { endpoints } from './endpoints';
import BaseService from './baseService';

class FolderService extends BaseService {
    constructor(){
        super();
    }

    addNew(data){
        return this.sendAPIRequest(endpoints.folder, 'POST', data)
    }
    
    getFolder(data){
        return this.sendAPIRequest(endpoints.folder, 'GET', data)
    }
    
    edit(data, id){
        return this.sendAPIRequest(endpoints.folder, 'PUT', data, id)
    }
    
    delete(id){
        return this.sendAPIRequest(endpoints.folder, 'DELETE', null, id)
    }
}

export default new FolderService();