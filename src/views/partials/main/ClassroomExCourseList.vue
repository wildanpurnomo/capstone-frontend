<template>
  <div>
    <v-container>
      <v-card class="py-5 px-4" elevation="4">
        <h1 class="display font-weight-bold text-center">Daftar Kursus Classroom Anda</h1>

        <v-data-table
          :headers="headers"
          :items="courseList"
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
            </v-toolbar>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="toCourseWorkList(item)"
              >mdi-arrow-right-circle</v-icon>
          </template>

          <template v-slot:[`item.updateTime`]="{ value }">
            <p>{{ dateToString(value) }}</p>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="getCourseList">Muat ulang</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <Snackbar :duration="3000" />
  </div>
</template>

<script>
import loggerMixin from "@/mixins/loggerMixin";
import { EventBus } from "@/bus";
import Snackbar from "@/components/Snackbar";

export default {
  components: { Snackbar },

  data() {
    return {
      search: "",
      loading: false,
      errorMessage: "",
      headers: [
        { text: "Nama Kursus", value: "name" },
        { text: "Tanggal Sunting", value: "updateTime" },
        { text: "Kode Kursus", value: "enrollmentCode"},
        { text: "Aksi", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    courseList() {
        return this.$store.getters["classroom/courseList"];
    }
  },

  methods: {
    getCourseList() {
        this.$store.dispatch("classroom/getCourseList");
    },

    toCourseWorkList(item) {
      this.$router.push({ name: "ClassroomCourseWorkList", params: { courseName: item.name, courseId: item.id } });
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
    EventBus.$on("onAuthenticated", () => {
      this.getCourseList();
    });
  },    

  mixins: [loggerMixin],
};
</script>