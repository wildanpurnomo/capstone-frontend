const authRouter = {
    path: '/',
    name: 'AuthView',
    component: () => import('../views/AuthView.vue'),
    children: [
        {
            path: '',
            name: 'AuthLogin',
            component: () => import('../components/auth/AuthLogin.vue'),
        },
        {
            path: '/register',
            name: 'AuthRegister',
            component: () => import('../components/auth/AuthRegister.vue'),
        },
    ]
}

export default authRouter