import Layout from '@/layout/index.vue'

const dashboardRouter = {
  path: '',
  component: Layout,
  children: [
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      name: 'Dashboard',
      meta: {
        title: 'Dashboard'
      }
    }
  ]
}

export default dashboardRouter
