const mainRouter ={
    path: '/main',
    name: 'MainView',
    component: () => import('../views/MainView.vue'),
    children:[
        {
            path: '',
            name: 'Dashboard',
            component: () => import('../components/main/Dashboard')
        },
        {
            path: '/folder/:id',
            name: 'Folder',
            component: () => import('../components/main/Folder')
        },
        {
            path: '/result',
            name: 'Result',
            component: () => import('../components/main/Result')
        }        
    ]
}

export default mainRouter