import { defineStore } from "pinia";
import { useCategoryStore } from '@/stores/category';
import { useCustomerStore } from '@/stores/customer';
import { useInvoiceStore } from '@/stores/invoice';
import { useProductStore } from '@/stores/product';
import {
  create_request,
  edit_request,
  delete_request,
} from "./services/request_http";

export const useDressRentalStore = defineStore("dress_rental", {
  getters: {
    /**
     * @return {Array} - category array
     */
    getCategories() {
      const categoryStore = useCategoryStore();
      return categoryStore;
    },
    /**
     * @return {Array} - customer array
     */
    getCustomers() {
      const customerStore = useCustomerStore();
      return customerStore;
    },
    /**
     * @return {Array} - invoice array
     */
    getInvoices() {
      const invoiceStore = useInvoiceStore();
      return invoiceStore;
    },
    /**
     * @return {Array} - product array
     */
    getProducts() {
      const productStore = useProductStore();
      return productStore;
    },
  },
  actions: {
    /**
     * Call creation request.
     * @param {object} formData - Form data.
     * @param {string} createModel - model reference.
     */
    async createRequest(formData, createModel) {
      await create_request(`/api/create_${createModel}/`, JSON.stringify(formData));
      this.dataUpated(createModel);
    },
    /**
     * Call edit request.
     * @param {object} formData - Form data.
     * @param {string} editModel - model reference.
     */
    async editRequest(formData, editModel) {
      await edit_request(`/api/edit_${editModel}/`, JSON.stringify(formData));
      this.dataUpated(editModel);
    },
    /**
     * Delete request.
     * @param {string} id - model id.
     * @param {string} deleteModel - model to delete.
     */
    async delete(id, deleteModel) {
      await delete_request(`api/delete_${deleteModel}/${id}/`);
      this.dataUpated(deleteModel);
    },
    /**
     * Update state based on model reference.
     * @param {string} updateModel - model reference.
     */
    async dataUpated(updateModel) {
      switch (updateModel) {
        case "customer":
          this.getCustomers.areUpdateCustomers = false;
          break;
        case "invoice":
          this.getInvoices.areUpdateInvoices = false;
          break;
        case "product":
          this.getProducts.areUpdateProducts = false;
          break;
        default:
          throw new Error(`Unsupported model: ${updateModel}`);
      }
    },
  },
});