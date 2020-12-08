import { endpoints } from './endpoints';
import BaseService from './baseService';

class AnalyticsService extends BaseService {
    constructor() {
        super();
    }

    analyze(data) {
        return this.sendAPIRequest(endpoints.analytics, 'POST', data)
    }
}

export default new AnalyticsService();