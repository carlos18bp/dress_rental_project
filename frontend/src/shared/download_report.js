import * as XLSX from 'xlsx';

/**
 * Export a report file.
 * @param {object} param - Params.
 * @param {string} fileName - Report file name.
 */
export async function downloadReport(params, fileName) {
  switch (fileName) {
    case "customer_report":
      create_customer_report(params, fileName);
      break;
    case "product_report":
      create_product_report(params, fileName);
      break;
    case "invoice_report":
      create_invoice_report(params, fileName);
      break;
    default:
      throw new Error(`Unsupported method: ${fileName}`);
  }
}

/**
 * Export a customer report file.
 * @param {object} param - Params.
 * @param {string} fileName - Report file name.
 */
export function create_customer_report(customers, fileName) {
  const customersData = customers.map(({ id, invoices, ...rest }) => rest);

  const wsCustomers = XLSX.utils.json_to_sheet(customersData);
  generateReport(wsCustomers, fileName);
}

/**
 * Export a product report file.
 * @param {object} param - Params.
 * @param {string} fileName - Report file name.
 */
export function create_product_report(products, fileName) {
  const productsData = products.map(({ categoryId, id, invoices, ...rest }) => rest);

  const wsProducts = XLSX.utils.json_to_sheet(productsData);
  generateReport(wsProducts, fileName);
}

/**
 * Export a invoice report file.
 * @param {object} param - Params.
 * @param {string} fileName - Report file name.
 */
export function create_invoice_report(invoices, fileName) {
  const invoicesData = invoices.map(({ customer, customerId, id, productIds, products, ...rest }) => rest);

  const wsInvoices = XLSX.utils.json_to_sheet(invoicesData);
  generateReport(wsInvoices, fileName);
}

/**
 * Export a invoice report file.
 * @param {object} param - Params.
 * @param {string} fileName - Report file name.
 */
export function generateReport(wsdata, fileName) {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, wsdata, fileName);
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}