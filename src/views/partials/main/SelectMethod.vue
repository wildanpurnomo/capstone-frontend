<template>
  <v-container fill-height>
    <v-row>
      <div>
        <h1>Selamat datang, {{ user.username }}!</h1>
        <h3 class="mt-8 font-weight-regular">
          Mulai analisis kemiripan submisi ujian dengan langkah berikut.
        </h3>
      </div>
    </v-row>

    <v-row>
      <v-col
        v-for="(item, index) in methods"
        :key="index"
        :cols="12 / methods.length"
        @click="toSelectFolder()"
      >
        <SelectMethodCard
          :methodTitle="item.title"
          :methodDescription="item.desc"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-btn @click="toSelectFolder()">Mulai</v-btn>
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
        desc: "Folder merupakan kumpulan dokumen Anda.",
      },
      {
        title: "Unggah Dokumen",
        desc: "Unggah submisi ujian pada folder.",
      },
      {
        title: "Analisis Kemiripan",
        desc: "Lakukan analisis pada folder.",
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