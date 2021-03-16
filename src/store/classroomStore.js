import ClassroomService from '@/services/classroomService.js';

const initialClassroomState = { courseList: [], courseWorkList: [], courseSubmissionList: [] };

export const classroom = {
    namespaced: true,
    state: initialClassroomState,
    actions: {
        getCourseList({ commit }) {
            return ClassroomService.getCourseList()
                .then(
                    response => {
                        commit('courseListSuccess', response.data.data.courseData);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },

        getCourseWorkList({ commit }, courseId) {
            return ClassroomService.getCourseWorkList(courseId)
                .then(
                    response => {
                        commit('courseWorkListSuccess', response.data.data.courseWorkData);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },

        getCourseSubmissionList({ commit }, req) {
            return ClassroomService.getCourseSubmissionList(req.courseId, req.courseWorkId)
                .then(
                    response => {
                        commit('courseSubmissionListSuccess', response.data.data.submissionData);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        }
    },
    mutations: {
        courseListSuccess(state, courseData) {
            state.courseList = courseData;
        },

        courseWorkListSuccess(state, courseWorkData) {
            state.courseWorkList = courseWorkData
        },

        courseSubmissionListSuccess(state, submissionData) {
            state.courseSubmissionList = submissionData
        }
    },
    getters: {
        courseList(state) {
            return state.courseList;
        },

        courseWorkList(state) {
            return state.courseWorkList;
        },

        courseSubmissionList(state) {
            return state.courseSubmissionList;
        }
    }
}