<template>
  <router-view></router-view>
</template>
<script>
import { EventBus } from '@/bus';

export default {
  name: "AuthView",
  computed: {
    user() {
      return this.$store.getters["auth/userData"];
    },
  },
  methods: {
    async authenticate() {
      try {
        let response = await this.$store.dispatch("auth/authenticate");
        if (response.status === 200) {
          this.$router.push({ name: 'Dashboard'});
        }
      } catch (error) {
        EventBus.$emit('onSessionEnd');
      }
    },
  },
  created() {
    let paramKeys = Object.keys(this.$route.params);
    if (this.user.username === "" && paramKeys.length === 0) {
      this.authenticate();
    }
  },
};
</script>