<template>
  <div class="tambah">
    
    <v-container>
      <v-card 
      class="py-5 px-10"
      elevation="4"
      >
        <h1 class="display-1 font-weight-bold text-center pb-3">Input File</h1>

        <v-form>
          <v-text-field 
            label="Nama Folder" 
            v-model="folder" 
            :rules="rules.required"
            dense
            outlined>
          </v-text-field>

          <v-file-input
            chips
            v-model="files"
            prepend-inner-icon="mdi-file-document-multiple-outline"
            prepend-icon=""
            multiple 
            :rules="rules.required"
            truncate-lenght="20" 
            label="Unggah file" 
            outlined>
          </v-file-input>
          <!-- control button upload file -->
          <v-btn class="primary mb-4">
            <v-icon color="white">mdi-google-drive</v-icon>
          </v-btn>

          <div class="d-flex">
            <v-text-field 
            label="Nomor yang diuji"
            v-model="nomor"
            required 
            dense
            hint="Default semua nomor"
            persistent-hint
            outlined>
          </v-text-field>
          <v-spacer></v-spacer>
          <v-text-field 
            label="Toleransi kemiripan (%)"
            v-model="threshold"
            required 
            dense
            hint="Default 10%"
            persistent-hint
            outlined>
          </v-text-field> 
          </div>
          
          <v-btn class="green white--text" @click="submit" router to="/Result"> 
            <v-icon left color="white">mdi-magnify</v-icon> 
            <span>Cek Kemiripan</span>
          </v-btn> 
        </v-form>

      </v-card>
    </v-container>

  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data(){
    return{
      folder: "",
      files: [],
      nomor: "",
      threshold: undefined,
      rules: {
        required: [val => (val || '').length > 0 || 'This field is required']
      }
    }
  },
  methods: {
    submit(){
      console.log(this.folder, this.files, this.nomor, this.threshold);
    }
  }
}
</script>
