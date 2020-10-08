<template>
  <div>
    <MainNavbar :pageTitle="currentPageName" />
    <router-view></router-view>
  </div>
</template>
<script>
import MainNavbar from "@/components/main/MainNavbar.vue";
import { EventBus } from "@/bus";

export default {
  name: "MainView",
  components: {
    MainNavbar,
  },
  data: () => ({
    currentPageName: "Home",
  }),
  methods: {
    async authenticate() {
      try {
        await this.$store.dispatch("auth/authenticate");
      } catch (error) {
        this.logout(true);
      }
    },
    async logout(isForceLogout = false) {
      let logoutResponse = await this.$store.dispatch("auth/logout");
      if (logoutResponse.status === 200) {
        let message = isForceLogout
          ? "Session expired"
          : "Successfully logged user out";
        this.redirectLogin(message);
      }
    },
    redirectLogin(snackbarMessage) {
      this.$router.push({
        name: "AuthLogin",
        params: {
          snackbarMessage: snackbarMessage,
        },
      });
    },
  },
  created() {
    EventBus.$on("onLogout", () => {
      this.logout();
    });
    EventBus.$on("onSessionEnd", () => {
      this.logout(true);
    });
    EventBus.$on("onAuthenticate", () => {
      this.authenticate();
    });
  },
};
</script>