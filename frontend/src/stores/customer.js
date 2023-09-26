import { defineStore } from "pinia";
import { get_request } from "./services/request_http";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [],
    areUpdateCustomers: false,
  }),
  getters: {
    /**
     * Filter by customer identification.
     * @param {object} state - State. 
     * @returns {array} - Customer identification occurrences.
     */
    filterByIdentification: (state) => (query) => {
      return state.customers.filter(customer => {
        return customer.identification.toString().includes(query)
      });
    },
    /**
     * Filter by Customer first or last name.
     * @param {object} state - State. 
     * @returns {array} - Customer first or last name occurrences.
     */
    filterByFirstOrLastName: (state) => (query) => {
      return state.customers.filter(customer => {
        return customer.firstName.toLowerCase().includes(query.toLowerCase()) || 
               customer.lastName.toLowerCase().includes(query.toLowerCase());
      });
    },
  },
  actions: {
    /**
     * Fetch data from backend.
     */
    async init() {
      if(!this.areUpdateCustomers) this.fetchCustomersData();
    },
    /**
     * Fetch customer from backend.
     */
    async fetchCustomersData() {
      if(this.areUpdateCustomers) return;

      let jsonData = await get_request("api/list_customers/");
      if (jsonData && typeof jsonData === 'string') {
        jsonData = JSON.parse(jsonData)
      }
      this.customers = jsonData ?? [];
      
      this.areUpdateCustomers = true;
    },
  }
});

