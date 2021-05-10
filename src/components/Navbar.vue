<template>
  <nav>
    <v-toolbar :color="colorTheme" dark>
      <div class="display-1" @click="menuActionClick('home')" style="cursor: pointer">
        <span class="font-weight-bold">Capstone</span> Project
      </div>
      <v-spacer></v-spacer>
      <v-menu
        offset-y
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            text
            :ripple="false"
          >
            {{ user.username }}
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="menu in menus"
            :key="menu.title"
            link
            @click="menuActionClick(menu.action)"
          >
            <v-list-item-icon class="mr-3">
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
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
    colorTheme: "#394867",
    menus: [
      { title: 'Beranda', icon: 'mdi-home-variant-outline', action: 'home'},
      { title: 'Logout', icon: 'mdi-logout-variant', action: 'logout'},
    ],
  }),
  methods: {
    logout() {
      EventBus.$emit("onLogout");
    },
    menuActionClick(action){
      if (action === 'home'){
        this.$router.push({ path: '/main' });
      } else if (action === 'logout'){
        this.logout();
      }
    }
  },
};
</script>