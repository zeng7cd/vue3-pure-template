import { PageEnum } from '@/enums/pageEnum'

const REDIRECT_NAME = 'Redirect'

export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  }
}

export const LoginRoute = {
  path: '/login',
  name: 'Login',
  meta: {
    title: 'login'
  },
  component: () => import('@/views/system/login.vue')
}

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE = {
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/system/404.vue'),
  hidden: true
}

export const REDIRECT_ROUTE = {
  path: '/redirect',
  name: 'RedirectTo',
  redirect: '/redirect/redirect',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/redirect/:path(.*)/:_redirect_type(.*)/:_origin_params(.*)?',
      name: REDIRECT_NAME,
      component: () => import('@/views/system/redirect.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true
      }
    }
  ]
}
