export default {
    methods: {
        folderName(name) {
            if (!name){
                return "";
            } else if(name[name.length - 1] === 'x'){
                return name.slice(0, -5)
            } else{
                return name.slice(0, -4);
            }
        }
    }
}