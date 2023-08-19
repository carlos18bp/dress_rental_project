<template>
  <div class="container mt-5">
    <h1>Lista de Productos:</h1>
    <RouterLink :to="{ name: 'create_customer' }" class="btn btn-primary btn-lg">
      Crear Nuevo Producto
    </RouterLink>
    <table class="table table-striped table-hover mt-4 text-center">
      <thead>
        <tr>
          <th scope="col">Referencia</th>
          <th scope="col">Título</th>
          <th scope="col">Categoría</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="product in products" :key="product.id">
          <th scope="row">{{ product.reference }}</th>
          <td>{{ product.title }}</td>
          <td>{{ product.category }}</td>
          <td class="d-flex justify-content-around">
            <RouterLink :to="{ name: 'create_sale' }" class="btn btn-primary">Detalle</RouterLink>
            <button class="btn btn-primary">Editar</button>
            <button class="btn btn-danger" @click="deleteProduct(product.id)">
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
  import { ref, onMounted } from 'vue';
  import Swal from "sweetalert2";
  import { useDressRentalStore } from '@/stores/dress_rental';

  const dressRentalStore = useDressRentalStore();
  const products = ref([]);

  onMounted(async () => {
    await dressRentalStore.fetchProductsData();
    products.value = dressRentalStore.products;
  });

  watchEffect(() => {
    products.value = dressRentalStore.products;
  });
  
  function deleteProduct(productId) {
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
        dressRentalStore.deleteProduct(productId);
        Swal.fire("¡Eliminado!", "Tu cliente ha sido eliminado.", "success");
      }
    });
  }
</script>