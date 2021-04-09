<template>
  <div class="hasil">
    <v-container>
      <v-row>
        <v-col
          :cols="12 / analytics.length"
          v-for="(item, index) in analytics"
          :key="index"
          style="cursor: pointer"
        >
          <v-card>
            <v-card-title
              >Tingkat Kemiripan {{ item.clusterMin }} -
              {{ item.clusterMax }}</v-card-title
            >
            <v-card-text
              >Sebanyak {{ item.pairingCount }} Kasus</v-card-text
            >
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

export default {
  components: { Snackbar },
  data() {
    return {};
  },
  computed: {
    analytics() {
      let raw = this.$store.getters["analytics/analyticsResult"];
      return raw.filter((result) => {
        return result.pairingCount > 0;
      });
    },
  },
  methods: {},
  
  created() {
    if (this.analytics.length === 0) {
      this.$router.push({ name: "Dashboard" });
      return;
    }
  },

  mounted() {
    EventBus.$emit("onShowSnackbar", "Pengecekan Kemiripan Berhasil");
  },
};
</script>