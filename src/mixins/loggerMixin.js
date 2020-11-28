export default {
    computed: {
        env() {
            return process.env.NODE_ENV;
        }
    },
    methods: {
        logIfDebug(message) {
            if (this.env === 'development') {
                console.log(message);
            }
        },
        decryptError(error) {
            if (error.response) {
                let message = error.response.data.data.message
                this.logIfDebug(`Error from ${error.response.config.url}: ${message}`);
                return message;
            } else {
                return "Terjadi kesalahan.";
            }
        }
    }
}