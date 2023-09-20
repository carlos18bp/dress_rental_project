import { defineStore } from "pinia";
import { get_request, update_request } from "./services/request_http";

export const useInvoiceStore = defineStore("invoice", {
  state: () => ({
    invoices: [],
    areUpdateInvoices: false,
  }),
  getters: {
    /**
     * Find invoice id.
     * @param {integer} invoiceId - Invoice id.
     * @returns {integer} - Invoice id.
     */
    invoiceById: (state) => (invoiceId) => {
      return state.invoices.find(invoice => invoice.id === invoiceId);
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
  },
  actions: { 
    /**
     * Fetch data from backend.
     */
    async init() {
      if(!this.areUpdateInvoices) this.fetchInvoicesData();
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
     * Define invoice as finished.
     * @param {integer} invoiceId - Invoice id.
     */
    async invoiceFinished(invoiceId) {
      await update_request(`/api/close_invoice/${invoiceId}/`);
      this.areUpdateInvoices = false;
    },
  }
});