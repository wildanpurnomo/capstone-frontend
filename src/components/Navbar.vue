<template>
  <nav>
    <v-toolbar :color="colorTheme" dark>
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
  name: "Navbar",
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
};
</script>