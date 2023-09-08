<template>
  <div class="container mt-5">
    <h1>Detalle de la venta:</h1>
    <div v-if="detailSale.sale" class="row mt-5">
      <div class="col-6">
        <h2>Modalidad de Venta:</h2>
        <p>{{ detailSale.sale.type }}</p>
      </div>
      <div class="col-6">
        <h2>Precio:</h2>
        <p>${{ detailSale.sale.price }} COP</p>
      </div>
      <div class="col-6">
        <h2>Abono:</h2>
        <p>${{ detailSale.sale.advancePayment }} COP</p>
      </div>
      <div class="col-6">
        <h2>El Producto fue Entregado al Cliente:</h2>
        <div v-if="detailSale.sale.isProductDelivered">
          <p>Si</p>
        </div>
        <div v-else>
          <p>No</p>
        </div>
      </div>
      <div class="col-6">
        <h2>Fecha Estimada de Entrega al Cliente:</h2>
        <p>{{ detailSale.sale.deliveryDate }}</p>
      </div>
      <div class="col-6">
        <h2>Fecha Estimada de Devolución:</h2>
        <p>{{ detailSale.sale.returnDate }}</p>
      </div>
      <div class="col-6">
        <h2>El Producto fue Devuelto al Almacen:</h2>
        <p v-if="checkDeliverySaleProduct">No, Producto vendido y entregado</p>
        <p v-else-if="checkReturnRentalProduct">Si</p>
        <p v-else>No</p>        
      </div>
      <div class="col-6">
        <h2>Cédula del Cliente:</h2>
        <p>{{ detailSale.sale.customer.identification }}</p>
      </div>
      <div class="col-6">
        <h2>Nombre del Cliente:</h2>
        <p>
          {{ detailSale.sale.customer.firstName }}
          {{ detailSale.sale.customer.lastName }}
        </p>
      </div>
      <div class="col-6">
        <h2>Contacto del Cliente:</h2>
        <p>{{ detailSale.sale.customer.contact }}</p>
      </div>
      <div class="col-6">
        <h2>Correo Electronico del Cliente:</h2>
        <p>{{ detailSale.sale.customer.email }}</p>
      </div>
    </div>
    <div v-if="detailSale.sale && detailSale.sale.products.length">
      <h2>Lista de productos:</h2>
      <ProductTable
        :products="detailSale.sale.products"
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
  const detailSale = reactive({});

  onMounted(async () => {
    detailSale.sale = await decodeHandler(route.params.sale);
  });

  /**
   * 
   */
  const checkReturnRentalProduct = computed(() => {
    return detailSale.sale.type === 'Alquiler' && detailSale.sale.isProductReturn
  });

  /**
   * 
   */
  const checkDeliverySaleProduct = computed(() => {
    return detailSale.sale.type === 'Venta' && detailSale.sale.isProductDelivered
  });

  const goBack = () => window.history.back();
</script>
