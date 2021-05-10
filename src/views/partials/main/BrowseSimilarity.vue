<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <div>
        <h4 class="text-center font-weight-bold">
          Plagiarisme<br>
          {{ this.$route.params.similarities }}%
        </h4>
        <v-progress-linear
          color="red lighten-1"
          rounded
          background-color="green accent-3"
          :value="this.$route.params.similarities"
          height="5"
        ></v-progress-linear>
      </div>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="6">
        <h2 class="font-weight-black">{{ docs[selectedResult.firstDocIndex].documentOriginalName }}</h2>
      </v-col>
      <v-col cols="6">
        <h2 class="font-weight-black">{{ docs[selectedResult.secondDocIndex].documentOriginalName }}</h2>
      </v-col>

      <div
        v-for="(item, index) in selectedResult.clusterSubstring"
        :key="index"
        class="mb-4"
      >
      <v-row>
        <v-col cols="6">
          <v-card elevation="1" outlined>
            <v-card-text class="black--text">
              {{ item[0] }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card elevation="1" outlined>
            <v-card-text class="black--text">
              {{ item[1] }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      </div>
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