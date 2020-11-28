import axios from 'axios';
export default class BaseService {
    constructor() {
        this.baseUrl = "https://be-dot-capstone-similarity-check.et.r.appspot.com/api";
    }

    sendAPIRequest(endpoint, method = 'GET', requestBody = null, id = null) {
        requestBody = requestBody === null ? {} : requestBody;
        let result;
        if (method === 'GET') {
            result = axios.get(`${this.baseUrl}${endpoint}`, { params: requestBody });
        } else if (method === 'POST') {
            result = axios.post(`${this.baseUrl}${endpoint}`, requestBody);
        } else if (method === 'PUT') {
            result = axios.put(`${this.baseUrl}${endpoint}${id}`, requestBody);
        } else if (method === 'DELETE') {
            result = axios.delete(`${this.baseUrl}${endpoint}${id}`);
        }
        return result
            .then(
                response => {
                    response.data.data = this.logResponse(endpoint, response.data.data);
                    return response;
                }
            );
    }

    logResponse(endpoint, encryptedResponse) {
        this.logIfDebug(`Response from ${endpoint}`, encryptedResponse);
        return encryptedResponse;
    }

    logIfDebug(message, object) {
        let env = process.env.NODE_ENV;
        if (env === 'development') {
            console.log(message, object);
        }
    }
}