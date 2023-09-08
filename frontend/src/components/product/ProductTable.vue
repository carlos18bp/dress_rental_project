<template>
  <table v-if="products"
    class="table table-striped table-hover mt-4 text-center">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Referencia</th>
        <th scope="col">Título</th>
        <th scope="col">Categoría</th>
        <th scope="col">Estado</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr v-for="(product, index) in products" :key="product.id">
        <th>{{ index + 1 }}</th>
        <th>{{ product.reference }}</th>
        <td>{{ product.title }}</td>
        <td>{{ product.categoryType }}</td>
        <td>
          <div v-if="product.hasRental">
            <button class="btn btn-success" disabled>
              Alquilado
            </button>
          </div>
          <div v-else-if="product.hasSale">
            <button class="btn btn-secondary" disabled>
              Vendido
            </button>
          </div>
          <div v-else>
            <button class="btn btn-primary" disabled>
              Disponible
            </button>
          </div>
        </td>
        <td class="d-flex justify-content-around">
          <router-link 
            :to="{ name: 'detail_product', 
                    params: { 
                    product: encodeURIComponent(JSON.stringify(getProduct(product.id))) } }" 
            class="btn btn-secondary">
              Detalle
          </router-link>
          <router-link 
            :to="{ name: 'edit_product', 
                    params: { 
                    product: encodeURIComponent(JSON.stringify(getProduct(product.id))) } }" 
            class="btn btn-info">
            Editar Producto
          </router-link>
          <button class="btn btn-danger" 
            @click="deleteHandler(product.id, 'product')"
            :disabled="hasSaleOrRental(product)">
            Eliminar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
   import { deleteHandler } from '@/shared/delete_handler';
   import { useDressRentalStore } from '@/stores/dress_rental';

  const store = useDressRentalStore();

  const props = defineProps({
    products: Object,
  });

  /**
   * 
   */
   function getProduct(productId) {
    return store.products.find(item => item.id === productId);
  }

  /**
   * 
   */
  function hasSaleOrRental(product) {
    return product.hasSale || product.hasRental
  }
</script>