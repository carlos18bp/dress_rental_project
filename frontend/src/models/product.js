/**
 * Class representing Product.
 */
class Product {
  /**
   * Instantiate the Product class.
   */
  constructor(params) {
    this.id = params.id;
    this.title = params.title;
    this.reference = params.reference;
    this.categoryId = params.categoryId;
    this.categoryType = params.categoryType;
  }
}

export default Product;