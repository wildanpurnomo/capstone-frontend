<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h1>{{ docs[selectedResult.firstDocIndex].documentOriginalName }}</h1>
      </v-col>
      <v-col cols="6">
        <h1>{{ docs[selectedResult.secondDocIndex].documentOriginalName }}</h1>
      </v-col>

      <v-row
        v-for="(item, index) in selectedResult.clusterSubstring"
        :key="index"
        class="mb-8"
      >
        <v-col cols="6">
          <v-card>
            {{ item[0] }}
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            {{ item[1] }}
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BrowseSimilarity",

  computed: {
    selectedResult() {
      let raw = this.$store.getters["analytics/analyticsResult"];
      let selected = null;

      if (raw.length === 0) {
        return selected;
      }

      let filtered = raw.filter((result) => {
        return result.pairingCount > 0;
      });
      let selectedCluster = filtered[this.$route.params.clusterIndex];
      selected = {
        firstDocIndex:
          selectedCluster.clusterPairIndex[this.$route.params.tableIndex][0],
        secondDocIndex:
          selectedCluster.clusterPairIndex[this.$route.params.tableIndex][1],
        clusterSubstring:
          selectedCluster.clusterSubstrings[this.$route.params.tableIndex],
      };
      return selected;
    },

    docs() {
      return this.$store.getters["document/documentData"].documents;
    },
  },

  created() {
    if (this.selectedResult === null) {
      this.$router.push({ name: "Dashboard" });
      return;
    }
  },
};
</script>