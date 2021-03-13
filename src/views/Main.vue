<template>
  <div>
    <MainNavbar/>
    <div class="mb-3"></div>
    <router-view></router-view>
  </div>
</template>
<script>
import MainNavbar from "@/components/Navbar.vue";
import { EventBus } from "@/bus";

export default {
  name: "MainView",

  components: {
    MainNavbar,
  },

  data: () => ({
    currentPageName: "Home",
  }),

  computed: {
    user() {
      return this.$store.getters["auth/userData"];
    },
  },

  methods: {
    async authenticate() {
      try {
        await this.$store.dispatch("auth/authenticate");
        EventBus.$emit("onAuthenticated");
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
        name: "Login",
        params: {
          snackbarMessage: snackbarMessage,
        },
      });
    },
  },

  created() {
    if (this.user.username === "") {
      this.authenticate();
    }
  },
};
</script>