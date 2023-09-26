import Product from "@/models/product";

describe("Product class", () => {
  it("should create a Product instance with the provided parameters", () => {
    const params = {
      id: 1,
      title: "Product 1",
      reference: "P123",
      categoryId: 2,
      categoryType: "Type A",
    };

    const product = new Product(params);

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe(params.id);
    expect(product.title).toBe(params.title);
    expect(product.reference).toBe(params.reference);
    expect(product.categoryId).toBe(params.categoryId);
    expect(product.categoryType).toBe(params.categoryType);
  });

  it("should create a Product instance with default values for missing parameters", () => {
    const params = {
      id: 1,
      title: "Product 1",
    };

    const product = new Product(params);

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe(params.id);
    expect(product.title).toBe(params.title);
    // Ensure that other properties have default values
    expect(product.reference).toBeUndefined();
    expect(product.categoryId).toBeUndefined();
    expect(product.categoryType).toBeUndefined();
  });
});
