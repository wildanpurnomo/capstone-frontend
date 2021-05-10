import AnalyticsService from '@/services/analyticsService';

const analyticsState = { analyticsResult: [] };

export const analytics = {
    namespaced: true,
    state: analyticsState,
    actions: {
        analyze({ commit }, documents) {
            return AnalyticsService.analyze(documents)
                .then(
                    response => {
                        commit('analyzeSuccess', response.data.data.result);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },

        getAnalyticResult({ commit }, folderSlug) {
            return AnalyticsService.getAnalyticResult(folderSlug)
            .then(
                response => {
                    commit('analyzeSuccess', response.data.data.result);
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
            state.analyticsResult = data;
        }
    },
    getters: {
        analyticsResult: (state) => {
            return state.analyticsResult;
        }
    }
}