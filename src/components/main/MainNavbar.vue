<template>
  <nav>
    <v-toolbar :color="colorTheme" dark>
      <v-app-bar-nav-icon @click="isDrawer = !isDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        Selamat datang, {{ user.username }}
      </div>
      <v-btn @click="logout" text>
        <span>Logout</span>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>
<script>
import { EventBus } from "@/bus";

export default {
  name: "MainNavbar",
  props: {
    pageTitle: String,
  },
  computed: {
    user() {
      return this.$store.getters["auth/userData"];
    },
  },
  data: () => ({
    colorTheme: "primary",
  }),
  methods: {
    logout() {
      EventBus.$emit("onLogout");
    },
  },
  created() {
    if (this.user.username === '') {
      EventBus.$emit("onAuthenticate");
    }
  },
};
</script>