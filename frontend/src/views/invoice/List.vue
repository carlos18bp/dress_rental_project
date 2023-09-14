<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between">
      <h1>Lista de Facturas:</h1>
      <div>
        <router-link  
          :to="{ name: 'create_invoice' }" 
          class="btn btn-primary btn-lg">
          Crear Factura
        </router-link>
        <button @click="cleanFilters" class="btn btn-secondary btn-lg m-3">Borrar Filtros</button>
        <button @click="report" class="btn btn-success btn-lg">Descargar Reporte</button>
      </div>
    </div>

    <div class="container mt-4">
      <div class="row d-flex justify-content-center">
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="allInvoices" 
                 id="allInvoices"
                 @change="listAllInvoices"
                 :checked="isAllInvoicesChecked">
          <label class="form-check-label" for="allInvoices">
            <b>Listar Ventas/Alquileres</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="invoicesByTypeInvoice" 
                 id="invoicesByTypeInvoice"
                 @change="listInvoicesByTypeInvoice"
                 :checked="isInvoicesByTypeInvoiceChecked">
          <label class="form-check-label" for="invoicesByTypeInvoice">
            <b>Listar Ventas</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="invoicesByTypeRental" 
                 id="invoicesByTypeRental"
                 @change="listInvoicesByTypeRental"
                 :checked="isInvoicesByTypeRentalChecked">
          <label class="form-check-label" for="invoicesByTypeRental">
            <b>Listar Alquileres</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="pendingDeliveryInvoices" 
                 id="pendingDeliveryInvoices" 
                 @change="listPendingDeliveryInvoices"
                 :checked="isPendingDeliveryInvoicesChecked">
          <label class="form-check-label" for="pendingDeliveryInvoices">
            <b>Ventas pendientes por entrega</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="pendingDeliveryRental" 
                 id="pendingDeliveryRental" 
                 @change="listPendingDeliveryRental"
                 :checked="isPendingDeliveryRentalChecked">
          <label class="form-check-label" for="pendingDeliveryRental">
            <b>Alquileres pendientes por entrega</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="expiredInvoices" 
                 id="expiredInvoices" 
                 @change="listExpiredInvoices"
                 :checked="isExpiredInvoicesChecked">
          <label class="form-check-label" for="expiredInvoices">
            <b>Alquileres vencidos</b>
          </label>
        </div>
      </div>
    </div>

    <div class="container mt-4 p-0">
      <div class="row">
        <div class="col d-flex align-items-center">
          <label for="startDate" class="form-label"><b>Fecha de Inicio:</b></label>
          <input
            type="date"
            class="form-control"
            id="startDate"
            placeholder="Fecha de Inicio"
            v-model="startDate"
            @change="selectList"
          />
        </div>
        <div class="col d-flex align-items-center">
          <label for="endDate" class="form-label"><b>Fecha de Fin:</b></label>
          <input
            type="date"
            class="form-control"
            id="endDate"
            placeholder="Fecha de Fin"
            v-model="endDate"
            @change="selectList"
          />
        </div>
      </div>
    </div>

    <div class="container mt-4 p-0">
      <div class="row">
        <div class="col d-flex align-items-center">
          <label for="searchCustomer" class="form-label"><b>Buscar Cliente:</b></label>
          <input
            type="number"
            class="form-control"
            id="searchCustomer"
            placeholder="Ingrese numero de cedula"
            v-model="searchCustomer"
            @input="selectList"
          />
        </div>
        <div class="col d-flex align-items-center">
          <label for="searchProduct" class="form-label"><b>Buscar Producto:</b></label>
          <input
            type="text"
            class="form-control"
            id="searchProduct"
            placeholder="Ingrese referencia del producto"
            v-model="searchProduct"
            @input="selectList"
          />
        </div>
      </div>
    </div>

    <InvoiceTable
      :invoices="invoices"
    >
    </InvoiceTable>
  </div>
</template>

<script setup>
  import { RouterLink } from "vue-router";
  import { onMounted, ref, watchEffect } from 'vue';
  import InvoiceTable from '@/components/invoice/InvoiceTable.vue'; 
  import { useDressRentalStore } from '@/stores/dress_rental';
  import { downloadReport } from '@/shared/download_report';

  const store = useDressRentalStore();
  const invoices = ref([]);

  const isAllInvoicesChecked = ref(true);
  const isInvoicesByTypeInvoiceChecked = ref(false);
  const isInvoicesByTypeRentalChecked = ref(false);
  const isPendingDeliveryInvoicesChecked = ref(false);
  const isPendingDeliveryRentalChecked = ref(false);
  const isExpiredInvoicesChecked = ref(false);

  const startDate = ref('');
  const endDate = ref('');

  const searchCustomer = ref('');
  const searchProduct = ref('');

  onMounted(async () => await fetchInvoices());

  watchEffect(async () => await fetchInvoices());

  /**
   * Fetch and update invoice data.
   */
   async function fetchInvoices() {
    await store.fetchInvoicesData();
    selectList();
   }

  /**
   * Select invoice list based on a filter defined.
   */
  function selectList() {
    if (isAllInvoicesChecked.value) listAllInvoices();
    if (isInvoicesByTypeInvoiceChecked.value) listInvoicesByTypeInvoice();
    if (isInvoicesByTypeRentalChecked.value) listInvoicesByTypeRental();
    if (isPendingDeliveryInvoicesChecked.value) listPendingDeliveryInvoices();
    if (isPendingDeliveryRentalChecked.value) listPendingDeliveryRental();
    if (isExpiredInvoicesChecked.value) listExpiredInvoices();
  }

  /**
   * Filter invoices by date range.
   * @param {array} invoices - Invoice array.
   * @return {array} - Filter invoice array by date range.
   */
  function filterByDate(invoices) {
    const startDateValid = isValidDate(startDate.value);
    const endDateValid = isValidDate(endDate.value);

    if (startDateValid && endDateValid) {
      return invoices.filter(item => {
        return new Date(item.deliveryDate) >= new Date(startDate.value) && 
               new Date(item.returnDate) <= new Date(endDate.value)
      });
    } else if (startDateValid) {
      return invoices.filter(item => {
        return new Date(item.deliveryDate) >= new Date(startDate.value)
      });
    } else if (endDateValid) {
      return invoices.filter(item => {
        return new Date(item.returnDate) <= new Date(endDate.value)
      });
    } else {
      return invoices;
    }
  }

  /**
   * Check valid date.
   * @param {string} dateValue - date
   * @returns {boolean} - Check valid date.
   */
  function isValidDate(dateValue) {
    return !isNaN(new Date(dateValue));
  }

  /**
   * Filter invoices by customer.
   * @param {array} invoices - Invoice array.
   * @return {array} - Filter invoice array by customer identification.
   */
  function filterByCustomer(invoices) {
    const query = searchCustomer.value.toString();
    return invoices.filter(invoice => { 
      return invoice.customer.identification.toString().includes(query)
    });   
  }

  /**
   * Filter invoices by product.
   * @param {array} invoices - invoice array.
   * @return {array} - Filter invoice array by product reference.
   */
   function filterByProduct(invoices) {
    return invoices.filter(invoice => {
      return invoice.products.some(product => {
        return product.reference.includes(searchProduct.value)
      });
    });
  }

  /**
   * List all invoices.
   */
  function listAllInvoices() {
    invoices.value = filterByProduct(
      filterByCustomer(
        filterByDate(store.invoices)));

    setSingleChecked(isAllInvoicesChecked);
  }

  /**
   * List invoices by type invoice.
   */
  function listInvoicesByTypeInvoice() {
    invoices.value = filterByProduct(
      filterByCustomer(
        filterByDate(store.filterInvoicesByTypeInvoice)));

    setSingleChecked(isInvoicesByTypeInvoiceChecked);
  }

  /**
   * List invoices by rental type
   */
  function listInvoicesByTypeRental() {
    invoices.value = filterByProduct(
      filterByCustomer(
        filterByDate(store.filterInvoicesByTypeRental)));

    setSingleChecked(isInvoicesByTypeRentalChecked);
  }

  /**
   * List invoices by pending delivery invoice type.
   */
  function listPendingDeliveryInvoices() {
    invoices.value = filterByProduct(
      filterByCustomer(
        filterByDate(store.filterPendingDeliveryInvoice)));

    setSingleChecked(isPendingDeliveryInvoicesChecked);
  }

  /**
   * List invoices by pending delivery rental type.
   */
  function listPendingDeliveryRental() {
    invoices.value = filterByProduct(
      filterByCustomer(
        filterByDate(store.filterPendingDeliveryRental)));

    setSingleChecked(isPendingDeliveryRentalChecked);
  }

  /**
   * List invoices expired.
   */
  function listExpiredInvoices() {
    invoices.value = filterByProduct(
      filterByCustomer(
        filterByDate(store.filterReturnExpiredRental)));

    setSingleChecked(isExpiredInvoicesChecked);
  }

  /**
   * Set flag to define the correct invoice list.
   * @param {boolean} invoiceCheckedToSet - Flag list.
   */
  function setSingleChecked(invoiceCheckedToSet) {
    const invoicesChecked = [
      isAllInvoicesChecked,
      isInvoicesByTypeInvoiceChecked,
      isInvoicesByTypeRentalChecked,
      isPendingDeliveryInvoicesChecked,
      isPendingDeliveryRentalChecked,
      isExpiredInvoicesChecked,
    ];

    for (const checked of invoicesChecked) {
      checked.value = checked === invoiceCheckedToSet ? true : false;
    }
  }

  /**
   * Clean filters.
   */
   function cleanFilters() {
    startDate.value = '';
    endDate.value = '';
    searchCustomer.value = '';
    searchCustomer.value = '';
  }

  /**
   * Download report by invoices.
   */
   const report = () => downloadReport(invoices.value, 'invoice_report');
</script>