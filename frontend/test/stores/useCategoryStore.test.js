import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia';
import { useCategoryStore } from "@/stores/category";
import * as requestHttpModule from "@/stores/services/request_http";
import categoriesData from '../data_sample/categories.json';

let store;
beforeEach(() => {
  setActivePinia(createPinia());
});

describe("useCategoryStore actions", () => {
  const axiosMock = new AxiosMockAdapter(axios,  { onNoMatch: "throwException" }, { delayResponse: 1000 });

  beforeEach(() => {
    store = useCategoryStore();
  });

  it("fetchCategoriesData fetches category data", async () => {
    axiosMock.onGet('api/list_categories/').reply(200, categoriesData);

    await store.fetchCategoriesData();

    let categories = categoriesData.map((item) => {
      return {
        id: item.pk,
        type: item.fields.type,
      };
    });  

    expect(store.categories).toEqual(categories);
    expect(store.areUpdateCategories).toBeTruthy();
  });

  it("init should not call get_request when areUpdateCategories is true", async () => {
    const get_requestSpy = jest.spyOn(requestHttpModule, "get_request");

    store.areUpdateCategories = true;

    await store.init();

    expect(get_requestSpy).not.toHaveBeenCalled();
  });

  it("fetchCategoriesData should not call get_request when areUpdateCategories is true", async () => {
    const get_requestSpy = jest.spyOn(requestHttpModule, "get_request");

    store.areUpdateCategories = true;

    await store.fetchCategoriesData();

    expect(get_requestSpy).not.toHaveBeenCalled();
  });
});
