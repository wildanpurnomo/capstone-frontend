import FolderService from '@/services/folderService';

const folderState = { folderList: [] };

export const folder = {
    namespaced: true,
    state: folderState,
    actions: {
        create({ commit }, folderData) {
            return FolderService.addNew(folderData)
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
        getFolder({ commit }) {
            return FolderService.getFolder()
                .then(
                    response => {
                        commit('onSuccessGetList', response.data.data.folderList);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        edit({ commit }, folderData) {
            let id = "/" + folderData._id;
            return FolderService.edit(folderData, id)
                .then(
                    response => {
                        commit('doNothing', response.data.data.folderData);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        delete({ commit }, folderId) {
            let id = "/" + folderId;
            return FolderService.delete(id)
                .then(
                    response => {
                        commit('doNothing');
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
        }
    },
    mutations: {
        onSuccessGetList(state, folderList) {
            state.folderList = folderList;
        },

        doNothing() { }
    },
    getters: {
        folderList: (state) => {
            return state.folderList;
        }
    }
}