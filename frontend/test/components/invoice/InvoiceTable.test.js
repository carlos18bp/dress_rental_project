import { routes } from "@/router";
import { shallowMount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router';
import invoicesData from '../../data_sample/invoices.json';
import InvoiceTable from '@/components/invoice/InvoiceTable.vue';

describe('InvoiceTable', () => {
  let wrapper;
  let router;

  const getWrapper = () => {
    return shallowMount(InvoiceTable, {
      global: {
        plugins: [router],
      },
    });
  };

  beforeEach(async () => {
    setActivePinia(createPinia());

    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    await router.push('/list_invoices');
    await router.isReady();

    wrapper = getWrapper();
  })

  it('Invoice table calls successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });  
});