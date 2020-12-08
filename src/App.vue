<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    test: 1,
    test_baru: 2,
    wkwk: "ini bikin konflik wkwk",
    test_2: "xx",
  }),
};
</script>
