import DocumentService from '@/services/documentService';
//import DocumentModel from '@/models/documentModel';

const documentState = { documentData: []};

export const document = {
    namespaced: true,
    state: documentState,
    actions:{
        upload({ commit }, documentData){
            return DocumentService.upload(documentData)
                .then(
                    response => {
                        commit('uploadSuccess', response.data.data.bucketData);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        getDocuments({ commit }, folderId){
            let id = "/" + folderId;
            return DocumentService.getDocuments(id)
                .then(
                    response => {
                        commit('getSuccess', response.data.data.bucketData);
                        return Promise.resolve(response);
                    },
                    error =>{
                        return Promise.reject(error);
                    }
                )
        },
        delete({ commit }, documentData){
            let id = documentData._id;
            return DocumentService.delete(id)
                .then(
                    response => {
                        commit('', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        }
    },
    mutations: {
        uploadSuccess(state, documentData){
            state.documentData.concat(documentData);
        },
        getSuccess(state, documentData){
            state.documentData = documentData;
        }
    },
    getters: {
        documentData: (state) => {
            return state.documentData;
        }
    }
}