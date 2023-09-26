import axios from 'axios';
import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia';
import productsData from '../../data_sample/products.json';
import { createRouter, createWebHistory } from 'vue-router';
import Edit from '@/views/product/Edit.vue';
import ProductForm from '@/components/product/ProductForm.vue'
import categoriesData from '../../data_sample/categories.json';


describe('Detail Product', () => {
  const axiosMock = new AxiosMockAdapter(axios,  { onNoMatch: "throwException" }, { delayResponse: 1000 });
  let wrapper;
  let router;

  const getWrapper = () => {
    return mount(Edit, {
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

    await router.push({ name: 'edit_product', 
                        params: { product: encodeURIComponent(JSON.stringify(productsData[0])) } });
    
    wrapper = getWrapper();
  })

  it('Edit product renders successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('product form component calls successfully', () => {
    const productForm = wrapper.findComponent(ProductForm);
    expect(productForm.exists()).toBe(true);
  });

  it('check props to product form', () => {
    const productForm = wrapper.findComponent(ProductForm);

    expect(productForm.props().action).toBe('edit');
    expect(productForm.props().model).toBe('product');

    expect(productForm.props().productformData.title).toBe(productsData[0].title);
    expect(productForm.props().productformData.reference).toBe(productsData[0].reference);
    expect(productForm.props().productformData.categoryId).toBe(productsData[0].categoryId);
    expect(productForm.props().productformData.categoryType).toBe(productsData[0].categoryType);
  });
});