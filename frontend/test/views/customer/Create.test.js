import { routes } from "@/router";
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import Create from '@/views/customer/Create.vue';
import CustomerForm from '@/components/customer/CustomerForm.vue'

describe('Create Customer', () => {
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
    setActivePinia(createPinia());
    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })

    await router.push('/create_customer');
    await router.isReady();

    wrapper = getWrapper();
  });

  it('create customer renders successfully', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('customer form component calls successfully', () => {
    const customerForm = wrapper.findComponent(CustomerForm);
    expect(customerForm.exists()).toBe(true);
  });

  it('check props to customer form', () => {
    const customerForm = wrapper.findComponent(CustomerForm);

    expect(customerForm.props().action).toBe('create');
    expect(customerForm.props().model).toBe('customer');

    expect(customerForm.props().customerformData.identification).toBe('');
    expect(customerForm.props().customerformData.firstName).toBe('');
    expect(customerForm.props().customerformData.lastName).toBe('');
    expect(customerForm.props().customerformData.email).toBe('');
    expect(customerForm.props().customerformData.contact).toBe('');
    expect(customerForm.props().customerformData.secondContact).toBe('');
    expect(customerForm.props().customerformData.address).toBe('');
  });
});