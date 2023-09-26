import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';


describe('Home', () => {
  let wrapper;
  let router;

  const getWrapper = () => {
    return mount(Home, {
      global: {
        plugins: [router],
      },
    });
  };

  beforeEach(async () => {    
    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    wrapper = getWrapper();
  });

  it('Home view renders successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Navigate to the list customers page by clicking "Clientes"', async () => {
    const customerRouterLink = wrapper.find('.test-list-customer-link');

    await customerRouterLink.trigger('click');
    await router.isReady();

    expect(customerRouterLink.text()).toContain('Clientes')
    expect(router.currentRoute.value.name).toBe('list_customers');
  });

  it('Navigate to the list invoices page by clicking "Facturas"', async () => {
    const invoiceRouterLink = wrapper.find('.test-list-invoice-link');

    await invoiceRouterLink.trigger('click');
    await router.isReady();

    expect(invoiceRouterLink.text()).toContain('Facturas')
    expect(router.currentRoute.value.name).toBe('list_invoices');
  });

  it('Navigate to the list products page by clicking "Productos"', async () => {
    const productRouterLink = wrapper.find('.test-list-product-link');

    await productRouterLink.trigger('click');
    await router.isReady();

    expect(productRouterLink.text()).toContain('Productos')
    expect(router.currentRoute.value.name).toBe('list_products');
  });
});