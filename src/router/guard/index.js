import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { router, asyncRoutes } from '@/router'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/basic'
import { useSettingsWithOut } from '@/stores/modules/settings'

NProgress.configure({ showSpinner: false })

const SettingsStore = useSettingsWithOut()

router.beforeEach((to, from, next) => {
  NProgress.start()

  // 动态加载路由
  if (!SettingsStore.getIsDynamicAddedRoute) {
    asyncRoutes.forEach((route) => {
      router.addRoute(route)
    })
    // 记录动态路由加载完成
    SettingsStore.setDynamicAddedRoute(true)
    next({ path: to.fullPath, replace: true, query: to.query })
    return
  }

  if (to.name === PAGE_NOT_FOUND_ROUTE.path) {
    // 遇到不存在页面，后续逻辑不再处理redirect（阻止下面else逻辑）
    // from.query.redirect = ''
    next({ path: PAGE_NOT_FOUND_ROUTE.path, replace: true })
  } else if (from.query.redirect) {
    const redirect = decodeURIComponent(from.query.redirect || '')
    // 只处理一次 from.query.redirect
    // 也避免某场景（指向路由定义了 redirect）下的死循环
    from.query.redirect = ''
    if (redirect === to.fullPath) {
      // 已经被redirect
      next()
    } else {
      // 指向redirect
      next({ path: redirect, replace: true })
    }
  } else {
    // 正常访问
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
