import axios from 'axios';
const crypto = require('crypto-js');

export default class BaseService {
    constructor() {
        this.key = process.env.VUE_APP_CRYPTO_KEY;
        this.baseUrl = process.env.VUE_APP_BASE_URL;
    }

    sendAPIRequest(endpoint, method = 'GET', requestBody = null) {
        requestBody = requestBody === null ? {} : { payload: this.encryptData(requestBody) };
        let result;
        if (method === 'GET') {
            result = axios.get(`${this.baseUrl}${endpoint}`, requestBody);
        } else if (method === 'POST') {
            result = axios.post(`${this.baseUrl}${endpoint}`, requestBody);
        } else if (method === 'PUT') {
            result = axios.put(`${this.baseUrl}${endpoint}`, requestBody);
        } else if (method === 'DELETE') {
            result = axios.delete(`${this.baseUrl}${endpoint}`, requestBody);
        }
        return result
            .then(
                response => {
                    response.data.data = this.getRealResponse(endpoint, response.data.data);
                    return response;
                }
            );
    }

    encryptData(rawJsonData) {
        return crypto.AES.encrypt(JSON.stringify(rawJsonData), this.key).toString();
    }

    getRealResponse(endpoint, encryptedResponse) {
        let bytes = crypto.AES.decrypt(encryptedResponse, this.key);
        let realResponse = JSON.parse(crypto.enc.Utf8.stringify(bytes));
        this.logIfDebug(`Response from ${endpoint}`, realResponse);
        return realResponse;
    }

    logIfDebug(message, object) {
        let env = process.env.NODE_ENV;
        if (env === 'development') {
            console.log(message, object);
        }
    }
}