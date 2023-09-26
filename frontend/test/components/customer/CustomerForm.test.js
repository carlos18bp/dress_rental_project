import axios from 'axios';
import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia';
import customersData from '../../data_sample/customers.json';
import { createRouter, createWebHistory } from 'vue-router'
import CustomerForm from '@/components/customer/CustomerForm.vue';


describe('CustomerForm', () => {
  const axiosMock = new AxiosMockAdapter(axios,  { onNoMatch: "throwException" }, { delayResponse: 1000 });
  let wrapper;
  let router;

  const getWrapper = () => {
    return mount(CustomerForm, {
      props: {
        action: 'create',
        customerformData: { 
          identification: '',
          firstName: '',
          lastName: '',
          email: '',
          contact: '',
          secondContact: '',
          address: '',
         },
        model: 'customer',
      },
      global: {
        plugins: [router],
      },
    });
  };

  beforeEach(async () => {
    axiosMock.onPost('/api/create_customer/').reply(200, {
      data: { message: 'Record created successfully' },
    });

    setActivePinia(createPinia());

    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    await router.push('/create_customer');
    await router.isReady();

    wrapper = getWrapper();
  });

  it('customer form calls successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('submits form customer when the submit button is clicked', async () => {  
    const onSubmitSpy = jest.spyOn(wrapper.vm, 'onSubmit');
    
    await wrapper.find('.test-identification-input').setValue(customersData[0].identification);
    await wrapper.find('.test-first-name-input').setValue(customersData[0].firstName);
    await wrapper.find('.test-last-name-input').setValue(customersData[0].lastName);
    await wrapper.find('.test-contact-input').setValue(customersData[0].contact);

    await wrapper.find('form').trigger('submit.prevent');

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('do not call submit if there is no customer data in the form', async () => {  
    const onSubmitSpy = jest.spyOn(wrapper.vm, 'onSubmit');

    await wrapper.find('form').trigger('submit.prevent');

    expect(onSubmitSpy).not.toHaveBeenCalled();
  });

  it('get the title of the create action', () => {
    const defineActionValue = wrapper.vm.defineAction;

    expect(defineActionValue).toBe('Crear Nuevo Cliente:');
  });

  it('get the title of the edit action', async () => {
    await wrapper.setProps({
      action: 'edit',
    });
    const defineActionValue = wrapper.vm.defineAction;

    expect(defineActionValue).toBe('Editar Cliente:');
  });

  it('check identification label', () => {  
    const identificationLabel = wrapper.find('.test-identification-label');

    expect(identificationLabel.text()).toBe('Número de Cédula:');
  });

  it('check identification input', async () => {  
    const identificationInput = wrapper.find('.test-identification-input');
    await identificationInput.setValue(customersData[0].identification);
    
    expect(identificationInput.attributes('type')).toBe('number');
    expect(wrapper.vm.customerformData.identification).toBe(customersData[0].identification);
    expect(identificationInput.element.value).toBe(customersData[0].identification.toString());
    expect(identificationInput.attributes()).toHaveProperty('required');
  });

  it('check first name label', () => {  
    const firstNameLabel = wrapper.find('.test-first-name-label');

    expect(firstNameLabel.text()).toBe('Nombre:');
  });

  it('check first name input', async () => {  
    const firstNameInput = wrapper.find('.test-first-name-input');
    await firstNameInput.setValue(customersData[0].firstName);

    expect(firstNameInput.attributes('type')).toBe('text');
    expect(wrapper.vm.customerformData.firstName).toBe(customersData[0].firstName);
    expect(firstNameInput.element.value).toBe(customersData[0].firstName);
    expect(firstNameInput.attributes()).toHaveProperty('required');
  });

  it('check last name label', () => {  
    const lastNameLabel = wrapper.find('.test-last-name-label');

    expect(lastNameLabel.text()).toBe('Apellido:');
  });

  it('check last name input', async () => {  
    const lastNameInput = wrapper.find('.test-last-name-input');
    await lastNameInput.setValue(customersData[0].lastName);

    expect(lastNameInput.attributes('type')).toBe('text');
    expect(wrapper.vm.customerformData.lastName).toBe(customersData[0].lastName);
    expect(lastNameInput.element.value).toBe(customersData[0].lastName);
    expect(lastNameInput.attributes()).toHaveProperty('required');
  });

  it('check email label', () => {  
    const emailLabel = wrapper.find('.test-email-label');

    expect(emailLabel.text()).toBe('Email:');
  });

  it('check email input', async () => {  
    const emailInput = wrapper.find('.test-email-input');
    await emailInput.setValue(customersData[0].email);

    expect(emailInput.attributes('type')).toBe('email');
    expect(wrapper.vm.customerformData.email).toBe(customersData[0].email);
    expect(emailInput.element.value).toBe(customersData[0].email);
    expect(emailInput.attributes()).not.toHaveProperty('required');
  });

  it('check contact label', () => {  
    const contactLabel = wrapper.find('.test-contact-label');

    expect(contactLabel.text()).toBe('Número De Contacto:');
  });

  it('check contact input', async () => {  
    const contactInput = wrapper.find('.test-contact-input');
    await contactInput.setValue(customersData[0].contact);

    expect(contactInput.attributes('type')).toBe('number');
    expect(wrapper.vm.customerformData.contact).toBe(parseInt(customersData[0].contact));
    expect(contactInput.element.value).toBe(customersData[0].contact);
    expect(contactInput.attributes()).toHaveProperty('required');
  });

  it('check second contact label', () => {  
    const secondContactLabel = wrapper.find('.test-second-contact-label');

    expect(secondContactLabel.text()).toBe('Número De Contacto Secundario (opcional):');
  });

  it('check second contact input', async () => {  
    const secondContactInput = wrapper.find('.test-second-contact-input');
    await secondContactInput.setValue(customersData[0].secondContact);

    expect(secondContactInput.attributes('type')).toBe('number');
    expect(wrapper.vm.customerformData.secondContact).toBe(parseInt(customersData[0].secondContact));
    expect(secondContactInput.element.value).toBe(customersData[0].secondContact);
    expect(secondContactInput.attributes()).not.toHaveProperty('required');
  });

  it('check address label', () => {  
    const addressLabel = wrapper.find('.test-address-label');

    expect(addressLabel.text()).toBe('Direccion (opcional):');
  });

  it('check address input', async () => {  
    const addressInput = wrapper.find('.test-address-input');
    await addressInput.setValue(customersData[0].address);

    expect(addressInput.attributes('type')).toBe('text');
    expect(wrapper.vm.customerformData.address).toBe(customersData[0].address);
    expect(addressInput.element.value).toBe(customersData[0].address);
    expect(addressInput.attributes()).not.toHaveProperty('required');
  });
});