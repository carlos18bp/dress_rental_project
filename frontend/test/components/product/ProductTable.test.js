import { routes } from "@/router";
import { shallowMount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import ProductTable from '@/components/product/ProductTable.vue';


describe('ProductTable', () => {
  let wrapper;
  let router;

  const getWrapper = () => {
    return shallowMount(ProductTable, {
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

    await router.push('/list_products');
    await router.isReady();

    wrapper = getWrapper();
  })

  it('Product table calls successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });
});