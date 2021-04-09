<template>
  <v-container fill-height>
    <v-row class="d-flex align-center">
      <v-col class="pb-10">
        <v-img src="@/assets/image.png" max-width="600"></v-img>
      </v-col>
      <v-col>
        <v-row class="pl-8 pt-6">
          <h1 class="mb-3">Capstone Similarity Check</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
            deleniti dolores. Exercitationem, commodi ducimus doloremque,
            deserunt quas dolorum repudiandae, sit nihil ab nulla dicta alias
            eius. Quia nobis excepturi iusto amet est error reiciendis magni
            accusantium labore ratione ad nisi omnis, tempore commodi natus
            temporibus. Aliquid, molestiae. Ab, veritatis quaerat?
          </p>
        </v-row>

        <v-row class="pl-8 pt-6">
          <div class="mr-8">
            <v-btn
              class="white--text red accent-2 rounded-xl"
              outlined
              width="100"
              :to="{ name: 'Login' }"
              >Masuk</v-btn
            >
          </div>
          <div>
            <v-btn
              class="rounded-xl"
              :color="colorTheme"
              outlined
              :to="{ name: 'Register' }"
              >Register</v-btn
            >
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "LandingView",

  components: {},

  data: () => ({
    colorTheme: "#394867",
  }),
};
</script>