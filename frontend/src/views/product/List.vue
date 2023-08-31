<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between">
      <h1>Lista de Productos:</h1>
      <RouterLink 
        :to="{ name: 'create_product' }" 
        class="btn btn-primary btn-lg">
        Crear Nuevo Producto
      </RouterLink>
    </div>
    
    <div class="container mt-5 ml-1">
      <div class="row">
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="allProducts" 
                 id="allProducts"
                 @change="listAllProducts"
                 :checked="isAllProductsChecked">
          <label class="form-check-label" for="allProducts">
            Listar productos
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="availableProducts" 
                 id="availableProducts" 
                 @change="listAvailableProducts"
                 :checked="isAvailableProductsChecked">
          <label class="form-check-label" for="availableProducts">
            Listar productos disponibles
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="noAvailableProducts" 
                 id="noAvailableProducts"  
                 @change="listNoAvailableProducts"
                 :checked="isNoAvailableProductsChecked">
          <label class="form-check-label" for="noAvailableProducts">
            Listar productos no disponibles
          </label>
        </div>
      </div>
    </div>

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
          <td>{{ product.categoryType }}</td>
          <td class="d-flex justify-content-around">
            <router-link 
              :to="{ name: 'detail_product', 
                     params: { 
                      product: encodeURIComponent(JSON.stringify(product)) } }" 
              class="btn btn-primary">
                Detalle
            </router-link>
            <router-link 
              :to="{ name: 'edit_product', 
                     params: { 
                      product: encodeURIComponent(JSON.stringify(product)) } }" 
              class="btn btn-primary">
              Editar Producto
            </router-link>
            <button class="btn btn-danger" 
              @click="deleteHandler(product.id, 'product')"
              :disabled="product.hasSale">
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
  import { useDressRentalStore } from '@/stores/dress_rental';
  import { deleteHandler } from '@/shared/deleteHandler'; 

  const dressRentalStore = useDressRentalStore();
  const products = ref([]);
  const allProducts = ref([]);
  const isAllProductsChecked = ref(true);
  const availableProducts = ref([]);
  const isAvailableProductsChecked = ref(false);
  const noAvailableProducts = ref([]);
  const isNoAvailableProductsChecked = ref(false);
  const categories = ref([]);
  const customers = ref([]);

  onMounted(async () => {
    await dressRentalStore.fetchProductsData();
    allProducts.value = dressRentalStore.products;
    listAllProducts();

    availableProducts.value = products.value.filter(item => !item.sales.length);
    noAvailableProducts.value = products.value.filter(item => item.sales.length);

    await dressRentalStore.fetchCategoriesData();
    categories.value = dressRentalStore.categories;

    await dressRentalStore.fetchCustomersData();
    customers.value = dressRentalStore.customers;
  });

  watchEffect(() => {
    products.value = dressRentalStore.products;
  });

  function listAllProducts() {
    products.value = allProducts.value;
    isAllProductsChecked.value = true;
    isAvailableProductsChecked.value = false;
    isNoAvailableProductsChecked.value = false;
  }

  function listAvailableProducts() {
    products.value = availableProducts.value;
    isAllProductsChecked.value = false;
    isAvailableProductsChecked.value = true;
    isNoAvailableProductsChecked.value = false;
  }

  function listNoAvailableProducts() {
    products.value = noAvailableProducts.value;
    isAllProductsChecked.value = false;
    isAvailableProductsChecked.value = false;
    isNoAvailableProductsChecked.value = true;
  }
</script>