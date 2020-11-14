import FolderService from '@/services/folderService';
import FolderModel from '@/models/folderModel';

const folderState = { folder: new FolderModel()};

export const folder = {
    state: folderState,
    actions:{
        create({ commit }, folderData){
            return FolderService.addNew(folderData)
                .then(
                    response => {
                        commit('createSuccess', response.data.data.folderData);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        // edit({ commit }, folderData){
        //     return FolderService.edit(folderData)
        //         .then()
        // },
        delete({ commit }){
            return FolderService.delete()
                .then(
                    response => {
                        commit('deleteSuccess');
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
        }
    },
    getters: {        
        // get({ commit }, userID){
        //     return FolderService.get(userID)
        //         .then()
        // }
    }
}