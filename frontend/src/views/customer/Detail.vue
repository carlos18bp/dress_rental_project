<template>
 <div class="container mt-5">
   <h2>Detalle del Cliente:</h2>
   <div v-if="detail.customer" class="row mt-5">
    <div class="col-4 test-identification">
      <h3>Número de Cédula:</h3>
      <p>{{ detail.customer.identification }}</p>
    </div>
    <div class="col-4 test-first-name">
      <h3>Nombre:</h3>
      <p>{{ detail.customer.firstName }}</p>
    </div>
    <div class="col-4 test-last-name">
      <h3>Apellido:</h3>
      <p>{{ detail.customer.lastName }}</p>
    </div>
    <div class="col-4 test-email">
      <h3>Correo Electronico:</h3>
      <p>{{ detail.customer.email }}</p>
    </div>
    <div class="col-4 test-contact">
      <h3>Número De Contacto:</h3>
      <p>{{ detail.customer.contact }}</p>
    </div>
    <div class="col-4 test-second-contact">
      <h3>Número De Contacto Secundario:</h3>
      <p v-if="detail.customer.secondContact">{{ detail.customer.secondContact }}</p>
      <p v-else>No registrado</p>
    </div>
    <div class="col-4 test-address">
      <h3>Direccion:</h3>
      <p v-if="detail.customer.address">{{ detail.customer.address }}</p>
      <p v-else>No registrado</p>
    </div>
   </div>
   <div v-if="detail.customer && detail.customer.invoices.length > 0">
     <h3>Lista de Ventas/Alquileres:</h3>
     <InvoiceTable
      :invoices="detail.customer.invoices"
      :customerIdentificacion="detail.customer.identification"
     >
     </InvoiceTable> 
   </div>
   <div v-else>
     <h3>Lista de Ventas/Alquileres:</h3>
     <p>No registra ventas o Alquileres</p>
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
   detail.customer = await decodeHandler(route.params.customer);
 });

/**
 * Return to the previous page.
 */
 const goBack = () => {
   window.history.back();
 };
</script>
