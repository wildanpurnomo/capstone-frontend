export const mainRouter = {
    path: '/main',
    redirect: '/main/dashboard',
    component: () => import('@/views/Main.vue'),
    children: [
        {
            path: '/main/dashboard',
            name: 'Dashboard',
            component: () => import('@/views/partials/main/Dashboard')
        },
        {
            path: '/main/folder/:folderId',
            name: 'Folder',
            component: () => import('@/views/partials/main/FolderDetail')
        },
        {
            path: '/main/folder/analytic-result/:folderId',
            name: 'Result',
            component: () => import('@/views/partials/main/AnalyticResult')
        }
    ]
}