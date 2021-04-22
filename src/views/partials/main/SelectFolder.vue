<template>
  <v-container fill-height>
    <v-row>
      <h1>Pilih Folder</h1>
      <v-spacer></v-spacer>
      <div class="mt-auto" v-show="folderIndex !== -1">
        <v-btn icon @click="menuActionClick('delete')"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
        <v-btn icon @click="menuActionClick('changeName')"><v-icon>mdi-pencil-outline</v-icon></v-btn>
      </div>
    </v-row>

    <v-row v-if="folderList.length !== 0">
      <v-col cols="3" v-for="(item, index) in folderList" :key="index">
        <SelectFolderCard
          :folderTitle="item.folderName"
          @contextmenu.prevent.native="show(item, $event)"
          @click.native="selectFolder(item, index)"
          @dblclick.native="toFolderDetail(item.folderName, item._id)"
          :class="{ selected: folderIndex===index }"
        />
      </v-col>
        <v-menu
          v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          offset-y
        >
          <v-list>
            <v-list-item
              v-for="(menu, index) in menus"
              :key="index"
              link
              @click="menuActionClick(menu.action)"
            >
              <v-list-item-icon class="mr-3">
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title> {{ menu.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
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

    <v-dialog 
      v-model="isDialogShown" 
      max-width="500px"
      @click:outside="close"
    >
      <v-card>
        <v-card-title>
          <span class="headline" v-if="folderIndex === -1">Masukkan Nama Folder Baru</span>
          <span class="headline" v-else>Ganti Nama Folder</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="newFolderName"
              label="Nama Folder"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close">Batal</v-btn>
          <v-btn text @click="createFolder" v-if="folderIndex === -1">Simpan</v-btn>
          <v-btn text @click="renameFolder" v-else>Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="isDialogDeleteShown"
      max-width="400px"
      @click:outside="close"
    >
      <v-card>
        <v-card-title><span class="headline mx-auto">Hapus Folder {{ newFolderName }}?</span></v-card-title>
        <v-card-actions>
          <v-btn text @click="close">Batal</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteFolder">Hapus</v-btn>
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
      this.folderModel.folderName = this.newFolderName;
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
      this.close();
    },

    selectFolder(item) {
      this.folderModel = item;
      this.folderIndex = this.folderList.indexOf(this.folderModel);
    },

    show(item, e) {
      this.showMenu = false;
      this.folderModel = item;
      this.folderIndex = this.folderList.indexOf(this.folderModel);
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true
      });
    },

    menuActionClick(action) {
      this.newFolderName = this.folderModel.folderName;
      if (action === 'changeName'){
        this.isDialogShown = true;
      } else if (action === 'delete'){
        this.isDialogDeleteShown = true;
      }
    },

    async renameFolder() {
      this.folderModel.folderName = this.newFolderName;
      try {
        let response = await this.$store.dispatch(
          "folder/edit",
          this.folderModel
        );
        if (response.status === 200) {
          this.getFolder();
          EventBus.$emit("onShowSnackbar", "Berhasil Ganti Nama Folder");
        }
      } catch (error) {
        let message = this.decryptError(error);
        EventBus.$emit("onShowSnackbar", message);
      }
      this.close();
    },

    async deleteFolder() {
      try {
        let response = await this.$store.dispatch(
          "folder/delete",
          this.folderModel
        );
        if (response.status === 200) {
          this.getFolder();
          EventBus.$emit("onShowSnackbar", "Berhasil Menghapus Folder");
        }
      } catch (error) {
        let message = this.decryptError(error);
        EventBus.$emit("onShowSnackbar", message);
      }
      this.close();
    },

    close() {
      this.isDialogShown = false; 
      this.isDialogDeleteShown = false;
      this.$nextTick(() => {
        this.folderModel = Object.assign({}, folderModel);
        this.newFolderName = '';
        this.folderIndex = -1;
      });
    }
  },

  data() {
    return {
      isDialogShown: false,
      isDialogDeleteShown: false,
      folderModel: new folderModel(),
      folderIndex: -1,
      newFolderName: "",
      addMenus: [
        { title: 'Folder Baru', icon: 'mdi-folder-plus-outline', action: 'new' },
        { title: 'Google Classroom', icon: 'mdi-google-classroom', action: 'gClass' },
      ],
      showMenu: false,
      editedItem: Object,
      x: 0,
      y: 0,
      menus: [
        { title: 'Ganti nama', icon: 'mdi-pencil-outline', action: 'changeName' },
        { title: 'Hapus', icon: 'mdi-trash-can-outline', action: 'delete' },
      ],
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

<style scoped>
  .selected {
    background-color: rgba(0, 147, 237, 0.2);
  }
</style>