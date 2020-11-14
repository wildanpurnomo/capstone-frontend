<template>
  <div class="Dashboard">

    <v-container>
      <v-card
      class="py-5 px-4"
      elevation="4">
        <h1 class="display font-weight-bold text-center">Dashboard</h1>
        
        <v-card-title>
        </v-card-title> 

        <v-data-table
          :headers="headers"
          :items="folders"
          :items-per-page="10"
          :search="search"
          loading-text="Sedang mengambil data"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search"
                outlined
                clearable
                dense
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    
                  >
                    <v-icon left>mdi-plus</v-icon> 
                    <span>Folder Baru</span>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title><span class="headline">{{ formTitle }}</span></v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-text-field
                        v-model="folderName"
                        label="Folder Name"
                      ></v-text-field>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Batal
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Simpan
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">Apakah anda ingin menghapus folder ini?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
                    <v-btn color="blue darken-1" text @click="hapus">Hapus</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
            <v-icon small @click="detailFolder(item)">mdi-arrow-right-circle</v-icon>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Muat ulang</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import folderModel from "@/models/folderModel";

export default {
  data(){
    return{
      folder: new folderModel(),
      dialog: false,
      dialogDelete: false,
      search:'',
      editedIndex: -1,
      folderName: '',
      headers:[
        {text: 'Nama Folder', value: 'folderName'},
        {text: 'Tanggal', value: 'createdAt'},
        {text: 'Aksi', value: 'actions', sortable: false}
      ]
    }
  },
  computed:{
    formTitle(){
      return this.editedIndex === -1? 'Folder Baru' : 'Edit Folder'
    },
    folders(){
      return this.$store.getters.get;
    }
  },
  created:{
    //load table data here
  },
  watch:{
    dialog(val){
      val || this.close()
    },
    dialogDelete(val){
      val || this.closeDelete()
    }
  },
  methods:{
    /*editItem(item){
      this.editedIndex = ''//index item

      this.dialog = true
    },
    deleteItem(item){
      this.editedIndex = ''//index item

      this.dialogDelete = true
    },*/
    initialize(){
      //initialize folder here
    },
    deleteItemConfirm(){
      //delete item here
      this.closeDelete()
    },
    close(){
      this.dialog = false
      this.$$nextTick (() => {
        this.editedIndex = -1
        
      })
    },
    closeDelete(){
      this.dialogDelete = false
      this.$nextTick (() => {
        this.editedIndex = -1
      })
    },
    async save(){
      if(this.editedIndex > -1){
        try{
          let response = await this.$store.dispatch("", this.folder);
          if (response.status === 200) {
            //if success
          }
        } catch (error) {
          //error message here
        }
      } else{
        //add item
      }
      this.close()
    }
  }
}
</script>