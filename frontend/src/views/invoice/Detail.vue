<template>
  <div class="container mt-5">
    <h1>Detalle de la venta:</h1>
    <div v-if="detail.invoice" class="row mt-5">
      <div class="col-6">
        <h2>Modalidad de Venta:</h2>
        <p>{{ detail.invoice.type }}</p>
      </div>
      <div class="col-6">
        <h2>Precio:</h2>
        <p>${{ detail.invoice.price }} COP</p>
      </div>
      <div class="col-6">
        <h2>Abono:</h2>
        <p>${{ detail.invoice.advancePayment }} COP</p>
      </div>
      <div class="col-6">
        <h2>El Producto fue Entregado al Cliente:</h2>
        <div v-if="detail.invoice.isProductDelivered">
          <p>Si</p>
        </div>
        <div v-else>
          <p>No</p>
        </div>
      </div>
      <div class="col-6">
        <h2>Fecha Estimada de Entrega al Cliente:</h2>
        <p>{{ detail.invoice.deliveryDate }}</p>
      </div>
      <div class="col-6">
        <h2>Fecha Estimada de Devolución:</h2>
        <p>{{ detail.invoice.returnDate }}</p>
      </div>
      <div class="col-6">
        <h2>El Producto fue Devuelto al Almacen:</h2>
        <p v-if="checkDeliveryInvoiceProduct">No, Producto vendido y entregado</p>
        <p v-else-if="checkReturnRentalProduct">Si</p>
        <p v-else>No</p>        
      </div>
      <div class="col-6">
        <h2>Cédula del Cliente:</h2>
        <p>{{ detail.invoice.customer.identification }}</p>
      </div>
      <div class="col-6">
        <h2>Nombre del Cliente:</h2>
        <p>
          {{ detail.invoice.customer.firstName }}
          {{ detail.invoice.customer.lastName }}
        </p>
      </div>
      <div class="col-6">
        <h2>Contacto del Cliente:</h2>
        <p>{{ detail.invoice.customer.contact }}</p>
      </div>
      <div class="col-6">
        <h2>Correo Electronico del Cliente:</h2>
        <p>{{ detail.invoice.customer.email }}</p>
      </div>
    </div>
    <div v-if="detail.invoice && detail.invoice.products.length">
      <h2>Lista de productos:</h2>
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