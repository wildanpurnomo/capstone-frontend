<template>
  <div class="tambah">
    <v-container>
      <v-card class="py-5 px-10" elevation="4">
        <h1 class="display-1 font-weight-bold text-center">Upload Dokumen</h1>
        <p class="text-center pb-3">
          Folder: {{ convertSlugIntoTitleCase(this.$route.params.folderSlug) }}
        </p>

        <v-form>
          <v-data-table
            :headers="headers"
            :items="docs.documents"
            :items-per-page="15"
            :loading="loading"
            loading-text="Sedang mengambil data"
          >
            <template v-slot:top>
              <v-toolbar flat>
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
                      <v-btn color="blue darken-1" text @click="close"
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
              <p>{{ utcToIndonesiaFormat(value) }}</p>
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
import slugMixin from "@/mixins/slugMixin";
import dateMixin from "@/mixins/dateMixin";
import Snackbar from "@/components/Snackbar";

export default {
  components: { Snackbar },

  data() {
    return {
      dialog: false,
      dialogDelete: false,
      loading: false,
      errorMessage: "",
      editedIndex: -1,
      documentsUpload: [],
      toBeDeletedDocument: {},
      headers: [
        { text: "Nama Dokumen", value: "documentOriginalName" },
        { text: "Tanggal Diunggah", value: "updatedAt" },
        { text: "", value: "actions", sortable: false },
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
      val || this.close();
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
    async getDocument() {
      this.loading = true;
      try {
        let folderSlug = this.$route.params.folderSlug;
        let response = await this.$store.dispatch(
          "document/getDocuments",
          folderSlug
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
      formData.set("folderId", this.docs.folderId);
      this.documentsUpload.forEach((item) => {
        formData.append("docs", item);
      });
      try {
        let response = await this.$store.dispatch("document/upload", formData);
        if (response.status === 200) {
          this.errorMessage = "";
          this.getDocument();
        }
      } catch (error) {
        let message = this.decryptError(error);
        EventBus.$emit("onShowSnackbar", message);
      }
      this.loading = false;
      this.close();
    },

    deleteItem(item) {
      this.toBeDeletedDocument = item;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        let response = await this.$store.dispatch("document/delete", this.toBeDeletedDocument._id);

        if (response.status === 200) {
          this.getDocument();
        }
      } catch (error) {
        let message = this.decryptError(error);
        this.loading = false;
        EventBus.$emit("onShowSnackbar", message);
      }

      this.close();
    },

    async submit() {
      try {
        EventBus.$emit("onShowSnackbar", "Melakukan cek kemiripan...");
        let request = {
          folderId: this.docs.folderId,
          documents: this.docs.documents.map((item) => {
            return item.documentUrl;
          }),
        };

        let response = await this.$store.dispatch("analytics/analyze", request);

        if (response.status === 200) {
          this.$router.push({
            name: "Result",
            params: { folderSlug: this.$route.params.folderSlug },
          });
        }
      } catch (error) {
        let message = this.decryptError(error);
        this.loading = false;
        EventBus.$emit("onShowSnackbar", message);
      }
    },

    close() {
      this.dialog = false;
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.documentsUpload = [];
        this.toBeDeletedDocument = {};
        this.editedIndex = -1;
      });
    },
  },

  created() {
    this.getDocument();
  },

  mixins: [loggerMixin, slugMixin, dateMixin],
};
</script>
