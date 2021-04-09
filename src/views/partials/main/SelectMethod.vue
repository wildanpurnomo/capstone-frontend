<template>
  <v-container fill-height>
    <v-row>
      <div>
        <h1>Bagaimana Anda ingin menganalisis dokumen?</h1>
        <h3 class="mt-8 font-weight-regular">
          Anda dapat menganalisis keseluruhan dokumen atau salah satu dokumen
        </h3>
      </div>
    </v-row>

    <v-row>
      <v-col cols="6" @click="toSelectFolder(0)">
        <SelectMethodCard
          :methodTitle="methods[0].title"
          :methodDescription="methods[0].desc"
        />
      </v-col>
      <v-col cols="6" @click="toSelectFolder(1)">
        <SelectMethodCard
          :methodTitle="methods[1].title"
          :methodDescription="methods[1].desc"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SelectMethodCard from "@/components/SelectMethodCard";

export default {
  name: "SelectMethod",

  data: () => ({
    methods: [
      {
        title: "Analisis Keseluruhan Dokumen",
        desc:
          "Sistem menganalisis kemiripan keseluruhan dokumen submisi yang Anda unggah. Hasil analisa berupa persentase kemiripan antar butir soal.",
        slugMethod: "overall-analytics",
      },
      {
        title: "Analisis Dokumen Spesifik",
        desc:
          "Sistem menganalisis kemiripan satu dokumen terhadap kumpulan submisi. Cocok digunakan ketika Anda hendak memastikan performa dari satu peserta ujian. Hasil analisa berupa persentase kemiripan antar butir soal.",
        slugMethod: "specific-analytics",
      },
    ],
  }),

  methods: {
    toSelectFolder(index) {
      this.$router.push({
        name: "SelectFolder",
        query: { method: this.methods[index].slugMethod },
      });
    },
  },

  components: { SelectMethodCard },
};
</script>