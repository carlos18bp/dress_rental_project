import { routes } from "@/router";
import { shallowMount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import invoicesData from '../../data_sample/invoices.json';
import Detail from '@/views/invoice/Detail.vue';
import ProductTable from '@/components/product/ProductTable.vue';


describe('Detail Invoice', () => {
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

    await router.push({ name: 'detail_invoice', 
                        params: { invoice: encodeURIComponent(JSON.stringify(invoicesData[0])) } });
    wrapper = getWrapper();
  });

  it('Detail invoice renders successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('invoice table component calls successfully', () => {
    const productTable = wrapper.findComponent(ProductTable);
    expect(productTable.exists()).toBe(true);
  });

  it('check sale and rental title', () => {  
    const saleOrRentalTitle = wrapper.find('.test-sale-rental h3');

    expect(saleOrRentalTitle.text()).toBe('Modalidad de Venta:');
  });

  it('check sale and rental value', () => {  
    const saleOrRentalValue = wrapper.find('.test-sale-rental p');

    expect(saleOrRentalValue.text()).toBe(invoicesData[0].type);
  });

  it('check price title', () => {  
    const priceTitle = wrapper.find('.test-price h3');

    expect(priceTitle.text()).toBe('Precio:');
  });

  it('check price value', () => {  
    const priceValue = wrapper.find('.test-price p');

    expect(priceValue.text()).toBe(`$${invoicesData[0].price} COP`);
  });

  it('check advance payment title', () => { 
    const advancePaymentTitle = wrapper.find('.test-advance-payment h3');

    expect(advancePaymentTitle.text()).toBe('Abono:');
  });

  it('check advance payment value', () => {
    const advancePaymentValue = wrapper.find('.test-advance-payment p');

    expect(advancePaymentValue.text()).toBe(`$${invoicesData[0].advancePayment} COP`);
  });

  it('check advance payment date title', () => { 
    const advancePaymentDateTitle = wrapper.find('.test-advance-payment-date h3');

    expect(advancePaymentDateTitle.text()).toBe('Fecha de Abono:');
  });

  it('check advance payment date value', () => {
    const advancePaymentDateValue = wrapper.find('.test-advance-payment-date p');

    expect(advancePaymentDateValue.text()).toBe(invoicesData[0].advancePaymentDate);
  });

  it('check product delivered title', () => { 
    const isProductDeliveredTitle = wrapper.find('.test-is-product-delivered h3');

    expect(isProductDeliveredTitle.text()).toBe('El Producto fue Entregado al Cliente:');
  });

  it('check product delivered value', () => {
    const isProductDeliveredValue = wrapper.find('.test-is-product-delivered p');

    expect(isProductDeliveredValue.text()).toBe(invoicesData[0].isProductDelivered ? 'Si' : 'No');
  });

  it('check delivery date title', () => { 
    const deliveryDateTitle = wrapper.find('.test-delivery-date h3');

    expect(deliveryDateTitle.text()).toBe('Fecha Estimada de Entrega al Cliente:');
  });

  it('check delivery date value',  () => {
    const deliveryDateValue = wrapper.find('.test-delivery-date p');

    expect(deliveryDateValue.text()).toBe(invoicesData[0].deliveryDate);
  });

  it('check return date title', () => {
    const returnDateTitle = wrapper.find('.test-return-date h3');

    expect(returnDateTitle.text()).toBe('Fecha Estimada de Devolución:');
  });

  it('check return date value', () => {
    const returnDateValue = wrapper.find('.test-return-date p');

    expect(returnDateValue.text()).toBe(invoicesData[0].returnDate);
  });

  it('check return title', () => {
    const isReturnTitle = wrapper.find('.test-is-product-return h3');

    expect(isReturnTitle.text()).toBe('El Producto fue Devuelto al Almacen:');
  });

  it('check product return value', () => {
    const isReturnValue = wrapper.find('.test-is-product-return p');

    expect(isReturnValue.text()).toBe(invoicesData[0].isProductReturn ? 'Si' : 'No');
  });

  it('check customer identification title', () => {  
    const customerTitle = wrapper.find('.test-customer-identification h3');

    expect(customerTitle.text()).toBe('Cédula del Cliente:');
  });

  it('check customer identification value', () => {  
    const customerValue = wrapper.find('.test-customer-identification p');

    expect(customerValue.text()).toBe(invoicesData[0]['customer']['identification'].toString());
  });

  it('check customer first and last name title', () => {  
    const customerTitle = wrapper.find('.test-customer-first-last-name h3');

    expect(customerTitle.text()).toBe('Nombre del Cliente:');
  });

  it('check customer first and last name value', () => {  
    const customerValue = wrapper.find('.test-customer-first-last-name p');

    expect(customerValue.text()).toBe(`${invoicesData[0]['customer']['firstName']} ${invoicesData[0]['customer']['lastName']}`);
  });

  it('check customer contact title', () => {  
    const customerTitle = wrapper.find('.test-customer-contact h3');

    expect(customerTitle.text()).toBe('Contacto del Cliente:');
  });

  it('check customer contact value', () => {  
    const customerValue = wrapper.find('.test-customer-contact p');

    expect(customerValue.text()).toBe(invoicesData[0]['customer']['contact']);
  });

  it('check customer email title', () => {  
    const customerTitle = wrapper.find('.test-customer-email h3');

    expect(customerTitle.text()).toBe('Correo Electronico del Cliente:');
  });

  it('check customer email value', () => {  
    const customerValue = wrapper.find('.test-customer-email p');

    expect(customerValue.text()).toBe(invoicesData[0]['customer']['email']);
  });
});