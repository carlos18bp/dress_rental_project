import { defineStore } from "pinia";
import {
  create_request,
  edit_request,
  get_request,
  delete_request,
} from "./services/request_http";

export const useDressRentalStore = defineStore("dress_rental", {
  state: () => ({
    categories: [],
    customers: [],
    products: [],
    sales: [],
  }),
  actions: {
    async createRequest(endPoint, formData) {
      await create_request(`/api/${endPoint}`, JSON.stringify(formData));
    },
    async editRequest(endPoint, formData) {
      await edit_request(`/api/${endPoint}`, JSON.stringify(formData));
    },
    async fetchCategoriesData() {
      const jsonData = await get_request("api/list_categories/");
      if (jsonData) {
        this.categories = JSON.parse(jsonData).map((item) => {
          return {
            id: item.pk,
            type: item.fields.type,
          };
        });
      }
    },
    async fetchCustomersData() {
      const jsonData = await get_request("api/list_customers/");
      this.customers = jsonData ? JSON.parse(jsonData) : [];
    },
    async fetchProductsData() {
      const jsonData = await get_request("api/list_products/");
      this.products = jsonData ? JSON.parse(jsonData) : [];
    },
    async fetchSalesData() {
      const jsonData = await get_request("api/list_sales/");
      this.sales = jsonData ? JSON.parse(jsonData) : [];
    },
    async deleteCustomer(customerId) {
      await delete_request(`api/delete_customer/${customerId}/`);
      this.fetchCustomersData();
    },
    async deleteProduct(productId) {
      await delete_request(`api/delete_product/${productId}/`);
      this.fetchProductsData();
    },
    async deleteSale(saleId) {
      await delete_request(`api/delete_sale/${saleId}/`);
      this.fetchSalesData();
    },
  },
});
