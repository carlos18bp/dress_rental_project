import axios from 'axios';
import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import Create from '@/views/invoice/Create.vue';
import customersData from '../../data_sample/customers.json';
import productsData from '../../data_sample/products.json';
import InvoiceForm from '@/components/invoice/InvoiceForm.vue'

describe('Create Invoice', () => {
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
    axiosMock.onGet('api/list_customers/').reply(200, customersData);

    axiosMock.onGet('api/list_products/').reply(200, productsData);

    setActivePinia(createPinia());
    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    await router.push('/create_invoice/:customer_id?');
    await router.isReady();

    wrapper = getWrapper();
  });

  it('create invoice renders successfully', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('invoice form component calls successfully', () => {
    const invoiceForm = wrapper.findComponent(InvoiceForm);
    expect(invoiceForm.exists()).toBe(true);
  });

  it('check props to invoice form', () => {
    const invoiceForm = wrapper.findComponent(InvoiceForm);

    expect(invoiceForm.props().action).toBe('create');
    expect(invoiceForm.props().model).toBe('invoice');

    expect(invoiceForm.props().invoiceformData.type).toBe('');
    expect(invoiceForm.props().invoiceformData.price).toBe('');
    expect(invoiceForm.props().invoiceformData.advancePayment).toBe('');
    expect(invoiceForm.props().invoiceformData.advancePaymentDate).toBe('');
    expect(invoiceForm.props().invoiceformData.deliveryDate).toBe('');
    expect(invoiceForm.props().invoiceformData.isProductDelivered).toBe('');
    expect(invoiceForm.props().invoiceformData.returnDate).toBe('');
    expect(invoiceForm.props().invoiceformData.isProductReturn).toBe('');
    expect(invoiceForm.props().invoiceformData.products).toEqual([]);
    expect(invoiceForm.props().invoiceformData.productIds).toEqual([]);
  });
});