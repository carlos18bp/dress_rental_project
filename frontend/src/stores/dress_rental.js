import { defineStore } from "pinia";
import {
  create_request,
  edit_request,
  get_request,
  delete_request,
  update_request,
} from "./services/request_http";

export const useDressRentalStore = defineStore("dress_rental", {
  state: () => ({
    categories: [],
    areUpdateCategories: false,
    customers: [],
    areUpdateCustomers: false,
    products: [],
    areUpdateProducts: false,
    sales: [],
    areUpdateSales: false,
  }),
  getters: {
    filterByIdentification: (state) => (query) => {
      return state.customers.filter(customer => {
        return customer.identification.toString().includes(query)
      });
    },
    filterByFirstOrLastName: (state) => (query) => {
      return state.customers.filter(customer => {
        return customer.firstName.toLowerCase().includes(query) || 
               customer.lastName.toLowerCase().includes(query);
      });
    },
    filterAvailableProducts: (state) => {
      return state.products.filter(product => !product.hasSale);
    },
    filterSaleProducts: (state) => {
      return state.products.filter(product => product.hasSale);
    },
    filterRentalProducts: (state) => {
      return state.products.filter(product => product.hasRental);
    },
    filterSalesByTypeSale: (state) => {
      return state.sales.filter(sale => sale.type === 'Venta');
    },
    filterSalesByTypeRental: (state) => {
      return state.sales.filter(sale => sale.type === 'Alquiler');
    },
    filterPendingDeliverySale: (state) => {
      return state.sales.filter(sale => sale.type === 'Venta' && 
                                        !sale.isProductDelivered);
    },
    filterPendingDeliveryRental: (state) => {
      return state.sales.filter(sale => sale.type === 'Alquiler' && 
                                        !sale.isProductDelivered);
    },
    filterExpiredDeliverySales: (state) => {
      return state.sales.filter(sale => sale.type === 'Alquiler' &&
                                        sale.isProductReturn === false && 
                                        new Date(sale.returnDate) < new Date());
    },
  },
  actions: {
    async init() {
      if(!this.areUpdateCustomers) this.fetchCustomersData();
      if(!this.areUpdateCategories) this.fetchCategoriesData();
      if(!this.areUpdateProducts) this.fetchProductsData();
      if(!this.areUpdateSales) this.fetchSalesData();
    },
    async createRequest(formData, createModel) {
      await create_request(`/api/create_${createModel}/`, JSON.stringify(formData));
      this.updateData(createModel);
    },
    async editRequest(formData, editModel) {
      await edit_request(`/api/edit_${editModel}/`, JSON.stringify(formData));
      this.updateData(editModel);
    },
    async fetchCategoriesData() {
      if(this.areUpdateCategories) return;

      const jsonData = await get_request("api/list_categories/");
      if (jsonData) {
        this.categories = JSON.parse(jsonData).map((item) => {
          return {
            id: item.pk,
            type: item.fields.type,
          };
        });
      }
      this.areUpdateCategories = true;
    },
    async fetchCustomersData() {
      if(this.areUpdateCustomers) return;

      const jsonData = await get_request("api/list_customers/");
      this.customers = JSON.parse(jsonData) ?? [];
      this.areUpdateCustomers = true;
    },
    async fetchProductsData() {
      if(this.areUpdateProducts) return;

      const jsonData = await get_request("api/list_products/");
      this.products = JSON.parse(jsonData) ?? [];
      this.areUpdateProducts = true;
    },
    async fetchSalesData() {
      if(this.areUpdateSales) return;

      const jsonData = await get_request("api/list_sales/");
      this.sales =  JSON.parse(jsonData) ?? [];
      this.areUpdateSales = true;
    },
    async delete(id, deleteModel) {
      await delete_request(`api/delete_${deleteModel}/${id}/`);
      this.updateData(deleteModel);
    },
    async updateData(updateModel) {
      switch (updateModel) {
        case "customer":
          this.areUpdateCustomers = false;
          break;
        case "product":
          this.areUpdateProducts = false;
          break;
        case "sale":
          this.areUpdateSales = false;
          break;
        default:
          throw new Error(`Unsupported model: ${updateModel}`);
      }
    },
    async saleFinished(saleId) {
      await update_request(`/api/close_sale/${saleId}/`);
      this.updateData('sale');
    },
  },
});
