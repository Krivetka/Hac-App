import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapView.vue'
import AlertsView from '../views/AlertsView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'Map',
    component: MapView
  },
  {
    path: '/alerts',
    name: 'Alerts',
    component: AlertsView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

