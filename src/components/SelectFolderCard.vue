<template>
  <v-card>
    <v-row class="pl-6 pr-4" style="cursor: pointer">
      <h3 class="mt-4 mb-4">{{ folderTitle }}</h3>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn icon color="#394867"> <v-icon large>mdi-dots-vertical</v-icon> </v-btn>
      </v-card-actions>
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