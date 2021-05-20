<template>
  <div>
    <v-container>
      <v-row>
        <BackBtn/>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="py-5 px-10" elevation="4">
            <h1 class="display-1 font-weight-bold text-center">{{ convertSlugIntoTitleCase(this.$route.params.folderSlug) }}</h1>

            <v-form>
              <v-data-table
                :headers="headers"
                :items="docs.documents"
                :items-per-page="10"
                :loading="loading"
                loading-text="Sedang mengambil data dokumen"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="indigo darken-4" dark v-bind="attrs" v-on="on" rounded>
                          <v-icon left>mdi-plus-thick</v-icon>
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
                          <v-btn color="indigo darken-4" text @click="close"
                            >Batal</v-btn
                          >
                          <v-btn color="indigo darken-4" text @click="upload"
                            >Unggah</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" max-width="600px">
                      <v-card>
                        <v-card-title class="headline"
                          ><span class="mx-auto"
                            >Hapus {{ folderName(toBeDeletedDocument.documentOriginalName) }}?</span
                          >
                        </v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="indigo darken-4" text @click="close"
                            >Batal</v-btn
                          >
                          <v-btn
                            color="indigo darken-4"
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
                  <v-btn icon color="red darken-2" @click="deleteItem(item)"
                    ><v-icon small>mdi-delete</v-icon></v-btn
                  >
                  <a :href="item.documentUrl" target="_blank">
                    <v-btn icon color="indigo darken-2"
                      ><v-icon small>mdi-download</v-icon></v-btn
                    >
                  </a>
                </template>

                <template v-slot:[`item.updatedAt`]="{ value }">
                  <p>{{ utcToIndonesiaFormat(value) }}</p>
                </template>

                <template v-slot:[`item.documentOriginalName`]="{ value }">
                  <p>{{ folderName(value) }}</p>
                </template>

                <template v-slot:no-data>
                  <span>Tidak ada dokumen</span>
                </template>
              </v-data-table>

              <v-row justify="center" class="mt-3">
                <v-btn class="white--text" @click="submit" color="green darken-1" rounded>
                  <v-icon left color="white">mdi-magnify</v-icon>
                  <span>Cek Kemiripan</span>
                </v-btn>
              </v-row>
            </v-form>
            <v-dialog 
              v-model="loadingCheck" 
              max-width="300px" 
              persistent
            >
              <v-card>
                <v-card-text>
                  Melakukan Pengecekan Kemiripan
                  <v-progress-linear 
                    indeterminate
                  ></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Snackbar :duration="3000" />
  </div>
</template>

<script>
import { EventBus } from "@/bus";
import loggerMixin from "@/mixins/loggerMixin";
import slugMixin from "@/mixins/slugMixin";
import dateMixin from "@/mixins/dateMixin";
import folderNameMixin from "@/mixins/folderNameMixin";
import Snackbar from "@/components/Snackbar";
import BackBtn from "@/components/BackBtn";

export default {
  name: "FolderDetail",

  components: { Snackbar, BackBtn },

  data() {
    return {
      dialog: false,
      dialogDelete: false,
      loading: false,
      loadingCheck: false,
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
        this.loadingCheck = true;
        let request = {
          folderId: this.docs.folderId,
          documents: this.docs.documents.map((item) => {
            return item.documentUrl;
          }),
        };

        let response = await this.$store.dispatch("analytics/analyze", request);

        if (response.status === 200) {
          this.loadingCheck = false;
          this.$router.push({
            name: "Result",
            params: { folderSlug: this.$route.params.folderSlug },
          });
        }
      } catch (error) {
        let message = this.decryptError(error);
        this.loadingCheck = false;
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

  mixins: [loggerMixin, slugMixin, dateMixin, folderNameMixin],
};
</script>
