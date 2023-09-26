import axios from 'axios';
import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia';
import invoicesData from '../../data_sample/invoices.json';
import { createRouter, createWebHistory } from 'vue-router';
import List from '@/views/invoice/List.vue';


describe('List Invoices', () => {
  const axiosMock = new AxiosMockAdapter(axios,  { onNoMatch: "throwException" }, { delayResponse: 1000 });
  let wrapper;
  let router;

  const getWrapper = () => {
    return mount(List, {
      global: {
        plugins: [router],
      },
    });
  };

  beforeEach(async () => {
    setActivePinia(createPinia());

    axiosMock.onGet('api/list_invoices/').reply(200, invoicesData);  

    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    wrapper = getWrapper();
  });

  it('List invoices view renders successfully', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Navigate to create invoice page by clicking "Crear Factura"', async () => {
    const invoiceRouterLink = wrapper.find('.test-list-invoice-link');
    
    expect(invoiceRouterLink.text()).toContain('Crear Factura');

    await invoiceRouterLink.trigger('click');
    await router.isReady();

    expect(router.currentRoute.value.name).toBe('create_invoice');
  });
});