import axios from 'axios';
import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import AxiosMockAdapter from 'axios-mock-adapter';
import categoriesData from '../../data_sample/categories.json';
import productsData from '../../data_sample/products.json';
import { createRouter, createWebHistory } from 'vue-router';
import List from '@/views/product/List.vue';


describe('List Products', () => {
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

    axiosMock.onGet('api/list_categories/').reply(200, categoriesData);

    axiosMock.onGet('api/list_products/').reply(200, productsData); 

    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    wrapper = getWrapper();
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('List products view renders successfully', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Navigate to create product page by clicking "Crear Producto"', async () => {
    const productRouterLink = wrapper.find('.test-list-product-link');

    expect(productRouterLink.text()).toContain('Crear Producto');

    await productRouterLink.trigger('click');
    await router.isReady();

    expect(router.currentRoute.value.name).toBe('create_product');
  });
});