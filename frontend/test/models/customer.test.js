import Customer from "@/models/customer";

describe("Customer class", () => {
  it("should create a Customer instance with the provided parameters", () => {
    const params = {
      id: 1,
      identification: "12345",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      contact: "123-456-7890",
      secondContact: "987-654-3210",
      address: "123 Main St",
    };

    const customer = new Customer(params);

    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBe(params.id);
    expect(customer.identification).toBe(params.identification);
    expect(customer.firstName).toBe(params.firstName);
    expect(customer.lastName).toBe(params.lastName);
    expect(customer.email).toBe(params.email);
    expect(customer.contact).toBe(params.contact);
    expect(customer.secondContact).toBe(params.secondContact);
    expect(customer.address).toBe(params.address);
  });

  it("should create a Customer instance with default values for missing parameters", () => {
    const params = {
      id: 1,
      identification: "12345",
      firstName: "John",
    };

    const customer = new Customer(params);

    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBe(params.id);
    expect(customer.identification).toBe(params.identification);
    expect(customer.firstName).toBe(params.firstName);
    expect(customer.lastName).toBeUndefined();
    expect(customer.email).toBeUndefined();
    expect(customer.contact).toBeUndefined();
    expect(customer.secondContact).toBeUndefined();
    expect(customer.address).toBeUndefined();
  });
});
