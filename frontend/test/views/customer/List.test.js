import axios from 'axios';
import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import customersData from '../../data_sample/customers.json';
import List from '@/views/customer/List.vue';


describe('List Customers', () => {
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

    axiosMock.onGet('api/list_customers/').reply(200, {
      data: customersData
    });

    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    wrapper = getWrapper();
  });

  it('List customers renders successfully', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Navigate to create customer page by clicking "Crear Cliente"', async () => {
    const customerRouterLink = wrapper.find('.test-list-customer-link');

    expect(customerRouterLink.text()).toContain('Crear Cliente');

    await customerRouterLink.trigger('click');
    await router.isReady();
    
    expect(router.currentRoute.value.name).toBe('create_customer');
  });
});