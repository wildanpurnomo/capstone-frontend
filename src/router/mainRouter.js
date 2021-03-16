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
        },
        {
            path: "/main/example/classroom-courses",
            name: "ClassroomCourseList",
            component: () => import('@/views/partials/main/ClassroomExCourseList')
        },
        {
            path: "/main/example/classroom-courses/coursework/:courseName/:courseId",
            name: "ClassroomCourseWorkList",
            component: () => import('@/views/partials/main/ClassroomExCourseWorkList')
        },
        {
            path: "/main/example/classroom-courses/submission/:courseWorkName/:courseId/:courseWorkId",
            name: "ClassroomCourseWorkSubmissionList",
            component: () => import('@/views/partials/main/ClassroomExCourseWorkSubmissionList')
        }
    ]
}