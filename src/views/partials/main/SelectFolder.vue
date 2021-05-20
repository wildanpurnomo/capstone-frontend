<template>
  <v-container fill-height>
    <v-row>
      <BackBtn/>
    </v-row>
    <v-row>
      <h1>Folder Saya</h1>
      <v-spacer></v-spacer>
      <v-divider vertical v-show="folderIndex !== -1"></v-divider>
      <div class="mt-auto" v-show="folderIndex !== -1">
        <v-btn icon @click="menuActionClick('delete')" class="ml-1"
          ><v-icon>mdi-trash-can-outline</v-icon></v-btn
        >
        <v-btn icon @click="menuActionClick('changeName')" class="ml-1"
          ><v-icon>mdi-pencil-outline</v-icon></v-btn
        >
      </div>
    </v-row>

    <v-row v-if="folderList.length !== 0">
      <v-col cols="6" sm="3" v-for="(item, index) in folderList" :key="index">
        <SelectFolderCard
          :folderTitle="item.folderName"
          :folder="true"
          @contextmenu.prevent.native="show(item, $event)"
          @click.native="selectFolder(item)"
          @dblclick.native="toFolderDetail(item.folderName, item._id)"
          :class="{ selected: folderIndex === index }"
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
          subtitle="Buat folder dengan klik tombol di kanan bawah"
        />
      </v-col>
    </v-row>

    <v-row v-show="loadingCourse">
      <v-divider></v-divider>
    </v-row>

    <v-row v-show="loadingCourse" justify="center">
      <v-progress-circular
        indeterminate
        class="mt-5"
        size="64"
        color="blue-grey"
        width="6"
      ></v-progress-circular>
    </v-row>

    <v-row v-show="courseList.length !== 0 && !loadingCourse && this.user.isUsingGoogleAuth">
      <v-divider></v-divider>
    </v-row>

    <v-row v-show="courseList.length !== 0 && !loadingCourse && this.user.isUsingGoogleAuth">
      <h1>Kelas Google Classroom</h1>
      <v-spacer></v-spacer>
    </v-row>

    <v-row v-show="courseList.length !== 0 && !loadingCourse && this.user.isUsingGoogleAuth">
      <v-col cols="6" sm="3" v-for="(item, index) in courseList" :key="index">
        <SelectFolderCard
          :folderTitle="item.name"
          :googleClass="true"
          @click.native="selectClass(index)"
          @dblclick.native="showClassWork(item)"
          :class="{ selected: classIndex === index }"
        />
      </v-col>
    </v-row>

    <FABAdd
      @click.native="isDialogEditShown = true"
      tooltipMessage="Tambah Folder"
    />

    <v-dialog
      v-model="isDialogEditShown"
      max-width="500px"
      @click:outside="close"
    >
      <v-card>
        <v-card-title>
          <span class="headline" v-if="folderIndex === -1"
            >Masukkan Nama Folder Baru</span
          >
          <span class="headline" v-else>Ganti Nama Folder</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="newFolderName"
              @keyup.enter="editFolder"
              label="Nama Folder"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close">Batal</v-btn>
          <v-btn text @click="editFolder">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="isDialogWorkShown"
      max-width="500px"
      transition="dialog-bottom-transition"
      @click:outside="close"
    >
      <v-card>
        <v-btn icon @click="close" plain>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title class="pt-0">
          <span class="headline mx-auto">{{ className }}</span>
        </v-card-title>
        <v-card-text>
          <v-progress-linear
            indeterminate
            color="#394867"
            :active="loading"
          ></v-progress-linear>
          <v-row v-for="(item, index) in courseWorkList" :key="index" justify="center" v-show="accessClassroom && !loading">
            <v-col cols="12" class="py-1 px-0" style="cursor: pointer">
              <SelectFolderCard
                :folderTitle="item.title"
                :clipboard="true"
                :creationTime="item.creationTime"
                @click.native="toSubmissionDetail(item)"
              />
            </v-col>
          </v-row>
          <v-row v-if="accessClassroom && !courseWorkList && !loading" justify="center">
            <h3>Tidak Ada Pengumpulan Tugas Dalam Kelas Ini</h3>
          </v-row>
          <v-row v-else-if="!accessClassroom && !loading" justify="center">
            <h3>Anda Tidak Punya Akses Untuk Pengumpulan Tugas Kelas Ini</h3>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="isDialogDeleteShown"
      max-width="400px"
      @click:outside="close"
    >
      <v-card>
        <v-card-title
          ><span class="headline mx-auto"
            >Hapus Folder {{ newFolderName }}?</span
          ></v-card-title
        >
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
import loggerMixin from "@/mixins/loggerMixin";
import BackBtn from "@/components/BackBtn"

export default {
  name: "SelectFolder",

  data() {
    return {
      folderModel: new folderModel(),
      isDialogEditShown: false,
      isDialogDeleteShown: false,
      isDialogWorkShown: false,
      loading: false,
      loadingCourse: false,
      folderIndex: -1,
      newFolderName: "",
      classIndex: -1,
      className: "",
      accessClassroom: true,
      showMenu: false,
      editedItem: Object,
      x: 0,
      y: 0,
      menus: [
        {
          title: "Ganti nama",
          icon: "mdi-pencil-outline",
          action: "changeName",
        },
        { 
          title: "Hapus", 
          icon: "mdi-trash-can-outline", 
          action: "delete" 
        },
      ],
    };
  },

  methods: {
    toFolderDetail(folderName) {
      this.$router.push({
        name: "FolderDetail",
        params: {
          folderSlug: folderName.trim().replace(/\s+/g, "-").toLowerCase(),
        },
        query: { method: this.$route.query.method },
      });
    },

    resetForm() {
      this.folderModel = {};
    },

    getFolder() {
      this.$store.dispatch("folder/getFolder");
      this.resetForm();
    },

    async editFolder() {
      this.folderModel.folderName = this.newFolderName;
      let message = "";
      let response = Object;
      try {
        if (this.folderIndex === -1) {
          response = await this.$store.dispatch(
            "folder/create",
            this.folderModel
          );
          message = "Folder Berhasil Ditambahkan";
        } else {
          response = await this.$store.dispatch(
            "folder/edit",
            this.folderModel
          );
          message = "Berhasil Mengganti Nama Folder";
        }
        if (response.status === 200) {
          this.getFolder();
          EventBus.$emit("onShowSnackbar", message);
        }
      } catch (error) {
        let message = this.decryptError(error);
        EventBus.$emit("onShowSnackbar", message);
      }
      this.close();
    },

    selectFolder(item) {
      this.classIndex = -1;
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
        this.showMenu = true;
      });
    },

    menuActionClick(action) {
      this.newFolderName = this.folderModel.folderName;
      if (action === "changeName") {
        this.isDialogEditShown = true;
      } else if (action === "delete") {
        this.isDialogDeleteShown = true;
      }
    },

    close() {
      this.isDialogEditShown = false;
      this.isDialogDeleteShown = false;
      this.isDialogWorkShown = false;
      this.$nextTick(() => {
        this.folderModel = Object.assign({}, folderModel);
        this.newFolderName = "";
        this.folderIndex = -1;
        this.accessClassroom = true;
      });
    },

    selectClass(index) {
      this.folderIndex = -1;
      this.classIndex = index;
    },

    showClassWork(item) {
      this.getCourseWorkList(item);
      this.className = item.name;
      this.isDialogWorkShown = true;
    },

    toSubmissionDetail(item) {
      let folderName = item.title;
      this.$router.push({
        name: "SubmissionDetail",
        params: {
          folderSlug: folderName.trim().replace(/\s+/g, "-").toLowerCase(),
          item: item,
        },
        query: { method: this.$route.query.method },
      });
    },

    async getCourseList() {
      this.loadingCourse = true;
      try {
        let response = await this.$store.dispatch("classroom/getCourseList");
        if (response.status === 200) {
          this.loadingCourse = false;
        }
      } catch (error) {
        let message = this.decryptError(error);
        EventBus.$emit("onShowSnackbar", message);
      }
    },

    async getCourseWorkList(item) {
      this.loading = true;
      try {
        await this.$store.dispatch(
          "classroom/getCourseWorkList",
          item.id
        );
      } catch (error) {
        let message = this.decryptError(error);
        EventBus.$emit("onShowSnackbar", message);
        this.accessClassroom = false;
      }
      this.loading = false;
    },

    async deleteFolder() {
      try {
        let response = await this.$store.dispatch(
          "folder/delete",
          this.folderModel._id
        );
        if (response.status === 200) {
          this.getFolder();
          EventBus.$emit("onShowSnackbar", "Folder Berhasil Dihapus");
        }
      } catch (error) {
        let message = this.decryptError(error);
        EventBus.$emit("onShowSnackbar", message);
      }
      this.close();
    },
  },

  computed: {
    folderList() {
      return this.$store.getters["folder/folderList"];
    },

    user() {
      return this.$store.getters["auth/userData"];
    },

    courseList() {
      return this.$store.getters["classroom/courseList"];
    },

    courseWorkList() {
      return this.$store.getters["classroom/courseWorkList"];
    },
  },

  created() {
    this.folderModel.creatorId = this.user._id;
    this.getFolder();
    if (this.user.isUsingGoogleAuth) {
      this.getCourseList();
    }
  },

  components: { SelectFolderCard, FABAdd, EmptyState, Snackbar, BackBtn },

  mounted() {
    EventBus.$on("onAuthenticated", () => {
      if (this.user.isUsingGoogleAuth) {
        this.getCourseList();
      }
    });
  },

  mixins: [loggerMixin],
};
</script>

<style scoped>
.selected {
  background-color: rgba(0, 147, 237, 0.2);
}
</style>