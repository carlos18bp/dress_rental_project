import { routes } from "@/router";
import { shallowMount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import CustomerTable from '@/components/customer/CustomerTable.vue';


describe('CustomerTable', () => {
  let wrapper;
  let router;

  const getWrapper = () => {
    return shallowMount(CustomerTable, {
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

    await router.push('/list_customers');
    await router.isReady();

    wrapper = getWrapper();
  })

  it('Customer table calls successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });
});