import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
import '/iconfont/iconfont.css'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '控制台',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'dashboard' }
    }]
  },
  //
  // {
  //   path: '/algorithm',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/index',
  //       name: '算法管理',
  //       component: () => import('@/views/algorithm/index'),
  //       meta: { title: '算法管理', icon: 'el-icon-office-building' }
  //     }]
  // },

  {
    path: '/algorithm',
    component: Layout,
    // redirect: '/algorithm/installed/index',
    redirect: 'noRedirect',
    meta: { title: '算法管理', icon: 'el-icon-office-building' },
    children: [
      {
        path: '/installed/index',
        name: '已部署的算法',
        meta: { title: '已部署的算法' },
        component: () => import('@/views/algorithm/installed/index.vue')
      },
      {
        path: '/onCloud/index',
        name: '云端算法',
        meta: { title: '云端算法' },
        component: () => import('@/views/algorithm/onCloud/index.vue')
      },
      {
        path: 'installed/detail',
        name: '详情',
        meta: { title: '详情' },
        component: () => import('@/views/algorithm/detail'),
        hidden: true
      }]
  },

  {
    path: '/settings',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '设置', icon: 'el-icon-setting' },
    children: [
      {
        path: 'index',
        name: '设置',
        component: () => import('@/views/settings/index'),
        meta: { title: '本机设置' }
      },
      {
        path: 'users',
        name: '用户管理',
        component: () => import('@/views/settings/users/index'),
        meta: { title: '用户管理' }
      },
      {
        path: 'cloudPlatformComunication',
        name: '云端通信',
        component: () => import('@/views/settings/cloudPlatformComunication/index'),
        meta: { title: '云端通信' }
      },
      {
        path: 'cases',
        name: '事务报告',
        component: () => import('@/views/settings/cases/index'),
        meta: { title: '事务报告' }
      },
      {
        path: 'sumbitTicket',
        name: '事务提交',
        component: () => import('@/views/settings/submitTicket/index'),
        meta: { title: '事务提交' }
      }

    ]
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
