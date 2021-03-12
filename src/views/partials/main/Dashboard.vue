<template>
  <div class="Dashboard">
    <v-container>
      <v-card class="py-5 px-4" elevation="4">
        <h1 class="display font-weight-bold text-center">Dashboard</h1>

        <v-card-title> </v-card-title>

        <v-data-table
          :headers="headers"
          :items="folderItems"
          :items-per-page="10"
          :search="search"
          :loading="loading"
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
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    <v-icon left>mdi-plus</v-icon>
                    <span>Folder Baru</span>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title
                    ><span class="headline">{{ formTitle }}</span></v-card-title
                  >
                  <v-card-text>
                    <v-container>
                      <v-text-field
                        v-model="editedItem.folderName"
                        label="Nama Folder"
                      ></v-text-field>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Batal</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save"
                      >Simpan</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    ><span class="mx-auto"
                      >Apakah anda ingin menghapus folder ini?</span
                    ></v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Batal</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >Hapus</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small class="mr-2" @click="deleteItem(item)"
              >mdi-delete</v-icon
            >
            <v-icon small @click="folderDetail(item)"
              >mdi-arrow-right-circle</v-icon
            >
          </template>

          <template v-slot:[`item.updatedAt`]="{ value }">
            <p>{{ dateToString(value) }}</p>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Muat ulang</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <Snackbar :duration="3000" />
  </div>
</template>

<script>
import folderModel from "@/models/folderModel";
import loggerMixin from "@/mixins/loggerMixin";
import { EventBus } from "@/bus";
import Snackbar from "@/components/Snackbar";

export default {
  components: { Snackbar },

  data() {
    return {
      folder: new folderModel(),
      editedItem: new folderModel(),
      dialog: false,
      dialogDelete: false,
      search: "",
      loading: false,
      editedIndex: -1,
      errorMessage: "",
      folderItems: [],
      headers: [
        { text: "Nama Folder", value: "folderName" },
        { text: "Tanggal Modifikasi", value: "updatedAt" },
        { text: "Aksi", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Folder Baru" : "Edit Folder";
    },
    userId() {
      return this.$store.getters["auth/userData"]._id;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.folderItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.folderItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async initialize() {
      this.folder.creatorId = this.userId;
      this.editedItem.creatorId = this.userId;
      await this.getFolder();
      this.folderItems = this.$store.getters["folder/folderData"];
    },
    async getFolder() {
      this.loading = true;
      try {
        let response = await this.$store.dispatch("folder/getFolder");
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
    async deleteItemConfirm() {
      try {
        let response = await this.$store.dispatch(
          "folder/delete",
          this.editedItem
        );
        if (response.status === 200) {
          this.initialize();
        }
      } catch (error) {
        let message = this.decryptError(error);
        EventBus.$emit("onShowSnackbar", message);
      }
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, folderModel);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, folderModel);
        this.editedIndex = -1;
      });
    },
    async save() {
      this.loading = true;
      if (this.editedIndex < 0) {
        try {
          let response = await this.$store.dispatch(
            "folder/create",
            this.editedItem
          );
          if (response.status === 200) {
            this.errorMessage = "";
            this.initialize();
            this.loading = false;
          }
        } catch (error) {
          let message = this.decryptError(error);
          EventBus.$emit("onShowSnackbar", message);
          this.loading = false;
        }
      } else {
        try {
          let response = await this.$store.dispatch(
            "folder/edit",
            this.editedItem
          );
          if (response.status === 200) {
            console.log(response);
            this.initialize();
            this.loading = false;
          }
        } catch (error) {
          let message = this.decryptError(error);
          this.loading = false;
          EventBus.$emit("onShowSnackbar", message);
        }
      }
      this.close();
    },
    folderDetail(item) {
      const id = item._id;
      this.$router.push({ name: "Folder", params: { folderId: id } });
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
  },
  
  created() {
    this.initialize();
    EventBus.$on("onAuthenticated", () => {
      this.initialize();
    });
  },
  mixins: [loggerMixin],
};
</script>