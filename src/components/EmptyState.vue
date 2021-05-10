<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h3>{{ title }}</h3>
      </v-col>

      <v-col cols="12">
        <h5>
          {{ subtitle }}
        </h5>
      </v-col>

      <v-col cols="auto">
        <v-img src="@/assets/empty_state.png" max-width="500"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "EmptyState",

  props: {
    title: String,
    subtitle: String,
  },
};
</script>