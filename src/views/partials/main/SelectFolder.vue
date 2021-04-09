<template>
  <v-container fill-height>
    <v-row>
      <h1>Pilih Folder</h1>
    </v-row>

    <v-row v-if="folderList.length !== 0">
      <v-col cols="3" v-for="(item, index) in folderList" :key="index">
        <SelectFolderCard
          :folderTitle="item.folderName"
          @click.native="toFolderDetail(item.folderName, item._id)"
        />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <EmptyState
          title="Anda Belum Memiliki Folder Dokumen"
          subtitle="Tambah folder untuk mulai"
        />
      </v-col>
    </v-row>

    <FABAdd
      @click.native="isDialogShown = true"
      tooltipMessage="Tambah Folder"
    />

    <v-dialog v-model="isDialogShown" max-width="500px">
      <v-card>
        <v-card-title
          ><span class="headline">Masukkan Nama Folder Baru</span></v-card-title
        >
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="folderModel.folderName"
              label="Nama Folder"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="isDialogShown = false">Batal</v-btn>
          <v-btn text @click="createFolder">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Snackbar :duration="3000" />
  </v-container>
</template>

<script>
import SelectFolderCard from "@/components/SelectFolderCard";
import FABAdd from "@/components/FABAdd";
import { EventBus } from "@/bus";
import EmptyState from "@/components/EmptyState";
import folderModel from "@/models/folderModel";
import Snackbar from "@/components/Snackbar";

export default {
  name: "SelectFolder",

  methods: {
    toFolderDetail(folderName, folderId) {
      this.$router.push({
        name: "FolderDetail",
        params: { folderId, folderName },
        query: { method: this.$route.query.method },
      });
    },

    getFolder() {
      this.$store.dispatch("folder/getFolder");
    },

    async createFolder() {
      try {
        let response = await this.$store.dispatch(
          "folder/create",
          this.folderModel
        );
        if (response.status === 200) {
          this.getFolder();
          EventBus.$emit("onShowSnackbar", "Folder Berhasil Ditambahkan");
        }
      } catch (error) {
        let message = this.decryptError(error);
        EventBus.$emit("onShowSnackbar", message);
      }

      this.isDialogShown = false;
    },
  },

  data() {
    return {
      isDialogShown: false,
      folderModel: new folderModel(),
    };
  },

  computed: {
    folderList() {
      return this.$store.getters["folder/folderList"];
    },

    user() {
      return this.$store.getters["auth/userData"];
    },
  },

  created() {
    this.folderModel.creatorId = this.user._id;
    this.getFolder();
  },

  components: { SelectFolderCard, FABAdd, EmptyState, Snackbar },
};
</script>