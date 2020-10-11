<template>
  <div class="Dashboard">

    <v-container>
      <v-card
      class="py-5 px-4"
      elevation="4">
        <h1 class="display font-weight-bold text-center">Riwayat</h1>
        
        <v-card-title>
          <v-btn color="green white--text" router to="/tambah_baru">
          <v-icon left color="white">mdi-plus</v-icon>
          <span>Cek Jawaban Baru</span>
        </v-btn>
        <v-spacer></v-spacer>
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
        </v-card-title>
        

        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
        ></v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      search:'',
      headers:[
        {text: 'Nama Folder', sortable: false, value: 'folder'},
        {text: 'Tanggal', value: 'tanggal'}
      ],
      items:[
      ]
    }
  }
}
</script>