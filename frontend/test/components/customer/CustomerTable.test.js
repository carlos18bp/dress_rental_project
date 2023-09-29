import { routes } from "@/router";
import { shallowMount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router';
import customersData from '../../data_sample/customers.json';
import CustomerTable from '@/components/customer/CustomerTable.vue';


describe('CustomerTable', () => {
  let wrapper;
  let router;

  const getWrapper = () => {
    return shallowMount(CustomerTable, {
      props: {
        customers: customersData,
      },
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

    await router.push('/list_customers');
    await router.isReady();

    wrapper = getWrapper();
  })

  it('Customer table calls successfully', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render correctly when customers prop is provided', () => {
    expect(wrapper.find('table').exists()).toBe(true);

    expect(wrapper.findAll('tbody tr')).toHaveLength(customersData.length);
  });

  it('should not render table when customers prop is not provided', () => {
    const wrapper = shallowMount(CustomerTable, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('table').exists()).toBe(false);
  });

  it('should render customer data correctly', () => {
    customersData.forEach((customer, index) => {
      const row = wrapper.findAll('tbody tr').at(index);

      expect(row.find(':nth-child(1)').text()).toBe((index+1).toString());
      expect(row.find(':nth-child(2)').text()).toBe(customer.identification.toString());
      expect(row.find(':nth-child(3)').text()).toBe(customer.firstName);
      expect(row.find(':nth-child(4)').text()).toBe(customer.lastName);
      expect(row.find(':nth-child(5)').text()).toBe(customer.email);
      expect(row.find(':nth-child(6)').text()).toBe(customer.contact);
    });
  });

  it('should correctly check for sales or rentals', () => {
    expect(wrapper.vm.hasSaleOrRental(customersData[0])).toBe(true);
    expect(wrapper.vm.hasSaleOrRental(customersData[1])).toBe(true);
  });
});