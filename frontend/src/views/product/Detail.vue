<template>
  <div class="container mt-5">
    <h1>Detalle del Producto:</h1>
    <div v-if="detailProduct.product" class="row mt-5">
      <div class="col-6">
        <h2>Titulo:</h2>
        <p>{{ detailProduct.product.title }}</p>
      </div>
      <div class="col-6">
        <h2>Referencia:</h2>
        <p>{{ detailProduct.product.reference }}</p>
      </div>
      <div class="col-6">
        <h2>Categoria:</h2>
        <p>{{ detailProduct.product.categoryType }}</p>
      </div>
    </div>
    <div v-if="detailProduct.product && detailProduct.product.sales.length">
      <h2>Lista de Ventas/Alquileres:</h2>
      <SaleTable
        :sales="detailProduct.product.sales"
      >
      </SaleTable> 
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <button @click="goBack" class="btn btn-primary mx-3">Regresar</button>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, reactive } from "vue";
  import { useRoute } from "vue-router";
  import SaleTable from '@/components/sale/SaleTable.vue';
  import { decodeHandler } from '@/shared/decode_handler';

  const route = useRoute();
  const detailProduct = reactive({});

  onMounted(async () => {
    detailProduct.product = await decodeHandler(route.params.product);
  });

  const goBack = () => {
    window.history.back();
  };
</script>
