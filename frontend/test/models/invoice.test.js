import Invoice from "@/models/invoice";
import { useInvoiceStore } from "@/stores/invoice";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

jest.mock("@/stores/invoice", () => ({
  useInvoiceStore: jest.fn(),
}));

describe("Invoice class", () => {
  let invoice;
  let mockInvoiceStore;

  beforeEach(() => {
    mockInvoiceStore = {
      invoices: [
        {
          id: 1,
          products: [
            { id: 1, reference: "P1" },
            { id: 2, reference: "P2" },
          ],
          deliveryDate: "2023-09-25",
          returnDate: "2023-09-30",
        },
      ],
    };
    useInvoiceStore.mockReturnValue(mockInvoiceStore);

    invoice = new Invoice({
      id: 1,
      type: "Venta",
      productIds: [1,2,3,4],
      deliveryDate: "2023-09-26",
      returnDate: "2023-10-05",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an Invoice instance", () => {
    expect(invoice).toBeInstanceOf(Invoice);
  });

  it("should calculate selectedProductIdsLength when product ids is empty", () => {
    invoice.productIds = [];

    expect(invoice.selectedProductIdsLength).toBe(1);
  });

  it("should calculate selectedProductIdsLength", () => {
    expect(invoice.selectedProductIdsLength).toBe(4);
  });

  it("should add a neutral field to productIds", () => {
    invoice.addFieldProduct;

    expect(invoice.productIds).toContain(0);
  });

  it("should remove a product from productIds by index", () => {
    invoice.removeProduct(1);

    expect(invoice.productIds).toEqual([1, 3, 4]);
  });

  it("should check valid deliveryDate and returnDate", () => {
    invoice.checkDates;

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Fecha no valida",
        text: expect.any(String),
      })
    );
  });

  it("should check if a product is selected", () => {
    expect(invoice.isProductSelected(2)).toBe(true);
    expect(invoice.isProductSelected(5)).toBe(false);
  });

  it("should check if a product is the first", () => {
    expect(invoice.isFirstProduct(0)).toBe(true);
    expect(invoice.isFirstProduct(1)).toBe(false);
  });

  it("should check valid range dates", () => {
    expect(
      invoice.isValidDate("2023-09-25", "2023-09-30", "2023-09-26", "2023-10-05")
    ).toBe(false);

    expect(
      invoice.isValidDate("2023-09-25", "2023-09-30", "2023-10-01", "2023-10-05")
    ).toBe(true);
  });

  it("should check valid date using isDate method", () => {
    expect(invoice.isDate("2023-09-25")).toBe(true);
    expect(invoice.isDate("invalid_date")).toBe(false);
  });
});