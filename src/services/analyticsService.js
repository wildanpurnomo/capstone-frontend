import { endpoints } from './endpoints';
import BaseService from './baseService';

class AnalyticsService extends BaseService {
    constructor() {
        super();
    }

    analyze(data) {
        return this.sendAPIRequest(endpoints.analytics, 'POST', data)
    }

    getAnalyticResult(folderSlug) {
        return this.sendAPIRequest(endpoints.analyticResult, 'GET', null, folderSlug);
    }
}

export default new AnalyticsService();