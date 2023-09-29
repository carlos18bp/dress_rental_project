<template>
  <table v-if="customers" 
    class="table table-striped table-hover mt-4 text-center">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Cédula</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Email</th>
        <th scope="col">Contacto</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr v-for="(customer, index) in customers" :key="customer.id">
        <td>{{ index + 1 }}</td>
        <th>{{ customer.identification }}</th>
        <td>{{ customer.firstName }}</td>
        <td>{{ customer.lastName }}</td>
        <td>{{ customer.email }}</td>
        <td>{{ customer.contact }}</td>
        <td class="d-flex justify-content-around">
          <router-link 
            :to="{ name: 'detail_customer', 
                  params: { customer: encodeURIComponent(JSON.stringify(customer)) } }" 
            class="btn btn-secondary">
            Detalle
          </router-link>
          <router-link 
            :to="{ name: 'create_invoice', 
                  params: { customer_id: customer.id } }"
            class="btn btn-primary">
            Crear Venta
          </router-link>
          <router-link 
            :to="{ name: 'edit_customer', 
                  params: { customer: encodeURIComponent(JSON.stringify(customer)) } }" 
            class="btn btn-info">
            Editar Cliente
          </router-link>
          <button class="btn btn-danger" 
            @click="deleteHandler(customer.id, 'customer')"
            :disabled="hasSaleOrRental(customer)">
            Eliminar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { deleteHandler } from '@/shared/delete_handler';
  
  const props = defineProps({
    customers: Object,
  });

  /**
   * Check any invoice or rental.
   * @param {object} customer - json customer.
   * @returns {boolean} - invoice has any sale or rental state.
   */
   function hasSaleOrRental(customer) {
    return customer.hasSale || customer.hasRental
  }
</script>