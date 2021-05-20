<template>
    <v-btn
        small
        rounded
        outlined
        color="grey darken-4"
        depressed
        @click="back"
    >
        <v-icon>mdi-chevron-left</v-icon> Kembali
    </v-btn>
</template>
<script>
export default {
  name: "BackBtn",

  methods: {
      back() {
          this.$router.go(-1);
      }
  }
};
</script>