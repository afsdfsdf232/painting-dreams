import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { isLogin } from '@/utils'
import Layout from '@/layout/index.vue'
import store from '@/store'

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
        component: () =>
          import(
            /* webpackChunkName: "ShopCalendar" */ '@/views/ShopCalendar/index.vue'
          ),
        meta: {
          title: '工作日历'
        }
      },
      {
        name: 'AllItems',
        path: 'allItems',
        component: () =>
          import(/* webpackChunkName: "AllItems" */ '@/views/AllItems.vue'),
        meta: {
          title: '所有项目'
        }
      },
      {
        name: 'ArchivedItems',
        path: 'archivedItems',
        component: () =>
          import(
            /* webpackChunkName: "ArchivedItems" */ '@/views/ArchivedItems.vue'
          ),
        meta: {
          title: '归档项目'
        }
      },
      {
        name: 'CompanyItems',
        path: 'companyItems',
        component: () =>
          import(
            /* webpackChunkName: "CompanyItems" */ '@/views/CompanyItems.vue'
          ),
        meta: {
          title: '公司项目'
        }
      },
      {
        name: 'Job',
        path: 'job',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/Job.vue'),
        meta: {
          title: '在职人员安排'
        }
      },
      {
        name: 'Painter',
        path: 'painter',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/Painter/index.vue'),
        meta: {
          title: '外发画师安排'
        }
      },
      {
        name: 'Receipt',
        path: 'receipt',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/Receipt/index.vue'),
        meta: {
          title: '发票和收据'
        }
      },
      {
        name: 'EmployeeInfo',
        path: 'employeeInfo',
        component: () =>
          import(
            /* webpackChunkName: "Job" */ '@/views/EmployeeInfo/index.vue'
          ),
        meta: {
          title: '员工资料'
        }
      },
      {
        name: 'PainterInfo',
        path: 'painterInfo',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/PainterInfo/index.vue'),
        meta: {
          title: '外发画师资料'
        }
      },
      {
        name: 'Payroll',
        path: 'payroll',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/Payroll/index.vue'),
        meta: {
          title: '工资表'
        }
      },
      {
        name: 'CooperativeCompany',
        path: 'cooperativeCompany',
        component: () =>
          import(
            /* webpackChunkName: "Job" */ '@/views/CooperativeCompany/index.vue'
          ),
        meta: {
          title: '合作甲方公司信息'
        }
      },
      {
        name: 'AdministrationCost',
        path: 'administrationCost',
        component: () =>
          import(
            /* webpackChunkName: "Job" */ '@/views/AdministrationCost/index.vue'
          ),
        meta: {
          title: '管理成本'
        }
      },
      {
        name: 'Settings',
        path: 'settings',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/Settings/index.vue'),
        meta: {
          title: '后台设置'
        }
      }
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

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    // 需要验证登录状态
    if (isLogin()) {
      // 已经登录
      next()
    } else {
      // 没有登录
      next({ name: 'Login' })
    }
  } else {
    // 登录页面，验证是否登录,登录状态不允许跳转login
    if (store.state.userInfo) {
      next({ name: 'Layout' })
    } else {
      next()
    }
  }
})

export default router
