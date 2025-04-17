import type { RouteRecordRaw } from 'vue-router'
import VwBerghain from '@/views/VwBerghain.vue'
import VwRso from '@/views/VwRso.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/berghain' },
  {
    path: '/berghain',
    name: 'berghain',
    component: VwBerghain,
    meta: { label: 'Dashboard', icon: 'i-lucide-home' },
  },
  {
    path: '/rso',
    name: 'rso',
    component: VwRso,
    meta: { label: 'RSO', icon: 'i-lucide-circle-user-round' },
  },
]
