<template>
    <div class="hasil">
        
        <v-container>
            <v-card
            class="py-5 px-10"
            elevation="4"
            >
                <h1 class="display-1 font-weight-bold text-center pb-3">Hasil Pengecekan</h1>

                <v-card-title>{{folder}}</v-card-title>
                <v-card-text>Dokumen yang mengandung plagiasi</v-card-text>

                <v-data-table
                :headers="headers"
                :items="items">
                </v-data-table>

                <v-btn router to="/Main" class="green white--text">
                    <v-icon left>mdi-arrow-left</v-icon>
                    <span>Kembali</span>
                </v-btn>
            </v-card>

            <!-- Detail Pengecekan Dokumen -->
            <v-card
            class="py-5 px-10 my-10"
            elevation="4"
            >
                <h1 class="display-1 font-weight-bold text-center pb-3">Detail Pengecekan {{dokumen}}</h1>

                <v-card-text>Pratinjau {{dokumen}}</v-card-text>
                <v-card 
                class="pa-5 overflow-y-auto"
                outlined
                height="300px"
                elevation="0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident impedit atque qui repellendus unde eius vero dignissimos, recusandae tenetur fuga, commodi distinctio illo ratione nihil consequuntur. Laboriosam, ipsum ratione?
                </v-card>

                <v-card-text>Pratinjau {{dokumenPlagiasi}}</v-card-text>
                <v-card
                class="pa-5 overflow-y-auto"
                outlined
                height="300px"
                elevation="0">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugit assumenda harum vel perferendis fugiat praesentium debitis, labore nam beatae consectetur voluptate deleniti blanditiis. Quo repudiandae soluta tempore quidem molestiae?
                </v-card>

                <!-- download button -->
                <div class="d-flex pa-5">
                    <v-spacer></v-spacer>
                    <v-btn color="primary">
                        <v-icon left>mdi-file-pdf</v-icon>   
                        <span>Download Laporan PDF</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">
                        <v-icon left>mdi-file-word</v-icon>   
                        <span>Download Laporan Word</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </div>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            folder: "ini nama folder",
            dokumen: "ini nama dokumen",
            dokumenPlagiasi:  "ini nama dokumen plagiasi",
            headers:[
                {text: "Dokumen 1"},
                {text: "Dokumen 2", sortable: false},
                {text: "% Kemiripan"},
                {text: "Detail", sortable: false}
            ]
        }
    }
}
</script>