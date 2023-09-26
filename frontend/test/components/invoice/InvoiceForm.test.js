import axios from 'axios';
import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import customersData from '../../data_sample/customers.json';
import productsData from '../../data_sample/products.json';
import InvoiceForm from '@/components/invoice/InvoiceForm.vue';

describe('InvoiceForm', () => {
  const axiosMock = new AxiosMockAdapter(axios,  { onNoMatch: "throwException" }, { delayResponse: 1000 });
  let wrapper;
  let router;
  
  const mockIsFirstProduct = jest.fn().mockReturnValue(true);
  const mockIsProductSelected = jest.fn().mockReturnValue(false);

  const getWrapper = () => {
    return mount(InvoiceForm, {
      props: {
        action: 'create',
        invoiceformData: {
          type: '',
          price: '',
          advancePayment: '',
          advancePaymentDate: '',
          deliveryDate: '',
          isProductDelivered: '',
          returnDate: '',
          isProductReturn: '',
          customerId: '',
          products: [],
          productIds: [],
          selectedProductIdsLength: 1,
          isFirstProduct: mockIsFirstProduct,
          isProductSelected: mockIsProductSelected
        },
        model: 'invoice',
      },
      global: {
        plugins: [router],
      },
    });
  };

  beforeEach(async () => {
    axiosMock.onPost('/api/create_invoice/').reply(200, {
      data: { message: 'Record created successfully' },
    });

    axiosMock.onGet('/api/list_customers/').reply(200, customersData);

    axiosMock.onGet('/api/list_products/').reply(200, productsData);

    setActivePinia(createPinia());

    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    await router.push('/create_invoice');
    await router.isReady();

    wrapper = getWrapper();
  });

  it('invoice form calls successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('submits form invoice when the submit button is clicked', async () => {  
    const onSubmitSpy = jest.spyOn(wrapper.vm, 'onSubmit');

    await wrapper.find('.test-customer-select').setValue(customersData[0]['id']);
    await wrapper.find('.test-sale-rental-select').setValue('Venta');
    await wrapper.find('.test-price-input').setValue('200');
    await wrapper.find('.test-advance-payment-input').setValue('20');
    await wrapper.find('.test-advance-payment-date-input').setValue('2023-09-22');
    await wrapper.find('.test-is-product-delivered-select').setValue('Si');
    await wrapper.find('.test-delivery-date-input').setValue('2023-09-22');
    await wrapper.find('.test-is-product-return-select').setValue('No');

    await wrapper.find('form').trigger('submit.prevent');

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('do not call submit if there is no invoice data in the form', async () => {  
    const onSubmitSpy = jest.spyOn(wrapper.vm, 'onSubmit');

    await wrapper.find('form').trigger('submit.prevent');

    expect(onSubmitSpy).not.toHaveBeenCalled();
  });

  it('get the title of the create action', () => {
    const defineActionValue = wrapper.vm.defineAction;

    expect(defineActionValue).toBe('Crear Nuevo Venta:');
  });

  it('get the title of the edit action', async () => {
    await wrapper.setProps({
      action: 'edit',
    });
    const defineActionValue = wrapper.vm.defineAction;

    expect(defineActionValue).toBe('Editar Venta:');
  });

  it('check customer label', () => {  
    const customerLabel = wrapper.find('.test-customer-label');

    expect(customerLabel.text()).toBe('Customer:');
  });

  it('check customer select', async () => {  
    const customerSelect = wrapper.find('.test-customer-select');
    await customerSelect.setValue(customersData[0]['id']);

    expect(wrapper.vm.invoiceformData.customerId).toBe(customersData[0]['id']);
    expect(customerSelect.element.value).toBe(customersData[0]['id'].toString());
    expect(customerSelect.attributes()).toHaveProperty('required');
  });

  it('check product label', () => {  
    const productLabel = wrapper.find('.test-product-label');

    expect(productLabel.text()).toBe('Referencia del producto:');
  });

  it('check product select', async () => {
    const productSelect = wrapper.find('.test-product-select');
    await productSelect.setValue(productsData[0]['id']);
    
    expect(wrapper.vm.invoiceformData.productIds[0]).toBe(productsData[0]['id']);
    expect(productSelect.element.value).toBe(productsData[0]['id'].toString());
    expect(productSelect.attributes()).toHaveProperty('required');
  });

  it('check sale and rental label', () => {  
    const saleOrRentalLabel = wrapper.find('.test-sale-rental-label');

    expect(saleOrRentalLabel.text()).toBe('Venta / Alquiler:');
  });

  it('check sale and rental select', async () => {  
    const saleOrRentalSelect = wrapper.find('.test-sale-rental-select');
    await saleOrRentalSelect.setValue('Venta');

    expect(wrapper.vm.invoiceformData.type).toBe('Venta');
    expect(saleOrRentalSelect.element.value).toBe('Venta');
    expect(saleOrRentalSelect.attributes()).toHaveProperty('required');
  });

  it('check price label', () => {  
    const priceLabel = wrapper.find('.test-price-label');

    expect(priceLabel.text()).toBe('Precio (Sin comas ni puntos):');
  });

  it('check price input', async () => {  
    const priceInput = wrapper.find('.test-price-input');
    await priceInput.setValue('200');

    expect(priceInput.attributes('type')).toBe('number');
    expect(wrapper.vm.invoiceformData.price).toBe(200);
    expect(priceInput.element.value).toBe('200');
    expect(priceInput.attributes()).toHaveProperty('required');
  });

  it('check advance payment label', () => { 
    const advancePaymentLabel = wrapper.find('.test-advance-payment-label');

    expect(advancePaymentLabel.text()).toBe('Abono (Sin comas ni puntos):');
  });

  it('check advance payment input', async () => {
    const advancePaymentInput = wrapper.find('.test-advance-payment-input');
    await advancePaymentInput.setValue('20');

    expect(advancePaymentInput.attributes('type')).toBe('number');
    expect(wrapper.vm.invoiceformData.advancePayment).toBe(20);
    expect(advancePaymentInput.element.value).toBe('20');
    expect(advancePaymentInput.attributes()).toHaveProperty('required');
  });

  it('check advance payment date label', () => { 
    const advancePaymentDateLabel = wrapper.find('.test-advance-payment-date-label');

    expect(advancePaymentDateLabel.text()).toBe('Fecha de Abono:');
  });

  it('check advance payment date input', async () => {
    const advancePaymentDateInput = wrapper.find('.test-advance-payment-date-input');
    await advancePaymentDateInput.setValue('2023-09-20');

    expect(advancePaymentDateInput.attributes('type')).toBe('date');
    expect(wrapper.vm.invoiceformData.advancePaymentDate).toBe('2023-09-20');
    expect(advancePaymentDateInput.element.value).toBe('2023-09-20');
    expect(advancePaymentDateInput.attributes()).toHaveProperty('required');
  });

  it('check product delivered label', () => { 
    const isProductDeliveredLabel = wrapper.find('.test-is-product-delivered-label');

    expect(isProductDeliveredLabel.text()).toBe('El Producto fue Entregado al Cliente:');
  });

  it('check product delivered input', async () => {
    const isProductDeliveredInput = wrapper.find('.test-is-product-delivered-select');
    await isProductDeliveredInput.setValue('true');

    expect(wrapper.vm.invoiceformData.isProductDelivered).toBe('true');
    expect(isProductDeliveredInput.element.value).toBe('true');
  });

  it('check delivery date label', () => { 
    const deliveryDateLabel = wrapper.find('.test-delivery-date-label');

    expect(deliveryDateLabel.text()).toBe('Fecha Estimada de Entrega al Cliente:');
  });

  it('check delivery date input', async () => {
    const deliveryDateInput = wrapper.find('.test-delivery-date-input');
    await deliveryDateInput.setValue('2023-09-22');

    expect(deliveryDateInput.attributes('type')).toBe('date');
    expect(wrapper.vm.invoiceformData.deliveryDate).toBe('2023-09-22');
    expect(deliveryDateInput.element.value).toBe('2023-09-22');
    expect(deliveryDateInput.attributes()).toHaveProperty('required');
  });

  it('check return date label', async () => {
    await wrapper.find('.test-sale-rental-select').setValue('Alquiler');
    const returnDateLabel = wrapper.find('.test-return-date-label');

    expect(returnDateLabel.text()).toBe('Fecha Estimada de Devolución:');
  });

  it('check return date input', async () => {
    await wrapper.find('.test-sale-rental-select').setValue('Alquiler');
    const returnDateInput = wrapper.find('.test-return-date-input');
    await returnDateInput.setValue('2023-09-25');

    expect(returnDateInput.attributes('type')).toBe('date');
    expect(wrapper.vm.invoiceformData.returnDate).toBe('2023-09-25');
    expect(returnDateInput.element.value).toBe('2023-09-25');
    expect(returnDateInput.attributes()).toHaveProperty('required');
  });

  it('check return label', async () => {
    await wrapper.find('.test-sale-rental-select').setValue('Alquiler');
    const isReturnLabel = wrapper.find('.test-is-product-return-label');

    expect(isReturnLabel.text()).toBe('El Producto fue Devuelto:');
  });

  it('check product return select', async () => {
    await wrapper.find('.test-sale-rental-select').setValue('Alquiler');
    const isReturnSelect = wrapper.find('.test-is-product-return-select');
    await isReturnSelect.setValue('false');

    expect(wrapper.vm.invoiceformData.isProductReturn).toBe('false');
    expect(isReturnSelect.element.value).toBe('false');
    expect(isReturnSelect.attributes()).toHaveProperty('required');
  });
});