import DocumentService from '@/services/documentService';

const documentState = { documentData: {} };

export const document = {
    namespaced: true,
    state: documentState,
    actions: {
        upload({ commit }, documentData) {
            return DocumentService.upload(documentData)
                .then(
                    response => {
                        commit('doNothing');
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        getDocuments({ commit }, folderSlug) {
            commit('resetDocumentdata');
            let path = "/" + folderSlug;
            return DocumentService.getDocuments(path)
                .then(
                    response => {
                        commit('getSuccess', response.data.data.bucketData);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        delete({ commit }, documentId) {
            return DocumentService.delete(`/${documentId}`)
                .then(
                    response => {
                        commit(`doNothing`);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        }
    },
    mutations: {
        getSuccess(state, documentData) {
            state.documentData = documentData;
        },
        resetDocumentdata(state) {
            state.documentData = {};
        },
        doNothing() { }
    },
    getters: {
        documentData: (state) => {
            return state.documentData;
        }
    }
}