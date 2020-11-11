import { endpoints } from './endpoints';
import BaseService from './baseService';

class ClassroomService extends BaseService{
    constructor(){
        super();
    }

    course(data){
        return this.sendAPIRequest(endpoints.classroom, 'GET');
    }

    submission(){
        return this.sendAPIRequest(endpoints.classroom, 'GET', data);
    }
}

export default new ClassroomService();