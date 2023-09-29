<template>  
  <div class="container text-center">
    <h2 class=" mt-5">
      Bienvenido al Administrador de Monitore y Reporte de Facturacion
    </h2>
    <div class="card mt-5 bg-actions">
      <div class="card-header">
        <h3><b>Seleccione el modulo a consultar</b></h3>
      </div>
      <div class="card-body d-flex justify-content-around">
        <RouterLink :to="{ name: 'list_customers' }" 
          class="btn btn-primary btn-lg test-list-customer-link">
          Modulo de Clientes
        </RouterLink>      
        <RouterLink :to="{ name: 'list_products' }" 
          class="btn btn-primary btn-lg test-list-product-link">
          Modulo de Productos
        </RouterLink>
        <RouterLink :to="{ name: 'list_invoices' }" 
          class="btn btn-primary btn-lg test-list-invoice-link">
          Modulo de Facturas
        </RouterLink>
      </div>
    </div>
    <div class="card mt-5 mb-5 bg-actions">
      <div class="card-header">
        <h3><b>Para generar nuevos datos de prueba, seleccione una de las siguientes opciones:</b></h3>
      </div>
      <div class="card-body d-flex justify-content-around">
        <div class="card">
          <div class="card-header">
            2x
          </div>
          <div class="card-body">
            <h5 class="card-title">Datos a generar:</h5>
            <p class="card-text text-left">
              <ul>
                  <li>(2) Clientes</li>
                  <li>(4) Productos</li>
                  <li>(2) Ventas/Facturas</li>
              </ul>
            </p>            
          </div>
          <div class="card-footer text-body-secondary">
            <button class="btn btn-primary" 
                    @click="createNewDataTest(2)">
              Generar Datos
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            6x
          </div>
          <div class="card-body">
            <h5 class="card-title">Datos a generar:</h5>
            <p class="card-text text-left">
              <ul>
                  <li>(6) Clientes</li>
                  <li>(12) Productos</li>
                  <li>(6) Ventas/Facturas</li>
              </ul>
            </p>            
          </div>
          <div class="card-footer text-body-secondary">
            <button class="btn btn-primary" 
                    @click="createNewDataTest(6)">
              Generar Datos
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            10x
          </div>
          <div class="card-body">
            <h5 class="card-title">Datos a generar:</h5>
            <p class="card-text text-left">
              <ul>
                  <li>(10) Clientes</li>
                  <li>(20) Productos</li>
                  <li>(10) Ventas/Facturas</li>
              </ul>
            </p>            
          </div>
          <div class="card-footer text-body-secondary">
            <button class="btn btn-primary" 
                    @click="createNewDataTest(10)">
              Generar Datos
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            20x
          </div>
          <div class="card-body">
            <h5 class="card-title">Datos a generar:</h5>
            <p class="card-text text-left">
              <ul>
                  <li>(20) Clientes</li>
                  <li>(40) Productos</li>
                  <li>(20) Ventas/Facturas</li>
              </ul>
            </p>            
          </div>
          <div class="card-footer text-body-secondary">
            <button class="btn btn-primary" 
                    @click="createNewDataTest(20)">
              Generar Datos
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Swal from "sweetalert2";
  import { RouterLink } from 'vue-router';
  import { useDressRentalStore } from '@/stores/dress_rental';

  const dressRentalStore = useDressRentalStore();

  /**
   * Show success message when a new data test has been created.
   * @param {integer} invoiceId - Invoice id.
   * @param {string} invoiceType - Invoice type.
   */
   function createNewDataTest(numberDataTest) {
    dressRentalStore.createNewDataTest(numberDataTest);

    Swal.fire({
      icon: "success",
      title: `Los datos de prueba han sido creados exitosamente`,
      text: '',
      confirmButtonText: "OK",
     }).then((result) => { });      
  }
</script>

<style>
  .bg-actions {
      background-color: #FAF7F7;
  }

  .text-left {
    text-align: left !important;
  }
</style>