<template>
  <div class="container mt-5">
    <h1>Lista de Ventas:</h1>
    <table class="table table-striped table-hover mt-4 text-center">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Cédula</th>
          <th scope="col">Referencia</th>
          <th scope="col">Despacho</th>
          <th scope="col">Devolución</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="(sale, index) in sales" :key="sale.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ sale.customer.id }}</td>
          <td>{{ sale.product.id }}</td>
          <td>{{ sale.delivery_date }}</td>
          <td>{{ sale.return_date }}</td>
          <td class="d-flex justify-content-around">
            <router-link :to="{ name: 'detail_sale', params: { sale: encodeURIComponent(JSON.stringify(sale)) } }" class="btn btn-primary">
              Detalle
            </router-link>
            <button class="btn btn-primary">Editar</button>
            <button class="btn btn-danger" @click="deleteSale(sale.id)">
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
  import { onMounted, ref } from 'vue';
  import Swal from "sweetalert2";
  import { useDressRentalStore } from '@/stores/dress_rental';

  const dressRentalStore = useDressRentalStore();
  const sales = ref([]);

  onMounted(async () => {
    await dressRentalStore.fetchSalesData()
    sales.value = dressRentalStore.sales
  });

  function deleteSale(saleId) {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Tu no serás capaz de revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dressRentalStore.deleteProduct(saleId);
        Swal.fire("¡Eliminado!", "Tu cliente ha sido eliminado.", "success");
      }
    });
  }
</script>
