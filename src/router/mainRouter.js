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
            path: '/addnew',
            name: 'AddNew',
            component: () => import('../components/main/AddNew')
        },
        {
            path: '/result',
            name: 'Result',
            component: () => import('../components/main/Result')
        }        
    ]
}

export default mainRouter