import { defineStore } from 'pinia';
import { get_request, post_request } from './services/request_http';

export const useDressRentalStore = defineStore('dress_rental', {
  state: () => ({
    customers: [],
    customersFetched: false,
    products: [],
    productsFetched: false,
    sales: [],
    salesFetched: false
  }),
  actions: {
    async fetchCustomersData() {
      const jsonData = await get_request('api/customers_list/');
      
      this.customers = JSON.parse(jsonData).map(item => {
        return {
          id: item.pk,
          identification: item.fields.identification,
          first_name: item.fields.first_name,
          last_name: item.fields.last_name,
          email: item.fields.email,
          phone_number: item.fields.phone_number
        };        
      });
      this.customersFetched = true
    },
    async fetchProductsData() {
        const jsonData = await get_request('api/products_list/');
      
        this.products = JSON.parse(jsonData).map(item => {
          return {
            id: item.pk,
            title: item.fields.title,
            reference: item.fields.reference,
            category: item.fields.category
          };
        });
        this.productsFetched = true
    },
    async fetchSalesData() {
        const jsonData  = await get_request('api/sales_list/');  
        this.sales = JSON.parse(jsonData);
        this.salesFetched = true
    },
    async deleteCustomer(customerId) {
        await post_request(`api/delete_customer/${customerId}/`);
        this.fetchCustomersData();
    },
    async deleteProduct(productId) {
      await post_request(`api/delete_product/${productId}/`);
      this.fetchProductsData();
    },
    async deleteSale(saleId) {
      await post_request(`api/delete_sale/${saleId}/`);
      this.fetchSalesData();
    },
  },
});