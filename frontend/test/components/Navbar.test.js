import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import Navbar from '@/components/Navbar.vue';


describe('Navbar', () => {
  let wrapper;
 
  const getWrapper = () => {
    return mount(Navbar, {
      global: {
        plugins: [router],
      },
    });
  };

  let router;
  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    wrapper = getWrapper();
  });

  it('Navbar calls successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Navigate to the home page by clicking "Home"', async () => {
    const homeRouterLink = wrapper.find('.test-home-link');

    await homeRouterLink.trigger('click');
    await router.isReady();

    expect(homeRouterLink.text()).toContain('Home')
    expect(router.currentRoute.value.name).toBe('home');
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