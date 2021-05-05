<template>
  <v-card outlined style="cursor: pointer" class="pl-6 pr-4">
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
      <v-card-actions>
        <v-menu rounded="large" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="#394867" v-bind="attrs" v-on="on">
              <v-icon large>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in menu"
              :key="index"
              link
              @click="menuActionClick(item.title)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
import { EventBus } from "@/bus";

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

    menuActionClick(value) {
      if (value === "Sunting") {
        this.onUpdateMenuSelected();
      } else {
        this.onDeleteMenuSelected();
      }
    },

    onDeleteMenuSelected() {
      EventBus.$emit("onDeleteFolder", {
        folderId: this.folderId,
        folderName: this.folderTitle,
      });
    },

    onUpdateMenuSelected() {
      EventBus.$emit("onUpdateFolder", {
        folderId: this.folderId,
        folderName: this.folderTitle,
      });
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