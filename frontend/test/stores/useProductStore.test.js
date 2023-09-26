import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia';
import { useProductStore } from "@/stores/product";
import * as requestHttpModule from "@/stores/services/request_http";
import productsData from '../data_sample/products.json';

let store;
beforeEach(async () => {
  setActivePinia(createPinia());
});

describe("useProductStore getters", () => {
  beforeEach(() => {
    store = useProductStore();
    store.products = [
      { id: 1, hasSale: true, hasRental: false },
      { id: 2, hasSale: false, hasRental: true },
      { id: 3, hasSale: false, hasRental: true },
      { id: 4, hasSale: false, hasRental: true },
      { id: 5, hasSale: true, hasRental: false },
    ]
  });

  it("productById returns the product with the given id", () => {
    const product = store.productById(2);

    expect(product).toEqual(store.products[1]);
  });

  it("filterAvailableProducts returns available products", () => {
    const availableProducts = store.filterAvailableProducts;

    expect(availableProducts).toEqual([store.products[1], 
                                       store.products[2], 
                                       store.products[3]]);
  });

  it("filterAvailableProductsByInvoice filters available products by invoice", () => {
    const invoice = { productIds: [3] };

    const invoiceProducts = store.filterAvailableProductsByInvoice(invoice);

    expect(invoiceProducts).toEqual([store.products[1], 
                                     store.products[2], 
                                     store.products[3]]);
  });

  it("filterInvoiceProducts returns products with sales", () => {
    const invoiceProducts = store.filterInvoiceProducts;

    expect(invoiceProducts).toEqual([store.products[0], store.products[4]]);
  });

  it("filterRentalProducts returns rental products", () => {
    const rentalProducts = store.filterRentalProducts;

    expect(rentalProducts).toEqual([store.products[1], 
                                    store.products[2], 
                                    store.products[3]]);
  });
});

describe("useProductStore actions", () => {
  const axiosMock = new AxiosMockAdapter(axios,  { onNoMatch: "throwException" }, { delayResponse: 1000 });

  beforeEach(() => {
    store = useProductStore();
  });

  it("fetchProductsData fetches product data", async () => {
    axiosMock.onGet('api/list_products/').reply(200, productsData);

    await store.fetchProductsData();

    expect(store.products).toEqual(productsData);
    expect(store.areUpdateProducts).toBeTruthy();
  });

  it("init should not call get_request when areUpdateProducts is true", async () => {
    const get_requestSpy = jest.spyOn(requestHttpModule, "get_request");

    store.areUpdateProducts = true;

    await store.init();

    expect(get_requestSpy).not.toHaveBeenCalled();
  });

  it("fetchProductsData should not call get_request when areUpdateProducts is true", async () => {
    const get_requestSpy = jest.spyOn(requestHttpModule, "get_request");

    store.areUpdateProducts = true;

    await store.fetchProductsData();

    expect(get_requestSpy).not.toHaveBeenCalled();
  });
});