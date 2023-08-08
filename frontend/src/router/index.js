import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/List_Customers',
      name: 'List_Customers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Customer/List.vue')
    },
    {
      path: '/Create_New_Customer',
      name: 'Create_New_Customer',
      component: () => import('../views/Customer/Create.vue')
    },
    {
      path: '/List_Sales',
      name: 'List_Sales',
      component: () => import('../views/Sale/List.vue')
    },
    {
      path: '/Create_New_Sale',
      name: 'Create_New_Sale',
      component: () => import('../views/Sale/Create.vue')
    },
    {
      path: '/Detail_Sale',
      name: 'Detail_Sale',
      component: () => import('../views/Sale/Detail.vue')
    },
    {
      path: '/List_Products',
      name: 'List_Products',
      component: () => import('../views/Product/List.vue')
    }
  ]
})

export default router
