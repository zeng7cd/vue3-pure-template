import { createRouter, createWebHistory } from 'vue-router'
import { RootRoute, PAGE_NOT_FOUND_ROUTE } from './basic'

const routeModuleList = []

const modules = import.meta.glob('./modules/*.js', { eager: true })

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
// 动态路由
export const asyncRoutes = [...routeModuleList]
// 基本路由
const basicRoutes = [RootRoute, PAGE_NOT_FOUND_ROUTE]
// 创建路由
export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app) {
  app.use(router)
}
