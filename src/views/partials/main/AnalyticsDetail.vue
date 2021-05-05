<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="clusterInfo"
          :items-per-page="5"
          class="elevation-1 row-pointer"
          @click:row="onItemClick"
        >
          <template v-slot:[`item.first`]="{ value }">
            {{ docs[value].documentOriginalName }}
          </template>

          <template v-slot:[`item.second`]="{ value }">
            {{ docs[value].documentOriginalName }}
          </template>

          <template v-slot:[`item.similarities`]="{ value }">
            {{ toPercent(value) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AnalyticsDetail",

  data() {
    return {
      headers: [
        {
          text: "Dokumen 1",
          value: "first",
        },
        {
          text: "Dokumen 2",
          value: "second",
        },
        {
          text: "Kemiripan",
          value: "similarities",
        },
      ],
    };
  },

  computed: {
    clusterInfo() {
      let raw = this.$store.getters["analytics/analyticsResult"];
      let clusterInfo = [];

      if (raw.length === 0) {
        return clusterInfo;
      }

      let filtered = raw.filter((result) => {
        return result.pairingCount > 0;
      });
      let selectedCluster = filtered[this.$route.params.clusterIndex];

      selectedCluster.clusterPairIndex.forEach((item, index) => {
        let object = {
          tableIndex: index,
          first: item[0],
          second: item[1],
          similarities: selectedCluster.clusterSimilarities[index],
        };
        clusterInfo.push(object);
      });

      return clusterInfo;
    },

    docs() {
      return this.$store.getters["document/documentData"].documents;
    },
  },

  methods: {
    toPercent(rawFloat) {
      return (rawFloat * 100).toFixed(2) + "%";
    },

    onItemClick(value) {
      this.$router.push({
        name: "BrowseSimilarity",
        params: {
          folderSlug: this.$route.params.folderSlug,
          clusterIndex: this.$route.params.clusterIndex,
          tableIndex: value.tableIndex,
        },
      });
    },
  },

  created() {
    if (this.clusterInfo.length === 0) {
      this.$router.push({ name: "Dashboard" });
      return;
    }
  },
};
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>