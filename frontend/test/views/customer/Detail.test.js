import { routes } from "@/router";
import { shallowMount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import customersData from '../../data_sample/customers.json';
import { createRouter, createWebHistory } from 'vue-router';
import Detail from '@/views/customer/Detail.vue';
import InvoiceTable from '@/components/invoice/InvoiceTable.vue';


describe('Detail Customer', () => {
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

    await router.push({ name: 'detail_customer', 
                        params: { customer: encodeURIComponent(JSON.stringify(customersData[0])) } });

    wrapper = getWrapper();
  })

  it('Detail customer renders successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('invoice table component calls successfully', () => {
    const invoiceTable = wrapper.findComponent(InvoiceTable);
    expect(invoiceTable.exists()).toBe(true);
  });

  it('check identification title', () => {  
    const identificationTitle = wrapper.find('.test-identification h3');

    expect(identificationTitle.text()).toBe('Número de Cédula:');
  });

  it('check identification value', () => {  
    const identificationValue = wrapper.find('.test-identification p');

    expect(identificationValue.text()).toBe(customersData[0].identification.toString());
  });

  it('check first name title', () => {  
    const firstNameTitle = wrapper.find('.test-first-name h3');

    expect(firstNameTitle.text()).toBe('Nombre:');
  });

  it('check first name value', () => {  
    const firstNameValue = wrapper.find('.test-first-name p');

    expect(firstNameValue.text()).toBe(customersData[0].firstName);
  });

  it('check last name title', () => {  
    const lastNameTitle = wrapper.find('.test-last-name h3');

    expect(lastNameTitle.text()).toBe('Apellido:');
  });

  it('check last name value', () => {  
    const lastNameValue = wrapper.find('.test-last-name p');

    expect(lastNameValue.text()).toBe(customersData[0].lastName);
  });

  it('check email title', () => {  
    const emailTitle = wrapper.find('.test-email h3');

    expect(emailTitle.text()).toBe('Correo Electronico:');
  });

  it('check email value', () => {  
    const emailValue = wrapper.find('.test-email p');

    expect(emailValue.text()).toBe(customersData[0].email);
  });

  it('check contact title', () => {  
    const contactTitle = wrapper.find('.test-contact h3');

    expect(contactTitle.text()).toBe('Número De Contacto:');
  });

  it('check contact value', () => {  
    const contactValue = wrapper.find('.test-contact p');

    expect(contactValue.text()).toBe(customersData[0].contact);
  });

  it('check second contact title', () => {  
    const secondContactTitle = wrapper.find('.test-second-contact h3');

    expect(secondContactTitle.text()).toBe('Número De Contacto Secundario:');
  });

  it('check second contact value', () => {  
    const secondContactValue = wrapper.find('.test-second-contact p');

    expect(secondContactValue.text()).toBe(customersData[0].secondContact);
  });

  it('check address title', () => {  
    const addressTitle = wrapper.find('.test-address h3');

    expect(addressTitle.text()).toBe('Direccion:');
  });

  it('check address value', () => {  
    const addressValue = wrapper.find('.test-address p');

    expect(addressValue.text()).toBe(customersData[0].address);
  });
});