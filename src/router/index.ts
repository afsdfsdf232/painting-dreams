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
          title: '工作日历',
          permission: '1'
        }
      },
      {
        name: 'AllItems',
        path: 'allItems',
        component: () =>
          import(
            /* webpackChunkName: "AllItems" */ '@/views/AllItems/index.vue'
          ),
        meta: {
          title: '所有项目',
          permission: '2'
        }
      },
      {
        name: 'ArchivedItems',
        path: 'archivedItems',
        component: () =>
          import(
            /* webpackChunkName: "ArchivedItems" */ '@/views/ArchivedItems/index.vue'
          ),
        meta: {
          title: '归档项目',
          permission: '3'
        }
      },
      {
        name: 'CompanyItems',
        path: 'companyItems',
        component: () =>
          import(
            /* webpackChunkName: "CompanyItems" */ '@/views/CompanyItems/index.vue'
          ),
        meta: {
          title: '公司项目',
          permission: '4'
        }
      },
      {
        name: 'Job',
        path: 'job',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/Job/index.vue'),
        meta: {
          title: '在职人员安排',
          permission: '5'
        }
      },
      {
        name: 'Painter',
        path: 'painter',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/Painter/index.vue'),
        meta: {
          title: '外发画师安排',
          permission: '6'
        }
      },
      {
        name: 'Receipt',
        path: 'receipt',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/Receipt/index.vue'),
        meta: {
          title: '发票和收据',
          permission: '7'
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
          title: '员工资料',
          permission: '8'
        }
      },
      {
        name: 'PainterInfo',
        path: 'painterInfo',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/PainterInfo/index.vue'),
        meta: {
          title: '外发画师资料',
          permission: '9'
        }
      },
      {
        name: 'Payroll',
        path: 'payroll',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/Payroll/index.vue'),
        meta: {
          title: '工资表',
          permission: '10'
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
          title: '合作甲方公司信息',
          permission: '11'
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
          title: '管理成本',
          permission: '12'
        }
      },
      {
        name: 'Settings',
        path: 'settings',
        component: () =>
          import(/* webpackChunkName: "Job" */ '@/views/Settings/index.vue'),
        meta: {
          title: '后台设置',
          permission: '13'
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
