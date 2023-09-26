import { routes } from "@/router";
import { shallowMount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import productsData from '../../data_sample/products.json';
import { createRouter, createWebHistory } from 'vue-router';
import Detail from '@/views/product/Detail.vue';
import InvoiceTable from '@/components/invoice/InvoiceTable.vue';

describe('Detail Product', () => {
  let wrapper;
  let router;

  const getWrapper = () => {
    return shallowMount(Detail, {
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

    await router.push({ name: 'detail_product', 
                        params: { product: encodeURIComponent(JSON.stringify(productsData[0])) } });
    wrapper = getWrapper();
  });

  it('Detail product renders successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('invoice table component calls successfully', () => {
    const invoiceTable = wrapper.findComponent(InvoiceTable);
    expect(invoiceTable.exists()).toBe(true);
  });

  it('check title title', () => {  
    const titleTitle = wrapper.find('.test-title h3');

    expect(titleTitle.text()).toBe('Titulo:');
  });

  it('check title value', () => {  
    const titleInput = wrapper.find('.test-title p');

    expect(titleInput.text()).toBe(productsData[0].title);
  });

  it('check reference title', () => {  
    const referenceTitle = wrapper.find('.test-reference h3');

    expect(referenceTitle.text()).toBe('Referencia:');
  });

  it('check reference value', () => {  
    const referenceInput = wrapper.find('.test-reference p');

    expect(referenceInput.text()).toBe(productsData[0].reference);
  });

  it('check category title', () => {  
    const categoryTitle = wrapper.find('.test-category-type h3');

    expect(categoryTitle.text()).toBe('Categoria:');
  });

  it('check category value', () => {  
    const categoryValue = wrapper.find('.test-category-type p');

    expect(categoryValue.text()).toBe(productsData[0]['categoryType']);
  });
});