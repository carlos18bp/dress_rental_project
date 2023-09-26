import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/create_customer',
      name: 'create_customer',
      component: () => import('@/views/customer/Create.vue')
    },
    {
      path: '/edit_customer/:customer',
      name: 'edit_customer',
      component: () => import('@/views/customer/Edit.vue')
    },
    {
      path: '/list_customers',
      name: 'list_customers',
      component: () => import('@/views/customer/List.vue')
    },
    {
      path: '/detail_customer/:customer',
      name: 'detail_customer',
      component: () => import('@/views/customer/Detail.vue')
    },
    {
      path: '/create_invoice/:customer_id?',
      name: 'create_invoice',
      component: () => import('@/views/invoice/Create.vue')
    },
    {
      path: '/edit_invoice/:invoice',
      name: 'edit_invoice',
      component: () => import('@/views/invoice/Edit.vue')
    },
    {
      path: '/list_invoices',
      name: 'list_invoices',
      component: () => import('@/views/invoice/List.vue')
    },
    {
      path: '/detail_invoice/:invoice',
      name: 'detail_invoice',
      component: () => import('@/views/invoice/Detail.vue')
    },
    {
      path: '/create_product/',
      name: 'create_product',
      component: () => import('@/views/product/Create.vue')
    },
    {
      path: '/edit_product/:product',
      name: 'edit_product',
      component: () => import('@/views/product/Edit.vue')
    },
    {
      path: '/detail_product/:product',
      name: 'detail_product',
      component: () => import('@/views/product/Detail.vue')
    },
    {
      path: '/list_products',
      name: 'list_products',
      component: () => import('@/views/product/List.vue')
    }
  ]
});

export default router
export const routes = router.options.routes;
