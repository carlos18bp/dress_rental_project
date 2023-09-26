import axios from 'axios';
import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import categoriesData from '../../data_sample/categories.json';
import productsData from '../../data_sample/products.json';
import ProductForm from '@/components/product/ProductForm.vue';


describe('ProductForm', () => {
  const axiosMock = new AxiosMockAdapter(axios,  { onNoMatch: "throwException" }, { delayResponse: 1000 });
  let wrapper;
  let router;

  const getWrapper = () => {
    return mount(ProductForm, {
      props: {
        action: 'create',
        productformData: { 
          title: '',
          reference: '',
          category: '',
         },
        model: 'product',
      },
      global: {
        plugins: [router],
      },
    });
  };

  beforeEach(async () => {
    axiosMock.reset();
    
    axiosMock.onPost('api/create_product/').reply(200, {
      data: { message: 'Record created successfully' },
    });

    axiosMock.onGet('/api/list_categories/').reply(200, categoriesData);

    setActivePinia(createPinia());

    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    await router.push('/create_product');
    await router.isReady();

    wrapper = getWrapper();
  });

  it('product form calls successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('submits form product when the submit button is clicked', async () => {  
    const onSubmitSpy = jest.spyOn(wrapper.vm, 'onSubmit');

    await wrapper.find('.test-title-input').setValue(productsData[0].title);
    await wrapper.find('.test-reference-input').setValue(productsData[0].reference);
    await wrapper.find('.test-category-select').setValue(categoriesData[0]['pk']);

    await wrapper.find('form').trigger('submit.prevent');

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('do not call submit if there is no product data in the form', async () => {  
    const onSubmitSpy = jest.spyOn(wrapper.vm, 'onSubmit');

    await wrapper.find('form').trigger('submit.prevent');

    expect(onSubmitSpy).not.toHaveBeenCalled();
  });

  it('get the title of the create action', () => {
    const defineActionValue = wrapper.vm.defineAction;

    expect(defineActionValue).toBe('Crear Nuevo Producto:');
  });

  it('get the title of the edit action', async () => {
    await wrapper.setProps({
      action: 'edit',
    });
    const defineActionValue = wrapper.vm.defineAction;

    expect(defineActionValue).toBe('Editar Producto:');
  });

  it('check title label', () => {  
    const titleLabel = wrapper.find('.test-title-label');

    expect(titleLabel.text()).toBe('Titulo:');
  });

  it('check title input', async () => {  
    const titleInput = wrapper.find('.test-title-input');
    await titleInput.setValue(productsData[0].title);
    
    expect(titleInput.attributes('type')).toBe('text');
    expect(wrapper.vm.productformData.title).toBe(productsData[0].title);
    expect(titleInput.element.value).toBe(productsData[0].title);
    expect(titleInput.attributes()).toHaveProperty('required');
  });

  it('check reference label', () => {  
    const referenceLabel = wrapper.find('.test-reference-label');

    expect(referenceLabel.text()).toBe('Referencia:');
  });

  it('check reference input', async () => {  
    const referenceInput = wrapper.find('.test-reference-input');
    await referenceInput.setValue(productsData[0].reference);
    
    expect(referenceInput.attributes('type')).toBe('text');
    expect(wrapper.vm.productformData.reference).toBe(productsData[0].reference);
    expect(referenceInput.element.value).toBe(productsData[0].reference);
    expect(referenceInput.attributes()).toHaveProperty('required');
  });

  it('check category label', () => {  
    const categoryLabel = wrapper.find('.test-category-label');

    expect(categoryLabel.text()).toBe('Categoria:');
  });

  it('check category input', async () => {  
    const categorySelect = wrapper.find('.test-category-select');
    await categorySelect.setValue(categoriesData[0]['pk']);

    expect(wrapper.vm.productformData.categoryId).toBe(categoriesData[0]['pk']);
    expect(categorySelect.element.value).toBe(categoriesData[0]['pk'].toString());
    expect(categorySelect.attributes()).toHaveProperty('required');
  });
});