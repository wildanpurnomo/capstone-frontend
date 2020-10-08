<template>
  <router-view></router-view>
</template>
<script>
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
          this.$router.push({ name: 'MainView'});
        }
      } catch (error) {
        this.logout(true);
      }
    },
  },
  created() {
    if (this.user.username === "") {
      this.authenticate();
    }
  },
};
</script>