<template>
  <div>
    <v-container>
      <v-card class="py-5 px-10" elevation="4">
        <h1 class="display-1 font-weight-bold text-center">
          Submisi di {{ this.$route.params.courseWorkName }}
        </h1>

        <v-form>
          <v-data-table
            :headers="headers"
            :items="submissionList"
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
              </v-toolbar>
            </template>

            <template v-slot:[`item.assignmentSubmission`]="{ value }">
              <p>{{ value.attachments[0].driveFile.title }}</p>
            </template>

            <template v-slot:[`item.updateTime`]="{ value }">
              <p>{{ dateToString(value) }}</p>
            </template>

            <template v-slot:no-data>
              <v-btn color="primary" @click="getCourseSubmission">Muat ulang</v-btn>
            </template>
          </v-data-table>

          <v-btn class="green white--text">
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
        { text: "Judul", value: "assignmentSubmission" },
        { text: "Tanggal Pembaruan", value: "updateTime" },
      ],
      rules: {
        required: (val) => val.length > 0 || "Harus diisi",
        numeric: (val) => /[0-9]/.test(val) || "Masukkan hanya angka",
        percent: (val) => (val <= 100 && val >= 0) || "Input 0-100",
      },
    };
  },

  computed: {
    submissionList() {
      return this.$store.getters["classroom/courseSubmissionList"];
    },
  },

  methods: {
    getCourseSubmission() {
      this.$store.dispatch("classroom/getCourseSubmissionList", {
        courseId: this.$route.params.courseId,
        courseWorkId: this.$route.params.courseWorkId,
      });
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
      this.getCourseSubmission();
    });
  },
  mixins: [loggerMixin],
};
</script>
