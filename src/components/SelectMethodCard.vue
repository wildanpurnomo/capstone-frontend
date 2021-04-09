<template>
  <v-card class="pt-4 rounded-lg" style="cursor: pointer">
    <v-row class="pl-6 pr-4">
      <h3>{{ methodTitle }}</h3>
      <v-spacer></v-spacer>
      <v-icon large>mdi-chevron-right</v-icon>
    </v-row>

    <v-divider></v-divider>

    <v-row class="mt-4 pl-6 pr-4">
      <p>{{ methodDescription }}</p>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "SelectMethodCard",

  props: {
    methodTitle: String,
    methodDescription: String,
  },
};
</script>