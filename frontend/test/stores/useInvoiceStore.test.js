import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { setActivePinia, createPinia } from 'pinia';
import { useInvoiceStore } from "@/stores/invoice";
import * as requestHttpModule from "@/stores/services/request_http";
import invoicesData from '../data_sample/invoices.json';

let store;
beforeEach(async () => {
  setActivePinia(createPinia());
});

describe("useInvoiceStore getters", () => {
  beforeEach(() => {
    store = useInvoiceStore();
    store.invoices = [
      { id: 1, type: 'Venta', isProductDelivered: false, isProductReturn: true },
      { id: 2, type: 'Alquiler', isProductDelivered: false, isProductReturn: false, returnDate: '2023-09-15' },
      { id: 3, type: 'Venta', isProductDelivered: true, isProductReturn: false },
    ];
  });

  describe("invoiceById", () => {
    it("should find invoice by id", () => {
      const invoice = store.invoiceById(2);

      expect(invoice).toEqual(store.invoices[1]);
    });

    it("should return undefined for non-existent id", () => {
      const invoice = store.invoiceById(4);

      expect(invoice).toBeUndefined();
    });
  });

  describe("filterInvoicesByTypeInvoice", () => {
    it("should filter invoices by 'Venta' type", () => {
      const invoices = store.filterInvoicesByTypeInvoice;

      expect(invoices).toEqual([store.invoices[0], store.invoices[2]]);
    });
  });

  describe("filterInvoicesByTypeRental", () => {
    it("should filter invoices by 'Alquiler' type", () => {
      const invoices = store.filterInvoicesByTypeRental;

      expect(invoices).toEqual([store.invoices[1]]);
    });
  });

  describe("filterPendingDeliveryInvoice", () => {
    it("should filter pending delivery invoices of type 'Venta'", () => {
      const invoices = store.filterPendingDeliveryInvoice;

      expect(invoices).toEqual([store.invoices[0]]);
    });
  });

  describe("filterPendingDeliveryRental", () => {
    it("should filter pending delivery invoices of type 'Alquiler'", () => {
      const invoices = store.filterPendingDeliveryRental;

      expect(invoices).toEqual([store.invoices[1]]);
    });
  });

  describe("filterReturnExpiredRental", () => {
    it("should filter return expired invoices of type 'Alquiler'", () => {
      const invoices = store.filterReturnExpiredRental;

      expect(invoices).toEqual([store.invoices[1]]);
    });

    it("should not filter invoices with future return dates", () => {
      const invoices = store.filterReturnExpiredRental;

      expect(invoices).not.toContain(store.invoices[0], store.invoices[2]);
    });
  });
});

describe("useInvoiceStore actions", () => {
  const axiosMock = new AxiosMockAdapter(axios,  { onNoMatch: "throwException" }, { delayResponse: 1000 });

  beforeEach(async () => {
    store = useInvoiceStore();
  });

  it("fetchInvoicesData fetches invoice data", async () => {
    axiosMock.onGet('api/list_invoices/').reply(200, invoicesData);

    await store.fetchInvoicesData();

    expect(store.invoices).toEqual(invoicesData);
    expect(store.areUpdateInvoices).toBeTruthy();
  });

  it("init should not call get_request when areUpdateInvoices is true", async () => {
    const get_requestSpy = jest.spyOn(requestHttpModule, "get_request");

    store.areUpdateInvoices = true;

    await store.init();

    expect(get_requestSpy).not.toHaveBeenCalled();
  });

  it("fetchInvoicesData should not call get_request when areUpdateInvoices is true", async () => {
    const get_requestSpy = jest.spyOn(requestHttpModule, "get_request");

    store.areUpdateInvoices = true;

    await store.fetchInvoicesData();

    expect(get_requestSpy).not.toHaveBeenCalled();
  });
});