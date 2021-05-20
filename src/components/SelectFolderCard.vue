<template>
  <v-card outlined class="pl-6 pr-4">
    <v-row>
      <v-icon class="mr-1" v-if="folder">mdi-folder</v-icon>
      <v-icon class="mr-1" v-else-if="googleClass">mdi-google-classroom</v-icon>
      <v-icon class="mr-1" v-else-if="clipboard">mdi-clipboard-text</v-icon>
      <h4 class="mt-4 mb-4">{{ folderTitle }}</h4>
      <v-spacer></v-spacer>
      <p v-if="creationTime" class="my-4 caption ml-auto">
        Dibuat {{ dateToString(creationTime) }}
      </p>
    </v-row>
    <v-row v-if="description" class="subtitle-2">
      <p>{{ description }}</p>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "SelectFolderCard",

  props: {
    folderTitle: String,
    folder: Boolean,
    googleClass: Boolean,
    clipboard: Boolean,
    description: String,
    creationTime: String,
    folderId: String,
  },

  methods: {
    dateToString(date) {
      var d = new Date(date);
      var option = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return d.toLocaleDateString("id", option);
    },
  },

  data: () => ({
    menu: [
      {
        title: "Sunting",
      },
      {
        title: "Hapus",
      },
    ],
  }),
};
</script>