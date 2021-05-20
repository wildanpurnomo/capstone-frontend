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
                :items="docs"
                :items-per-page="10"
                :loading="loading"
                loading-text="Sedang mengambil data dokumen"
              >

                <template v-slot:[`item.actions`]="{ item }">
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
  name: "SubmissionDetail",

  components: { Snackbar, BackBtn },

  data() {
    return {
      dialog: false,
      loading: false,
      loadingCheck: false,
      headers: [
        { text: "Nama Dokumen", value: "documentOriginalName" },
        { text: "Tanggal Diunggah", value: "updatedAt" },
        { text: "", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    docs() {
      let submissions = this.$store.getters["classroom/courseSubmissionList"];
      let docs = []
      for(let submission in submissions) {
        let doc = {};
        doc["updatedAt"] = submissions[submission].updateTime;
        doc["documentOriginalName"] = submissions[submission].assignmentSubmission.attachments[0].driveFile.title;
        doc["documentUrl"] = submissions[submission].assignmentSubmission.attachments[0].driveFile.alternateLink;
        docs.push(doc);
      }
      return docs;
    },
  },

  methods: {
    async getSubmission() {
      this.loading = true;
      try {
        let response = await this.$store.dispatch(
          "classroom/getCourseSubmissionList",
          this.$route.params.item
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
  },

  created() {
    this.getSubmission();
  },

  mixins: [loggerMixin, slugMixin, dateMixin, folderNameMixin],
};
</script>
