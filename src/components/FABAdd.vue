<template>
  <v-container>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          large
          dark
          bottom
          right
          fixed
          v-bind="attrs"
          v-on="on"
          :color="colorTheme"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>{{ tooltipMessage }}</span>
    </v-tooltip>
  </v-container>
</template>
<script>
export default {
  name: "FABAdd",

  props: {
    tooltipMessage: String,
  },

  data: () => ({
    colorTheme: "#394867",
    //
  }),
};
</script>