<template>
  <div class="tambah">
    <v-container>
      <v-card class="py-5 px-10" elevation="4">
        <h1 class="display-1 font-weight-bold text-center">Input Dokumen</h1>
        <p class="text-center pb-3">Folder: {{ folder.folderName }}</p>

        <v-form>
          <v-data-table
            :headers="headers"
            :items="docs"
            :items-per-page="15"
            :loading="loading"
            loading-text="Sedang mengambil data"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-text-field
                  label="Toleransi kemiripan (%)"
                  v-model="threshold"
                  :rules="[rules.required, rules.numeric, rules.percent]"
                  hide-details="auto"
                  dense
                  class="shrink"
                  outlined
                >
                </v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      <v-icon left>mdi-plus</v-icon>
                      <span>Unggah Dokumen</span>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title
                      ><span class="headline"
                        >Unggah Dokumen</span
                      ></v-card-title
                    >
                    <v-card-text>
                      <v-container>
                        <v-file-input
                          label="Dokumen"
                          accept=".docx, .doc, .pdf"
                          multiple
                          v-model="documentsUpload"
                          :rules="[rules.required]"
                          counter
                          hint="Ukuran maksimal file 10MB"
                          persistent-hint
                        ></v-file-input>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close"
                        >Batal</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="upload"
                        >Unggah</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="550px">
                  <v-card>
                    <v-card-title class="headline"
                      ><span class="mx-auto"
                        >Apakah anda ingin menghapus dokumen ini?</span
                      >
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Batal</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >Hapus</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon color="red" @click="deleteItem(item)"
                ><v-icon small>mdi-delete</v-icon></v-btn
              >
            </template>

            <template v-slot:[`item.updatedAt`]="{ value }">
              <p>{{ dateToString(value) }}</p>
            </template>

            <template v-slot:no-data>
              <span>Tidak ada dokumen</span>
            </template>
          </v-data-table>

          <v-btn class="green white--text" @click="submit">
            <v-icon left color="white">mdi-magnify</v-icon>
            <span>Cek Kemiripan</span>
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
    <Snackbar :duration="3000" />
  </div>
</template>

<script>
import { EventBus } from "@/bus";
import loggerMixin from "@/mixins/loggerMixin";
import Snackbar from "@/components/Snackbar";

export default {
  components: { Snackbar },
  data() {
    return {
      editedItem: new FormData(),
      dialog: false,
      dialogDelete: false,
      loading: false,
      threshold: 10,
      errorMessage: "",
      editedIndex: -1,
      documentsUpload: [],
      headers: [
        { text: "Nama Dokumen", value: "documentOriginalName" },
        { text: "Tanggal Diunggah", value: "updatedAt" },
        { text: "Aksi", value: "actions", sortable: false },
      ],
      rules: {
        required: (val) => val.length > 0 || "Harus diisi",
        numeric: (val) => /[0-9]/.test(val) || "Masukkan hanya angka",
        percent: (val) => (val <= 100 && val >= 0) || "Input 0-100",
      },
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    folder() {
      return this.$store.getters["folder/folderData"];
    },
    docs() {
      return this.$store.getters["document/documentData"];
    },
  },
  methods: {
    async initialize() {
      await this.getDocument();
    },
    async getDocument() {
      this.loading = true;
      try {
        let folderId = this.$route.params.folderId;
        let response = await this.$store.dispatch(
          "document/getDocuments",
          folderId
        );
        if (response.status === 200) {
          this.errorMessage = "";
          this.loading = false;
        }
      } catch (error) {
        let message = this.decryptError(error);
        this.loading = false;
        EventBus.$emit("onShowSnackbar", message);
      }
    },
    async upload() {
      this.loading = true;
      let formData = new FormData();
      formData.set("creatorId", this.folder.creatorId);
      formData.set("folderId", this.folder._id);
      this.documentsUpload.forEach((item) => {
        formData.append("docs", item);
      });
      try {
        let response = await this.$store.dispatch("document/upload", formData);
        if (response.status === 200) {
          this.errorMessage = "";
        }
      } catch (error) {
        let message = this.decryptError(error);
        EventBus.$emit("onShowSnackbar", message);
      }
      this.loading = false;
      this.close();
    },
    deleteItem(item) {
      this.editedIndex = this.docs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      console.log("delete on progress");
      //deleteItem
      this.closeDelete();
    },
    dateToString(date) {
      var d = new Date(date);
      var option = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return d.toLocaleDateString("id", option);
    },
    submit() {
      let item = {
        threshold: this.threshold / 100,
        documents: this.docs,
        folderName: this.folder.folderName,
      };
      let id = this.$route.params.folderId;
      this.$router.push({ name: "Result", params: { item: item, folderId: id } });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.documentsUpload = [];
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = new FormData();
        this.editedIndex = -1;
      });
    },
  },
  created() {
    this.initialize();
  },
  mixins: [loggerMixin],
};
</script>
