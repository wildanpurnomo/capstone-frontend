<template>
  <div>
    <v-container v-if="analytics.length === 0">
      <v-row>
        <v-col cols="12">
          <EmptyState
            title="Dokumen Tidak Ada Yang Mengandung Kemiripan Satu Sama Lain"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <div>
          <v-btn
            rounded
            color="#394867"
            class="white--text"
            depressed
            @click="home"
          ><v-icon class="mr-1">mdi-home-variant-outline</v-icon>Beranda</v-btn>
        </div>
      </v-row>
    </v-container>

    <v-container v-else>
      <v-row>
        <v-col
          :cols="12 / analytics.length"
          v-for="(item, index) in analytics"
          :key="index"
          style="cursor: pointer"
          @click="toAnalyticsDetail(index)"
        >
          <v-card>
            <v-card-title
              >Tingkat Kemiripan {{ item.clusterMin }} -
              {{ item.clusterMax }}</v-card-title
            >
            <v-card-text>Sebanyak {{ item.pairingCount }} Kasus</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Snackbar :duration="3000" />
  </div>
</template>

<script>
import Snackbar from "@/components/Snackbar";
import { EventBus } from "@/bus";
import EmptyState from "@/components/EmptyState";

export default {
  components: { Snackbar, EmptyState },

  computed: {
    analytics() {
      let raw = this.$store.getters["analytics/analyticsResult"];
      return raw.filter((result) => {
        return result.pairingCount > 0;
      });
    },
  },
  
  methods: {
    toAnalyticsDetail(clusterIndex) {
      this.$router.push({
        name: "ResultDetail",
        params: {
          folderSlug: this.$route.params.folderSlug,
          clusterIndex: clusterIndex,
        },
      });
    },

    home() {
      this.$router.push({ name: "Dashboard"});
    }
  },

  mounted() {
    EventBus.$emit("onShowSnackbar", "Pengecekan Kemiripan Berhasil");
  },

  created() {
    if (this.analytics.length === 0) {
      this.$store.dispatch("document/getDocuments", this.$route.params.folderSlug);
      this.$store.dispatch("analytics/getAnalyticResult", this.$route.params.folderSlug);
    }
  }
};
</script>