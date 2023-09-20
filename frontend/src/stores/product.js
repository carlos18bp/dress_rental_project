import { defineStore } from "pinia";
import { get_request } from "./services/request_http";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    areUpdateProducts: false,
  }),
  getters: {
    /**
     * Get product by id.
     * @param {object} state - State. 
     * @returns {array} - product by id occurrence.
     */
    productById: (state) => (productId) => {
      return state.products.find(product => product.id === productId);
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
  },
  actions: { 
    /**
     * Fetch data from backend.
     */
    async init() {
      if(!this.areUpdateProducts) this.fetchProductsData();
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
  }
});