import Swal from "sweetalert2";
import { useInvoiceStore } from '@/stores/invoice';

/**
 * Class representing Invoice.
 */
class Invoice {
  /**
   * Instantiate the Invoice class.
   */
  constructor(params) {
    this.id = params.id;
    this.type = params.type;
    this.price = params.price;
    this.advancePayment = params.advancePayment;
    this.advancePaymentDate = params.advancePaymentDate;
    this.deliveryDate = params.deliveryDate;
    this.isProductDelivered = params.isProductDelivered;
    this.returnDate = params.returnDate;
    this.isProductReturn = params.isProductReturn;
    this.customerId = params.customerId;
    this.products = params.products;
    this.productIds = params.productIds;

    this.invoiceStore = useInvoiceStore();
  }

  /**
   * Get length based on selected products.
   * @returns {integer} - Get length of selected products.
   */
  get selectedProductIdsLength() {
    return this.productIds.length || 1;
  }

  /**
   * Add a neutral field to product id array.
   */
  get addFieldProduct() {
    this.productIds.push(0);
  }

  /**
   * Remove a product id based on the index.
   * @param {integer} index - Product id array index.
   */
  removeProduct(index) {
    this.productIds.splice(index, 1);
  }

  /**
   * Check deliveryDate and returnDate dates.
   */
  get checkDates() {
    if (new Date(this.deliveryDate) >= new Date(this.returnDate)) {
      Swal.fire({
        icon: "warning",
        title: "Fecha no valida",
        text: "La fecha de entrega debe ser menor que la fecha de devolucion!",
        confirmButtonText: "OK",
      }).then((result) => {
          this.deliveryDate = '';
          this.returnDate = '';
      });
    } else {
      this.invoiceStore.invoices.forEach((invoice) => {
        invoice.products.forEach((product) => {
          this.productIds.forEach((productId) => {
            if (product.id === productId) {
              if(!this.isValidDate(invoice.deliveryDate, 
                                   invoice.returnDate, 
                                   this.deliveryDate,
                                   this.returnDate)) {
                let textWarning = `Este rango de fecha de alquiler no esta disponible para
                    el producto: ${product.reference}.
                    Alquiler registrado del: ${invoice.deliveryDate} a ${invoice.returnDate}.`;
                this.warningMessageForInvalidDate(textWarning);              
              }            
            }
          }); 
        });
      }); 
    }
  }

  /**
   * @private
   * Show warning message for invalid date.
   * @param {string} text - message information.
   */
  warningMessageForInvalidDate(text) {
    Swal.fire({
      icon: "warning",
      title: "Fecha no valida",
      text: text,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deliveryDate = '';
        this.returnDate = '';
      }
    });
  }

  /**
   * Check selected product.
   * @param {integer} productId - product id.
   * @returns {boolean} - If the product was selected.
   */
  isProductSelected(productId) {
    return !!this.productIds.find(id => id == productId);
  }

  /**
   * Check if the product is the first.
   * @param {integer} index - Product id array index.
   * @returns {boolean} - Check first product.
   */
  isFirstProduct(index) {
    return !index;
  }

  /**
   * Check valid range dates.
   * @param {string} startDate - Invoice start date.
   * @param {string} endDate - Invoice end date.
   * @param {string} newStartDate - Invoice new start date.
   * @param {string} newEndDate - Invoice new end date.
   * @returns {boolean} - Check valid range dates.
   */
  isValidDate(startDate, endDate, newStartDate, newEndDate) {
    const startDateValid = this.isDate(newStartDate);
    const endDateValid = this.isDate(newEndDate);

    startDate = new Date(startDate);
    endDate = new Date(endDate);
    newStartDate = new Date(newStartDate);
    newEndDate = new Date(newEndDate);    

    if(newEndDate < startDate &&
        endDate < newStartDate) {
      return true;
    } else if (newEndDate < startDate || 
        endDate < newStartDate) { 
      return true;
    } else if (startDateValid && endDateValid) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * @private
   * check if the date is valid.
   * @param {date} dateValue - Date.
   * @returns {boolean} - Check valid date.
   */
  isDate(date) {
    return !isNaN(new Date(date));
  }
}

export default Invoice;