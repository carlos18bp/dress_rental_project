/**
 * Class representing Customer.
 */
class Customer {
  /**
   * Instantiate the Customer class.
   */
  constructor(params) {
    this.id = params.id;
    this.identification = params.identification;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.email = params.email;
    this.contact = params.contact;
    this.secondContact = params.contact;
    this.address = params.address;
  }
}

export default Customer;