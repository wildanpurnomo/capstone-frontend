import { endpoints } from './endpoints';
import BaseService from './baseService';

class AuthService extends BaseService {
    constructor() {
        super();
    }

    login(userData) {
        return this.sendAPIRequest(endpoints.login, 'POST', userData);
    }

    register(userData) {
        return this.sendAPIRequest(endpoints.register, 'POST', userData);
    }

    logout() {
        return this.sendAPIRequest(endpoints.logout, 'POST');
    }

    authenticate() {
        return this.sendAPIRequest(endpoints.authenticate, 'GET');
    }
}

export default new AuthService();