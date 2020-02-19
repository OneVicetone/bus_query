import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

const routes = [
    {
        path: '/',
        component: () => import('@/layout/layout.vue'),
        redirect: '/busQueryManagement',
        children: [
            {
                path: '/busQueryManagement',
                component: () => import('@/views/busQueryManagement/busQueryManagement.vue')
            }
        ]
    }
]


const router = new Router({
    mode: 'hash',
    routes
})

export default router

