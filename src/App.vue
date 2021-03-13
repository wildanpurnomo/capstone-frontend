<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { EventBus } from "@/bus";

export default {
  name: "App",

  data: () => ({}),

  methods: {
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
        name: "Login",
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
  },
};
</script>
