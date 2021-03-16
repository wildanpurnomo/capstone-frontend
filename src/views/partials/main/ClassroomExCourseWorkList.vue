<template>
  <div>
    <v-container>
      <v-card class="py-5 px-10" elevation="4">
        <h1 class="display-1 font-weight-bold text-center">
          Tugas Peserta Kursus {{ this.$route.params.courseName }}
        </h1>

        <v-form>
          <v-data-table
            :headers="headers"
            :items="courseWorkList"
            :items-per-page="15"
            :loading="loading"
            loading-text="Sedang mengambil data"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="toSubmission(item)"
                >mdi-arrow-right-circle</v-icon
              >
            </template>

            <template v-slot:[`item.updateTime`]="{ value }">
              <p>{{ dateToString(value) }}</p>
            </template>

            <template v-slot:no-data>
              <v-btn color="primary" @click="getCourseWorkList">Muat ulang</v-btn>
            </template>
          </v-data-table>
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
      loading: false,
      errorMessage: "",
      headers: [
        { text: "Judul Tugas", value: "title" },
        { text: "Tanggal Pembaruan", value: "updateTime" },
        { text: "Aksi", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    courseWorkList() {
      return this.$store.getters["classroom/courseWorkList"];
    },
  },

  methods: {
    getCourseWorkList() {
      this.$store.dispatch(
        "classroom/getCourseWorkList",
        this.$route.params.courseId
      );
    },

    toSubmission(item) {
      this.$router.push({ name: "ClassroomCourseWorkSubmissionList", params: { 
        courseWorkName: item.title,
        courseId: this.$route.params.courseId,
        courseWorkId: item.id
      }})
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
      this.getCourseWorkList();
    });
  },

  mixins: [loggerMixin],
};
</script>
