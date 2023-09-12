<template>
  <div class="container mt-5">
    <h1>Detalle del Producto:</h1>
    <div v-if="detail.product" class="row mt-5">
      <div class="col-6">
        <h2>Titulo:</h2>
        <p>{{ detail.product.title }}</p>
      </div>
      <div class="col-6">
        <h2>Referencia:</h2>
        <p>{{ detail.product.reference }}</p>
      </div>
      <div class="col-6">
        <h2>Categoria:</h2>
        <p>{{ detail.product.categoryType }}</p>
      </div>
    </div>
    <div v-if="detail.product && detail.product.invoices.length">
      <h2>Lista de Ventas/Alquileres:</h2>
      <InvoiceTable
        :invoices="detail.product.invoices"
      >
      </InvoiceTable> 
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <button @click="goBack" class="btn btn-primary mx-3">Regresar</button>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, reactive } from "vue";
  import { useRoute } from "vue-router";
  import InvoiceTable from '@/components/invoice/InvoiceTable.vue';
  import { decodeHandler } from '@/shared/decode_handler';

  const route = useRoute();
  const detail = reactive({});

  onMounted(async () => {
    detail.product = await decodeHandler(route.params.product);
  });

  /**
   * Return to the previous page.
   */
  const goBack = () => {
    window.history.back();
  };
</script>