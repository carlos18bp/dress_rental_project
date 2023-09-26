import { routes } from "@/router";
import { shallowMount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import invoicesData from '../../data_sample/invoices.json';
import { createRouter, createWebHistory } from 'vue-router';
import Edit from '@/views/invoice/Edit.vue';
import InvoiceForm from '@/components/invoice/InvoiceForm.vue'

describe('Edit Invoice', () => {
  let wrapper;
  let router;
  
  const getWrapper = () => {
    return shallowMount(Edit, {
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

    await router.push({ name: 'edit_invoice', 
                        params: { invoice: encodeURIComponent(JSON.stringify(invoicesData[0])) } });

    wrapper = getWrapper();
  })

  it('Edit invoice renders successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('invoice form component calls successfully', () => {
    const invoiceForm = wrapper.findComponent(InvoiceForm);
    expect(invoiceForm.exists()).toBe(true);
  });

  it('check props to invoice form', () => {
    const invoiceForm = wrapper.findComponent(InvoiceForm);

    expect(invoiceForm.props().action).toBe('edit');
    expect(invoiceForm.props().model).toBe('invoice');

    expect(invoiceForm.props().invoiceformData.type).toBe(invoicesData[0].type);
    expect(invoiceForm.props().invoiceformData.price).toBe(invoicesData[0].price);
    expect(invoiceForm.props().invoiceformData.advancePayment).toBe(invoicesData[0].advancePayment);
    expect(invoiceForm.props().invoiceformData.advancePaymentDate).toBe(invoicesData[0].advancePaymentDate);
    expect(invoiceForm.props().invoiceformData.deliveryDate).toBe(invoicesData[0].deliveryDate);
    expect(invoiceForm.props().invoiceformData.isProductDelivered).toBe(invoicesData[0].isProductDelivered);
    expect(invoiceForm.props().invoiceformData.returnDate).toBe(invoicesData[0].returnDate);
    expect(invoiceForm.props().invoiceformData.isProductReturn).toBe(invoicesData[0].isProductReturn);
    expect(invoiceForm.props().invoiceformData.products).toEqual(invoicesData[0].products);
    expect(invoiceForm.props().invoiceformData.productIds).toEqual(invoicesData[0].productIds);
  });
});