<template>
  <div class="container mt-5">
    <h2>Detalle de la venta:</h2>
    <div v-if="detail.invoice" class="row mt-5">
      <div class="col-4 test-sale-rental">
        <h3>Modalidad de Venta:</h3>
        <p>{{ detail.invoice.type }}</p>
      </div>
      <div class="col-4 test-price">
        <h3>Precio:</h3>
        <p>${{ detail.invoice.price }} COP</p>
      </div>
      <div class="col-4 test-advance-payment">
        <h3>Abono:</h3>
        <p>${{ detail.invoice.advancePayment }} COP</p>
      </div>
      <div class="col-4 test-advance-payment-date">
        <h3>Fecha de Abono:</h3>
        <p>{{ detail.invoice.advancePaymentDate }}</p>
      </div>
      <div class="col-4 test-is-product-delivered">
        <h3>El Producto fue Entregado al Cliente:</h3>
        <div v-if="detail.invoice.isProductDelivered">
          <p>Si</p>
        </div>
        <div v-else>
          <p>No</p>
        </div>
      </div>
      <div class="col-4 test-delivery-date">
        <h3>Fecha Estimada de Entrega al Cliente:</h3>
        <p>{{ detail.invoice.deliveryDate }}</p>
      </div>
      <div class="col-4 test-return-date">
        <h3>Fecha Estimada de Devolución:</h3>
        <p>{{ detail.invoice.returnDate }}</p>
      </div>
      <div class="col-4 test-is-product-return">
        <h3>El Producto fue Devuelto al Almacen:</h3>
        <p v-if="checkDeliveryInvoiceProduct">No, Producto vendido y entregado</p>
        <p v-else-if="checkReturnRentalProduct">Si</p>
        <p v-else>No</p>        
      </div>
      <div class="col-4 test-customer-identification">
        <h3>Cédula del Cliente:</h3>
        <p>{{ detail.invoice.customer.identification }}</p>
      </div>
      <div class="col-4 test-customer-first-last-name">
        <h3>Nombre del Cliente:</h3>
        <p>
          {{ detail.invoice.customer.firstName }}
          {{ detail.invoice.customer.lastName }}
        </p>
      </div>
      <div class="col-4 test-customer-contact">
        <h3>Contacto del Cliente:</h3>
        <p>{{ detail.invoice.customer.contact }}</p>
      </div>
      <div class="col-4 test-customer-email">
        <h3>Correo Electronico del Cliente:</h3>
        <p>{{ detail.invoice.customer.email }}</p>
      </div>
    </div>
    <div v-if="detail.invoice && detail.invoice.products.length">
      <h3>Lista de productos:</h3>
      <ProductTable
        :products="detail.invoice.products"
      >
      </ProductTable> 
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <button @click="goBack" class="btn btn-primary mx-3">Regresar</button>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, reactive } from "vue";
  import { useRoute } from "vue-router";
  import ProductTable from '@/components/product/ProductTable.vue';
  import { decodeHandler } from '@/shared/decode_handler';

  const route = useRoute();
  const detail = reactive({});

  onMounted(async () => {
    detail.invoice = await decodeHandler(route.params.invoice);
  });

  /**
   * Check delivery invoice product.
   * @return {boolean} - Check delivery invoice type product.
   */
   const checkDeliveryInvoiceProduct = computed(() => {
    return detail.invoice.type === 'Venta' && detail.invoice.isProductDelivered
  });

  /**
   * Check delivery invoice product.
   * @return {boolean} - Check delivery rental type product.
   */
  const checkReturnRentalProduct = computed(() => {
    return detail.invoice.type === 'Alquiler' && detail.invoice.isProductReturn
  });

  /**
   * Return to the previous page.
   */
  const goBack = () => window.history.back();
</script>