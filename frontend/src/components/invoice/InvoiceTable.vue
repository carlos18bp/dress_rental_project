<template>
  <table v-if="invoices" class="table table-striped table-hover mt-4 text-center">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Cédula Cliente</th>
        <th scope="col">Referencia</th>
        <th scope="col">No. Productos</th>
        <th scope="col">Tipo</th>
        <th scope="col">Fecha Despacho</th>
        <th scope="col">Fecha Devolución</th>
        <th scope="col">Estado</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr v-for="(invoice, index) in invoices" :key="invoice.id">
        <th>{{ index + 1 }}</th>
        <td v-if="customerIdentificacion">
          {{ customerIdentificacion }}
        </td>
        <td v-if="invoice.customer">
          {{ invoice.customer.identification }}
        </td>
        <td>
          <select              
            class="form-control" id="productId">
            <option 
              v-for="product in getProducts(invoice.id)" :key="product.id"
              value="product.id">
                {{ product.reference }}
            </option>
          </select>
        </td>
        <td v-if="getProducts(invoice.id).length > 1"><i class="bi bi-plus-lg"></i> 1</td>
        <td v-else>1</td>
        <td><b>{{ invoice.type }}</b></td>
        <td>{{ invoice.deliveryDate }}</td>
        <td>{{ invoice.returnDate }}</td>
        <td>
          <div v-if="noDeliveryInvoice(invoice)">
            <button class="btn btn-primary"
                    disabled>
              Pendiente
            </button>
          </div>
          <div v-else-if="deliveryRentalAndNotReturn(invoice)">
            <button class="btn btn-primary" 
                    @click="invoiceFinished(invoice.id, invoice.type)"
                    :disabled="isSale(invoice)">
              Entregado
            </button>
          </div>
          <div v-else-if="isReturnOrDeliveryInvoice(invoice)">
            <i class="bi bi-calendar-check-fill size-check-icon"></i>
          </div>
        </td>
        <td class="d-flex justify-content-around">
          <router-link 
            :to="{ name: 'detail_invoice', 
                    params: { invoice: encodeProduct(invoice.id) } }" 
            class="btn btn-secondary">
            Detalle
          </router-link>
          <router-link 
            :to="{ name: 'edit_invoice', 
                    params: { invoice: encodeProduct(invoice.id) } }" 
            class="btn btn-info">
            Editar Venta
          </router-link>
          <button class="btn btn-danger" @click="deleteHandler(invoice.id, 'invoice')">
            Eliminar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import Swal from "sweetalert2";
  import { deleteHandler } from '@/shared/delete_handler';
  import { useInvoiceStore } from '@/stores/invoice';

  const invoiceStore = useInvoiceStore();

  const props = defineProps({
    customerIdentificacion: Number,
    invoices: Object,
  });

  /**
   * Get product array.
   * @param {integer} invoiceId - Invoice id.
   * @return {array} - Product array.
   */
  function getProducts(invoiceId) {
    return invoiceStore.invoiceById(invoiceId).products;
  }

  /**
   * Encode invoice to send as parameter via router link.
   * @param {integer} invoiceId - Invoice id.
   * @returns {object} - Encode invoice.
   */
   function encodeProduct(invoiceId) {
    return encodeURIComponent(JSON.stringify(invoiceStore.invoiceById(invoiceId)));
  }

  /**
   * Check if a invoice has sale type.
   * @param {object} invoice - Invoice json.
   * @returns {boolean} - Check if a invoice has sale type.
   */
  function isSale(invoice) {
    return invoice.type === 'Venta';
  }

  /**
   * Check if a invoice has rental type.
   * @param {object} invoice - Invoice json.
   * @returns {boolean} - Check if a invoice has rental type.
   */
   function isRental(invoice) {
    return invoice.type === 'Alquiler';
  }

  /**
   * Check if a invoice has not been delivered.
   * @param {object} invoice - Invoice json.
   * @returns {boolean} - Check if a invoice or rental have not
   * been delivered
   */
  function noDeliveryInvoice(invoice) {
    return !invoice.isProductDelivered;
  }

  /**
   * Check if a invoice has been delivered and not returned.
   * @param {object} invoice - Invoice json.
   * @returns {boolean} - Check if a invoice or rental have been 
   * delivered and not returned.
   */
  function deliveryRentalAndNotReturn(invoice) {
    return (isRental(invoice) && 
            invoice.isProductDelivered && 
            !invoice.isProductReturn);
  }

  /**
   * Check if a retal invoice has been returned or a sale invoice has been delivered.
   * @param {object} invoice - Invoice json.
   * @returns {boolean} - Check if a retal invoice has been returned or 
   * a sale invoice has been delivered.
   */
  function isReturnOrDeliveryInvoice(invoice) {
    return (isRental(invoice) && invoice.isProductReturn) ||
           (isSale(invoice) && invoice.isProductDelivered);
  }

  /**
   * Show success message when a invoice has been updated.
   * @param {integer} invoiceId - Invoice id.
   * @param {string} invoiceType - Invoice type.
   */
  function invoiceFinished(invoiceId, invoiceType) {
    invoiceStore.invoiceFinished(invoiceId);

    Swal.fire({
      icon: "success",
      title: `${invoiceType} actualizado!`,
      text: '',
      confirmButtonText: "OK",
     }).then((result) => { });      
  }
</script>

<style scoped>
  .size-check-icon {
    font-size: 26px;
  }
</style>