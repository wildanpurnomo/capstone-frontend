const crypto = require('crypto-js');

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
            let bytes = crypto.AES.decrypt(error.response.data.data, process.env.VUE_APP_CRYPTO_KEY);
            let realError = JSON.parse(crypto.enc.Utf8.stringify(bytes));
            this.logIfDebug(`Error from ${error.response.config.url}: ${realError}`);
            return realError;
        }
    }
}