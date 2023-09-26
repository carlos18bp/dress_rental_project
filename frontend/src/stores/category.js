import { defineStore } from "pinia";
import { get_request } from "./services/request_http";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    areUpdateCategories: false,
  }),
  actions: {
    /**
     * Fetch data from backend.
     */
    async init() {
      if(!this.areUpdateCategories) this.fetchCategoriesData();
    },
    /**
     * Fetch categories from backend.
     */
    async fetchCategoriesData() {
      if(this.areUpdateCategories) return;

      let jsonData = await get_request("api/list_categories/");
      if (jsonData && typeof jsonData === 'string') {
        jsonData = JSON.parse(jsonData)
      }
      this.categories = jsonData.map((item) => {
        return {
          id: item.pk,
          type: item.fields.type,
        };
      });      

      this.areUpdateCategories = true;
    },
  }
});