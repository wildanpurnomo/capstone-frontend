<template>
  <div>
    <v-container>
      <v-row>
        <v-col>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AnalyticsDetail",

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
};
</script>