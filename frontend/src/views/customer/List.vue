<template>
  <div class="container mt-5">
    <h1>Lista de Clientes:</h1>
    <RouterLink :to="{ name: 'create_customer' }" class="btn btn-primary btn-lg">
      Crear Cliente
    </RouterLink>
    <table class="table table-striped table-hover mt-4 text-center">
      <thead>
        <tr>
          <th scope="col">Cédula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Email</th>
          <th scope="col">Número</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="customer in customers" :key="customer.id">
          <th scope="row">{{ customer.identification }}</th>
          <td>{{ customer.first_name }}</td>
          <td>{{ customer.last_name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone_number }}</td>
          <td class="d-flex justify-content-around">
            <RouterLink :to="{ name: 'create_sale' }" class="btn btn-primary">Crear Venta</RouterLink>
            <button class="btn btn-primary">Editar</button>
            <button class="btn btn-danger" @click="deleteCustomer(customer.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { RouterLink } from "vue-router";
  import { ref, onMounted, watchEffect } from 'vue';
  import Swal from "sweetalert2";
  import { useDressRentalStore } from '@/stores/dress_rental';

  const dressRentalStore = useDressRentalStore();
  const customers = ref([]);

  onMounted(async () => {
    await dressRentalStore.fetchCustomersData();
    customers.value = dressRentalStore.customers;
  });

  watchEffect(() => {
    customers.value = dressRentalStore.customers;
  });

  function deleteCustomer(customerId) {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "No podras revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dressRentalStore.deleteCustomer(customerId);
        Swal.fire("¡Eliminado!", "Tu cliente ha sido eliminado.", "success");
      }
    });
  }    
</script>
