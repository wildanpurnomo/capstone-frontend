<template>
  <v-container fill-height>
    <v-row>
      <div>
        <h1>Selamat datang, {{ user.username }}!</h1>
        <h3 class="mt-5 font-weight-regular">
          Analisis kemiripan submisi ujian dengan 3 langkah mudah berikut.
        </h3>
      </div>
    </v-row>

    <v-row>
      <v-col
        v-for="(item, index) in methods"
        :key="index"
        :cols="12 / methods.length"
      >
        <SelectMethodCard
          :methodTitle="item.title"
          :methodDescription="item.desc"
          :icon="item.icon"
          :index="index + 1"
        />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn 
        class="white--text mt-3"
        @click="toSelectFolder()"
        color="green darken-1"
        rounded
        large
      >
        Mulai<v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import SelectMethodCard from "@/components/SelectMethodCard";

export default {
  name: "SelectMethod",

  computed: {
    user() {
      return this.$store.getters["auth/userData"];
    },
  },

  data: () => ({
    methods: [
      {
        title: "Buat Folder",
        desc: "Folder merupakan kumpulan dokumen anda.",
        icon: "mdi-folder-plus-outline"
      },
      {
        title: "Unggah Dokumen",
        desc: "Unggah submisi ujian pada folder.",
        icon: "mdi-upload"
      },
      {
        title: "Analisis Kemiripan",
        desc: "Lakukan analisis pada folder.",
        icon: "mdi-clipboard-text-search-outline"
      },
    ],
  }),

  methods: {
    toSelectFolder() {
      this.$router.push({
        name: "SelectFolder",
      });
    },
  },

  components: { SelectMethodCard },
};
</script>