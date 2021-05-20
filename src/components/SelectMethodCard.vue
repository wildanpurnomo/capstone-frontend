<template>
  <v-card class="pt-4 rounded-lg">
    <v-row class="pl-6 pr-4">
      <h3>{{ index }}. {{ methodTitle }}</h3>
      <v-icon class="ml-3">{{ icon }}</v-icon>
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
    index: Number,
    icon: String,
  },
};
</script>