import AnalyticsService from '@/services/analyticsService';
import AnalyticsModel from '@/models/analyticsModel';

const analyticsState = { analyticsData: new AnalyticsModel() };

export const analytics = {
    namespaced: true,
    state: analyticsState,
    actions: {
        analyze({ commit }, documents) {
            return AnalyticsService.analyze(documents)
                .then(
                    response => {
                        commit('analyzeSuccess', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        }
    },
    mutations: {
        analyzeSuccess(state, data) {
            state.analyticsData = data;
        }
    },
    getters: {
        analyticsData: (state) => {
            return state.analyticsData;
        }
    }
}