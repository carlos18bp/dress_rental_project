import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia';
import * as requestHttpModule from "@/stores/services/request_http";
import { useCustomerStore } from "@/stores/customer";
import customersData from '../data_sample/customers.json';

let store;
beforeEach(() => {
  setActivePinia(createPinia());
});

describe("useCustomerStore getters", () => {

  beforeEach(() => {
    store = useCustomerStore();
  });

  it("filterByIdentification filters customers by identification", () => {
    store.customers = [
      { identification: "12345" },
      { identification: "67890" },
      { identification: "54123" },
    ];

    const filteredCustomers = store.filterByIdentification("123");

    expect(filteredCustomers).toHaveLength(2);
    expect(filteredCustomers[0].identification).toBe("12345");
    expect(filteredCustomers[1].identification).toBe("54123");
  });

  it("filterByFirstOrLastName filters customers by first or last name", () => {
    store.customers = [
      { firstName: "John", lastName: "Doe" },
      { firstName: "Wilson", lastName: "Jowell" },
      { firstName: "Jane", lastName: "Smith" },
    ];

    const filteredCustomers = store.filterByFirstOrLastName("Jo");

    expect(filteredCustomers).toHaveLength(2);
    expect(filteredCustomers[0].firstName).toBe("John");
    expect(filteredCustomers[1].lastName).toBe("Jowell");
  });
});

describe("useCustomerStore actions", () => {
  const axiosMock = new AxiosMockAdapter(axios,  { onNoMatch: "throwException" }, { delayResponse: 1000 });

  beforeEach(() => {
    store = useCustomerStore();
  });

  it("fetchCustomersData fetches customer data", async () => {
    axiosMock.onGet('api/list_customers/').reply(200, customersData);

    await store.fetchCustomersData();

    expect(store.customers).toEqual(customersData);
    expect(store.areUpdateCustomers).toBeTruthy();
  });

  it("init should not call get_request when areUpdateCustomers is true", async () => {
    const get_requestSpy = jest.spyOn(requestHttpModule, "get_request");

    store.areUpdateCustomers = true;

    await store.init();

    expect(get_requestSpy).not.toHaveBeenCalled();
  });

  it("fetchCustomersData should not call get_request when areUpdateCustomers is true", async () => {
    const get_requestSpy = jest.spyOn(requestHttpModule, "get_request");

    store.areUpdateCustomers = true;

    await store.fetchCustomersData();

    expect(get_requestSpy).not.toHaveBeenCalled();
  });
});