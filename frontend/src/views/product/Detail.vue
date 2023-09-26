<template>
  <div class="container mt-5">
    <h2>Detalle del Producto:</h2>
    <div v-if="detail.product" class="row mt-5">
      <div class="col-4 test-title">
        <h3>Titulo:</h3>
        <p>{{ detail.product.title }}</p>
      </div>
      <div class="col-4 test-reference">
        <h3>Referencia:</h3>
        <p>{{ detail.product.reference }}</p>
      </div>
      <div class="col-4 test-category-type">
        <h3>Categoria:</h3>
        <p>{{ detail.product.categoryType }}</p>
      </div>
    </div>
    <div v-if="detail.product && detail.product.invoices.length">
      <h3>Lista de Ventas/Alquileres:</h3>
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