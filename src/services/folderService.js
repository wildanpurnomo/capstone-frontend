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
    
    edit(data){
        return this.sendAPIRequest(endpoints.folder, 'PUT', data)
    }
    
    delete(){
        return this.sendAPIRequest(endpoints.folder, 'DEL')
    }
}

export default new FolderService();