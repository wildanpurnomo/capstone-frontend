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
            this.logIfDebug(`Error: ${error}`);
            try {
                let message = error.response.data.data.message;
                return message;
            } catch (error) {
                return "Terjadi Kesalahan";
            }
        }
    }
}