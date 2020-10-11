<template>
    <nav>
        <v-app-bar app dark>
            <router-link to="/" class="text-decoration-none white--text" >
                <v-toolbar-title class="display-1">
                    <span class="font-weight-bold">Web</span>
                    <span>App</span>
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn>
                <span>Keluar</span>
                <v-icon color="white" right>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>

    </nav>
</template>

<script>
export default {
    data(){
        return{
            drawer: false,
        }
    }
}
</script>