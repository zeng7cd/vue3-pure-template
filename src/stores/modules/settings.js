import { defineStore } from 'pinia'
import { store } from '@/stores'

const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    title: '',
    isDynamicAddedRoute: false
  }),
  getters: {
    getIsDynamicAddedRoute(state) {
      return state.isDynamicAddedRoute
    }
  },
  actions: {
    // 设置网页标题
    setTitle(title) {
      this.title = title
      document.title = title
    },
    setDynamicAddedRoute(added) {
      this.isDynamicAddedRoute = added
    }
  },
  persist: true
})

export function useSettingsWithOut() {
  return useSettingsStore(store)
}
