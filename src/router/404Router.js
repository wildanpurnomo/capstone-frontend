export const fallbackRouter = {
    path: '*',
    name: 'Fallback',
    component: () => import('@/views/404.vue')
}