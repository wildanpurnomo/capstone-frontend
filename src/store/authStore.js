import AuthService from '@/services/authService';
import UserModel from '@/models/UserModel';

const initialAuthState = { userData: new UserModel() };

export const auth = {
    namespaced: true,
    state: initialAuthState,
    actions: {
        login({ commit }, userData) {
            return AuthService.login(userData)
                .then(
                    response => {
                        commit('authSuccess', response.data.data.userData);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        register({ commit }, userData) {
            return AuthService.register(userData)
                .then(
                    response => {
                        commit('authSuccess', response.data.data.userData);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        logout({ commit }) {
            return AuthService.logout()
                .then(
                    response => {
                        commit('logoutSuccess');
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
        },
        authenticate({ commit }) {
            return AuthService.authenticate()
                .then(
                    response => {
                        commit('authSuccess', response.data.data.userData);
                        return Promise.resolve(response);
                    },
                    error => { return Promise.reject(error); }
                )
        }
    },
    mutations: {
        authSuccess(state, userData) {
            state.userData = userData;
        },
        logoutSuccess(state) {
            state.userData = initialAuthState.userData;
        },
    },
    getters: {
        userData: (state) => {
            return state.userData;
        }
    }
}