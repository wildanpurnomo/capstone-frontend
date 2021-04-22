<template>
  <v-card outlined>
    <v-row class="pl-6 pr-4" style="cursor: pointer">
      <v-icon class="mr-1">mdi-folder</v-icon>
      <h4 class="mt-4 mb-4">{{ folderTitle }}</h4>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "SelectFolderCard",

  props: {
    folderTitle: String,
  },
};
</script>