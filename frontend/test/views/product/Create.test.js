import axios from 'axios';
import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import Create from '@/views/product/Create.vue';
import ProductForm from '@/components/product/ProductForm.vue';
import categoriesData from '../../data_sample/categories.json';


describe('Create Product', () => {
  const axiosMock = new AxiosMockAdapter(axios,  { onNoMatch: "throwException" }, { delayResponse: 1000 });
  let wrapper;
  let router;

  const getWrapper = () => {
    return mount(Create, {
      global: {
        plugins: [router],
      },
    });
  };

  beforeEach(async () => {
    axiosMock.onGet('api/list_categories/').reply(200, categoriesData);

    setActivePinia(createPinia());
    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    await router.push('/create_product');
    await router.isReady();

    wrapper = getWrapper();
  });

  it('create product renders successfully', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('product form component calls successfully', () => {
    const productForm = wrapper.findComponent(ProductForm);
    expect(productForm.exists()).toBe(true);
  });

  it('check props to product form', () => {
    const productForm = wrapper.findComponent(ProductForm);

    expect(productForm.props().action).toBe('create');
    expect(productForm.props().model).toBe('product');

    expect(productForm.props().productformData.title).toBe('');
    expect(productForm.props().productformData.reference).toBe('');
    expect(productForm.props().productformData.categoryId).toBe('');
    expect(productForm.props().productformData.categoryType).toBe('');
  });
});