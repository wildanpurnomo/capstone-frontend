export default class documentModel {
    constructor(creatorId = '', folderId = '', docs){
        this.docs = docs;
        this.creatorId = creatorId;
        this.folderId = folderId;
    }
}