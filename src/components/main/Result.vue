<template>
  <div class="hasil">
    <v-container>
      <v-card class="py-5 px-10" elevation="4">
        <h1 class="display-1 font-weight-bold text-center pb-3">
          Hasil Pengecekan
        </h1>

        <v-card-title>{{ folderDetail.folderName }} </v-card-title>
        <v-card-text
          >Threshold: {{ folderDetail.threshold * 100 }}%<br />yang mengandung
          plagiasi</v-card-text
        >

        <v-data-table :headers="headers" :items="analytics.report">
          <template v-slot:[`item.detail`]="{ item }">
            <v-btn icon color="blue" @click="detail(item)"
              ><v-icon>mdi-magnify</v-icon></v-btn
            >
          </template>

          <template v-slot:[`item.similarity`]="{ item }">
            <v-progress-circular
              rotate="-90"
              color="red"
              size="54"
              width="5"
              :value="item.similarity"
              class="my-1"
            >
              <span> {{ item.similarity }}% </span>
            </v-progress-circular>
          </template>
        </v-data-table>

        <v-btn router to="/Main" class="green white--text">
          <v-icon left>mdi-arrow-left</v-icon>
          <span>Kembali</span>
        </v-btn>

        <v-dialog v-model="dialogLoading" persistent max-width="300">
          <v-card style="height: 200px" class="text-center">
            <v-card-title class="mb-2">Dalam proses pengecekan</v-card-title>
            <v-progress-circular
              indeterminate
              color="primary"
              size="100"
              width="6"
            >
            </v-progress-circular>
          </v-card>
        </v-dialog>
      </v-card>

      <!-- Detail Pengecekan Dokumen -->
      <v-card class="py-5 px-10 my-10" elevation="4">
        <h1 class="display-1 font-weight-bold text-center pb-3">
          Detail Pengecekan
        </h1>

        <div class="text-center font-weight-bold headline">
          <v-progress-circular
            color="red"
            :value="detailSimilarity"
            rotate="-90"
            size="100"
            width="10"
            class="my-2"
          >
            {{ detailSimilarity }}%
          </v-progress-circular>
        </div>

        <v-card-text>Pratinjau dokumen 1</v-card-text>
        <iframe
          :src="firstGdocUrl"
          height="450px"
          frameborder="0"
          width="100%"
        ></iframe>

        <v-card-text>Pratinjau dokumen 2</v-card-text>
        <iframe
          :src="secondGdocUrl"
          height="450px"
          frameborder="0"
          width="100%"
        ></iframe>

        <!-- download button -->
        <div class="d-flex pa-5">
          <v-spacer></v-spacer>
          <v-btn color="primary">
            <v-icon left>mdi-file-pdf</v-icon>
            <span>Download Laporan PDF</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary">
            <v-icon left>mdi-file-word</v-icon>
            <span>Download Laporan Word</span>
          </v-btn>
          <v-spacer></v-spacer>
        </div>
      </v-card>
    </v-container>
    <Snackbar :duration="3000" />
  </div>
</template>

<script>
import { EventBus } from "@/bus";
import loggerMixin from "@/mixins/loggerMixin";
import Snackbar from "@/components/basic/Snackbar";

export default {
  components: { Snackbar },
  data() {
    return {
      headers: [
        { text: "Dokumen 1", value: "firstDocName" },
        { text: "Dokumen 2", value: "secondDocName", sortable: false },
        { text: "Kemiripan", value: "similarity" },
        { text: "Detail", value: "detail", sortable: false },
      ],
      messageReport: "",
      googleDocViewer: "https://docs.google.com/viewer?url=",
      firstGdocUrl: "",
      secondGdocUrl: "",
      detailSimilarity: 0,
      dialogLoading: true,
    };
  },
  computed: {
    folderDetail() {
      return this.$route.params.item;
    },
    analytics() {
      let data = this.$store.getters["analytics/analyticsData"];
      data.report.forEach((item) => {
        item.firstDocName = this.folderDetail.documents[
          item.index.firstDoc
        ].documentOriginalName;
        item.secondDocName = this.folderDetail.documents[
          item.index.secondDoc
        ].documentOriginalName;
        item.firstDocUrl = this.folderDetail.documents[
          item.index.firstDoc
        ].documentUrl;
        item.secondDocUrl = this.folderDetail.documents[
          item.index.secondDoc
        ].documentUrl;
        item.similarity = Math.round(parseFloat(item.similarity));
      });
      return data;
    },
  },
  methods: {
    initialize() {
      this.analyze();
    },
    async analyze() {
      try {
        let response = await this.$store.dispatch(
          "analytics/analyze",
          this.folderDetail
        );
        if (response.status === 200) {
          this.errorMessage = "";
          this.messageReport = this.analytics.message;
          this.dialogLoading = false;
          EventBus.$emit("onShowSnackbar", this.messageReport);
        }
      } catch (error) {
        let message = this.decryptError(error);
        this.dialogLoading = false;
        EventBus.$emit("onShowSnackbar", message);
      }
    },
    detail(item) {
      console.log(item);
      this.firstGdocUrl =
        this.googleDocViewer + item.firstDocUrl + "&embedded=true";
      this.secondGdocUrl =
        this.googleDocViewer + item.secondDocUrl + "&embedded=true";
      this.detailSimilarity = item.similarity;
      console.log(this.secondGdocUrl);
      console.log(this.firstGdocUrl);
    },
  },
  created() {
    this.initialize();
  },
  mixins: [loggerMixin],
};
</script>