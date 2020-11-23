import FolderService from '@/services/folderService';
import FolderModel from '@/models/folderModel';

const folderState = { folderData: new FolderModel()};

export const folder = {
    namespaced: true,
    state: folderState,
    actions:{
        create({ commit }, folderData){
            return FolderService.addNew(folderData)
                .then(
                    response => {
                        console.log(response);
                        commit('createSuccess', response.data.data.folderData);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        getFolder({ commit }, folderData){
            return FolderService.getFolder(folderData)
                .then(
                    response => {
                        commit('createSuccess', response.data.data.folderList);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        edit({ commit }, folderData){
            let id = "/" + folderData._id;
            return FolderService.edit(folderData, id)
                .then(
                    response => {
                        console.log(response);
                        commit('editSuccess', response.data.data.folderData); //later
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        delete({ commit }, folderData){
            let id = "/" + folderData._id;
            return FolderService.delete(id)
                .then(
                    response => {
                        console.log(response);
                        commit('deleteSuccess'); //later
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
        }
    },
    mutations:{
        createSuccess(state, folderData){
            state.folderData = folderData;
        }
    },
    getters: {        
        folderData: (state) => {
            return state.folderData;
        }
    }
}