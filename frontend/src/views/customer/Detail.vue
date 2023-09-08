<template>
 <div class="container mt-5">
   <h1>Detalle del Cliente:</h1>
   <div v-if="detailCustomer.customer" class="row mt-5">
    <div class="col-6">
       <h2>Numero de Cedula:</h2>
       <p>{{ detailCustomer.customer.identification }}</p>
     </div>
     <div class="col-6">
       <h2>Nombre:</h2>
       <p>{{ detailCustomer.customer.firstName }}</p>
     </div>
     <div class="col-6">
       <h2>Apellido:</h2>
       <p>{{ detailCustomer.customer.lastName }}</p>
     </div>
     <div class="col-6">
       <h2>Correo Electronico:</h2>
       <p>{{ detailCustomer.customer.email }}</p>
     </div>
     <div class="col-6">
       <h2>Numero de contacto:</h2>
       <p>{{ detailCustomer.customer.contact }}</p>
     </div>
     <div class="col-6">
       <h2>Numero de contacto secundario:</h2>
       <p v-if="detailCustomer.customer.secondContact">{{ detailCustomer.customer.secondContact }}</p>
       <p v-else>No registrado</p>
     </div>
     <div class="col-6">
       <h2>Direccion:</h2>
       <p v-if="detailCustomer.customer.address">{{ detailCustomer.customer.address }}</p>
       <p v-else>No registrado</p>
     </div>
   </div>
   <div v-if="detailCustomer.customer && detailCustomer.customer.sales.length > 0">
     <h2>Lista de Ventas/Alquileres:</h2>
     <SaleTable
      :sales="detailCustomer.customer.sales"
     >
     </SaleTable> 
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
 import SaleTable from '@/components/sale/SaleTable.vue';
 import { decodeHandler } from '@/shared/decode_handler';

 const route = useRoute();
 const detailCustomer = reactive({});

 onMounted(async () => {
   detailCustomer.customer = await decodeHandler(route.params.customer);
 });

 const goBack = () => {
   window.history.back();
 };
</script>
