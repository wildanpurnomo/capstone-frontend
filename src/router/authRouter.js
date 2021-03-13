export const authRouter = {
    path: '/auth',
    redirect: '/auth/login',
    component: () => import('@/views/Auth.vue'),
    children: [
        {
            path: '/auth/login',
            name: 'Login',
            component: () => import('@/views/partials/auth/Login.vue'),
        },
        {
            path: '/auth/register',
            name: 'Register',
            component: () => import('@/views/partials/auth/Register.vue'),
        },
    ]
}