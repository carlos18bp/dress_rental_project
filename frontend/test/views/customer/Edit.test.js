import { routes } from "@/router";
import { shallowMount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import customersData from '../../data_sample/customers.json';
import Edit from '@/views/customer/Edit.vue';
import CustomerForm from '@/components/customer/CustomerForm.vue'


describe('Edit Customer', () => {
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

    await router.push({ name: 'edit_customer', 
                        params: { customer: encodeURIComponent(JSON.stringify(customersData[0])) } });

    wrapper = getWrapper();
  })

  it('Edit customer renders successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });
  
  it('customer form component calls successfully', () => {
    const customerForm = wrapper.findComponent(CustomerForm);
    expect(customerForm.exists()).toBe(true);
  });

  it('check props to customer form', () => {
    const customerForm = wrapper.findComponent(CustomerForm);

    expect(customerForm.props().action).toBe('edit');
    expect(customerForm.props().model).toBe('customer');

    expect(customerForm.props().customerformData.identification).toBe(customersData[0].identification);
    expect(customerForm.props().customerformData.firstName).toBe(customersData[0].firstName);
    expect(customerForm.props().customerformData.lastName).toBe(customersData[0].lastName);
    expect(customerForm.props().customerformData.email).toBe(customersData[0].email);
    expect(customerForm.props().customerformData.contact).toBe(customersData[0].contact);
    expect(customerForm.props().customerformData.secondContact).toBe(customersData[0].secondContact);
    expect(customerForm.props().customerformData.address).toBe(customersData[0].address);
  });
});