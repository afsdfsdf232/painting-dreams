import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/shopCalendar',
    component: Layout,
    children: [
      {
        name: 'ShopCalendar',
        path: 'shopCalendar',
        component: () => import(/* webpackChunkName: "ShopCalendar" */ '@/views/ShopCalendar.vue'),
        meta: {
          title: '工作日历'
        }
      },
      {
        name: 'AllItems',
        path: 'allItems',
        component: () => import(/* webpackChunkName: "AllItems" */ '@/views/AllItems.vue'),
        meta: {
          title: '所有项目'
        }
      },
      {
        name: 'ArchivedItems',
        path: 'archivedItems',
        component: () => import(/* webpackChunkName: "ArchivedItems" */ '@/views/ArchivedItems.vue'),
        meta: {
          title: '归档项目'
        }
      },
      {
        name: 'ArchivedItems',
        path: 'archivedItems',
        component: () => import(/* webpackChunkName: "ArchivedItems" */ '@/views/ArchivedItems.vue'),
        meta: {
          title: '归档项目'
        }
      },
      {
        name: 'CompanyItems',
        path: 'companyItems',
        component: () => import(/* webpackChunkName: "CompanyItems" */ '@/views/CompanyItems.vue'),
        meta: {
          title: '公司项目'
        }
      },
      {
        name: 'Job',
        path: 'job',
        component: () => import(/* webpackChunkName: "Job" */ '@/views/Job.vue'),
        meta: {
          title: '在职人员'
        }
      },
      
      

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
