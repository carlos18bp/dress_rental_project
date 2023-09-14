<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between">
      <h1>Lista de Clientes:</h1>
      <div>
        <router-link  :to="{ name: 'create_customer' }" class="btn btn-primary btn-lg m-3">
          Crear Cliente
        </router-link>
        <button @click="cleanFilters" class="btn btn-secondary btn-lg m-3">Borrar Filtros</button>
        <button @click="report" class="btn btn-success btn-lg">Descargar Reporte</button>
    </div>
    </div>
    <div class="container mt-4 p-0">
      <div class="row">
        <div class="col d-flex align-items-center">
          <label for="searchIdentification" class="form-label"><b>Buscar por Cedula:</b></label>
          <input
            type="number"
            class="form-control"
            id="searchIdentification"
            placeholder="Ingrese numero de cedula"
            v-model="searchIdentification"
            @input="filterByIdentification"
          />
        </div>
        <div class="col d-flex align-items-center">
          <label for="searchFirstOrLastName" class="form-label"><b>Buscar Nombre/Apellido:</b></label>
          <input
            type="text"
            class="form-control"
            id="searchFirstOrLastName"
            placeholder="Ingrese nombre o apellido del cliente"
            v-model="searchFirstOrLastName"
            @input="filterByFirstOrLastName"
          />
        </div>
      </div>
    </div>
    <CustomerTable
      :customers="customers"
    >
    </CustomerTable>
  </div>
</template>

<script setup>
  import { downloadReport } from '@/shared/download_report';
  import { RouterLink } from "vue-router";  
  import { ref, onMounted, watchEffect } from 'vue';
  import CustomerTable from '@/components/customer/CustomerTable.vue';
  import { useDressRentalStore } from '@/stores/dress_rental';

  const store = useDressRentalStore();
  const customers = ref([]);
  const searchIdentification = ref('');
  const searchFirstOrLastName = ref('');

  onMounted(async () => fetchCustomers());
  watchEffect(async () => fetchCustomers());  

  /**
   * Fetch and update customer data.
   */
  async function fetchCustomers() {
    await store.fetchCustomersData();
    customers.value = store.customers;
  }

  /**
   * Filter by identification.
   */
  function filterByIdentification() {
    searchFirstOrLastName.value = '';
    const query = searchIdentification.value.toString();
    customers.value = store.filterByIdentification(query);
  }

  /**
   * Filter by first or last name.
   */
  function filterByFirstOrLastName() {
    searchIdentification.value = '';
    const query = searchFirstOrLastName.value.toString().toLowerCase();
    customers.value = store.filterByFirstOrLastName(query);
  }

  /**
   * Clean filters.
   */
  function cleanFilters() {
    searchIdentification.value = '';
    searchFirstOrLastName.value = '';
  }

  /**
   * Download report by customers.
   */
   const report = () => downloadReport(customers.value, 'customer_report');
</script>