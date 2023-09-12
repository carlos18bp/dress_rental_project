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
    invoices: [],
    areUpdateInvoices: false,
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
        return customer.firstName.toLowerCase().includes(query) || 
               customer.lastName.toLowerCase().includes(query);
      });
    },
    /**
     * Filter by available products.
     * @param {object} state - State. 
     * @returns {array} - Available products occurrences.
     */
    filterAvailableProducts: (state) => {
      return state.products.filter(product => !product.hasSale);
    },
    /**
     * Filter available products by an invoice.
     * @param {object} state - State. 
     * @returns {array} - Available products by an invoice.
     */
    filterAvailableProductsByInvoice: (state) => (invoice) => {
      return state.products.filter(product => product.hasRental || 
        invoice.productIds.includes(product.id));
    },
    /**
     * Filter by invoice products
     * @param {object} state - State. 
     * @returns {array} - Invoice products occurrences.
     */
    filterInvoiceProducts: (state) => {
      return state.products.filter(product => product.hasSale);
    },
    /**
     * Filter by rental products.
     * @param {object} state - State. 
     * @returns {array} - Rental products occurrences.
     */
    filterRentalProducts: (state) => {
      return state.products.filter(product => product.hasRental);
    },
    /**
     * Filter by invoice type.
     * @param {object} state - State. 
     * @returns {array} - Invoices sale type occurrences.
     */
    filterInvoicesByTypeInvoice: (state) => {
      return state.invoices.filter(invoice => invoice.type === 'Venta');
    },
    /**
     * Filter by invoice rental.
     * @param {object} state - State. 
     * @returns {array} - Invoice rental type occurrences.
     */
    filterInvoicesByTypeRental: (state) => {
      return state.invoices.filter(invoice => invoice.type === 'Alquiler');
    },
    /**
     * Filter by pending delivery invoice type.
     * @param {object} state - State. 
     * @returns {array} - Pending delivery invoice type occurrences.
     */
    filterPendingDeliveryInvoice: (state) => {
      return state.invoices.filter(invoice => invoice.type === 'Venta' && 
                                              !invoice.isProductDelivered);
    },
    /**
     * Filter by pending delivery rental.
     * @param {object} state - State. 
     * @returns {array} - Pending delivery rental type occurrences.
     */
    filterPendingDeliveryRental: (state) => {
      return state.invoices.filter(invoice => invoice.type === 'Alquiler' && 
                                              !invoice.isProductDelivered);
    },
    /**
     * Filter by return expired rental type.
     * @param {object} state - State. 
     * @returns {array} - Return expired rental type occurrences.
     */
    filterReturnExpiredRental: (state) => {
      return state.invoices.filter(invoice => invoice.type === 'Alquiler' &&
                                              invoice.isProductReturn === false && 
                                              new Date(invoice.returnDate) < new Date());
    },
    /**
     * Get product by id.
     * @param {object} state - State. 
     * @returns {array} - product by id occurrence.
     */
    productById: (state) => (productId) => {
      return state.products.find(product => product.id === productId);
    },
    /**
     * Find invoice id.
     * @param {integer} invoiceId - Invoice id.
     * @returns {integer} - Invoice id.
     */
    invoiceById: (state) => (invoiceId) => {
      return state.invoices.find(invoice => invoice.id === invoiceId);
    }
  },
  actions: {
    /**
     * Fetch data from backend.
     */
    async init() {
      if(!this.areUpdateCustomers) this.fetchCustomersData();
      if(!this.areUpdateCategories) this.fetchCategoriesData();
      if(!this.areUpdateProducts) this.fetchProductsData();
      if(!this.areUpdateInvoices) this.fetchInvoicesData();
    },
    /**
     * Call creation request.
     * @param {object} formData - Form data.
     * @param {string} createModel - model reference.
     */
    async createRequest(formData, createModel) {
      await create_request(`/api/create_${createModel}/`, JSON.stringify(formData));
      this.updateData(createModel);
    },
    /**
     * Call edit request.
     * @param {object} formData - Form data.
     * @param {string} editModel - model reference.
     */
    async editRequest(formData, editModel) {
      await edit_request(`/api/edit_${editModel}/`, JSON.stringify(formData));
      this.updateData(editModel);
    },
    /**
     * Fetch categories from backend.
     */
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
    /**
     * Fetch customer from backend.
     */
    async fetchCustomersData() {
      if(this.areUpdateCustomers) return;

      const jsonData = await get_request("api/list_customers/");
      this.customers = JSON.parse(jsonData) ?? [];
      this.areUpdateCustomers = true;
    },
    /**
     * Fetch products from backend.
     */
    async fetchProductsData() {
      if(this.areUpdateProducts) return;

      const jsonData = await get_request("api/list_products/");
      this.products = JSON.parse(jsonData) ?? [];
      this.areUpdateProducts = true;
    },
    /**
     * Fetch invoices from backend.
     */
    async fetchInvoicesData() {
      if(this.areUpdateInvoices) return;

      const jsonData = await get_request("api/list_invoices/");
      this.invoices =  JSON.parse(jsonData) ?? [];
      this.areUpdateInvoices = true;
    },
    /**
     * Delete request.
     */
    async delete(id, deleteModel) {
      await delete_request(`api/delete_${deleteModel}/${id}/`);
      this.updateData(deleteModel);
    },
    /**
     * Update state based on model reference.
     * @param {string} updateModel - model reference.
     */
    async updateData(updateModel) {
      switch (updateModel) {
        case "customer":
          this.areUpdateCustomers = false;
          break;
        case "product":
          this.areUpdateProducts = false;
          break;
        case "invoice":
          this.areUpdateInvoices = false;
          break;
        default:
          throw new Error(`Unsupported model: ${updateModel}`);
      }
    },
    /**
     * Define invoice as finished.
     * @param {integer} invoiceId - Invoice id.
     */
    async invoiceFinished(invoiceId) {
      await update_request(`/api/close_invoice/${invoiceId}/`);
      this.updateData('invoice');
    },
  },
});