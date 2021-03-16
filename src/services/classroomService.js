import { endpoints } from './endpoints';
import BaseService from './baseService';

class ClassroomService extends BaseService{
    constructor(){
        super();
    }

    getCourseList(){
        return this.sendAPIRequest(endpoints.classroomCourseList, 'GET');
    }

    getCourseWorkList(courseId) {
        return this.sendAPIRequest(endpoints.classroomCourseWorkList, 'GET', null, courseId);
    }

    getCourseSubmissionList(courseId, courseWorkId) {
        return this.sendAPIRequest(endpoints.classroomCourseSubmissionList, 'GET', null, `${courseId}/${courseWorkId}`);
    }
}

export default new ClassroomService();