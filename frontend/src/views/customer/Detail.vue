<template>
 <div class="container mt-5">
   <h1>Detalle del Cliente:</h1>
   <div v-if="detail.customer" class="row mt-5">
    <div class="col-6">
       <h2>Numero de Cedula:</h2>
       <p>{{ detail.customer.identification }}</p>
     </div>
     <div class="col-6">
       <h2>Nombre:</h2>
       <p>{{ detail.customer.firstName }}</p>
     </div>
     <div class="col-6">
       <h2>Apellido:</h2>
       <p>{{ detail.customer.lastName }}</p>
     </div>
     <div class="col-6">
       <h2>Correo Electronico:</h2>
       <p>{{ detail.customer.email }}</p>
     </div>
     <div class="col-6">
       <h2>Numero de contacto:</h2>
       <p>{{ detail.customer.contact }}</p>
     </div>
     <div class="col-6">
       <h2>Numero de contacto secundario:</h2>
       <p v-if="detail.customer.secondContact">{{ detail.customer.secondContact }}</p>
       <p v-else>No registrado</p>
     </div>
     <div class="col-6">
       <h2>Direccion:</h2>
       <p v-if="detail.customer.address">{{ detail.customer.address }}</p>
       <p v-else>No registrado</p>
     </div>
   </div>
   <div v-if="detail.customer && detail.customer.invoices.length > 0">
     <h2>Lista de Ventas/Alquileres:</h2>
     <InvoiceTable
      :invoices="detail.customer.invoices"
      :customerIdentificacion="detail.customer.identification"
     >
     </InvoiceTable> 
   </div>
   <div v-else>
     <h2>Lista de Ventas/Alquileres:</h2>
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
