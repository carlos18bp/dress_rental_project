import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/create_customer',
      name: 'create_customer',
      component: () => import('../views/customer/Create.vue')
    },
    {
      path: '/list_customers',
      name: 'list_customers',
      component: () => import('../views/customer/List.vue')
    },
    {
      path: '/create_sale',
      name: 'create_sale',
      component: () => import('../views/sale/Create.vue')
    },
    {
      path: '/list_sales',
      name: 'list_sales',
      component: () => import('../views/sale/List.vue')
    },
    {
      path: '/detail_sale/:sale',
      name: 'detail_sale',
      component: () => import('../views/sale/Detail.vue')
    },
    {
      path: '/list_products',
      name: 'list_products',
      component: () => import('../views/product/List.vue')
    }
  ]
});

export default router
