<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between">
      <h1>Lista de Productos:</h1>
      <RouterLink 
        :to="{ name: 'create_product' }" 
        class="btn btn-primary btn-lg">
        Crear Producto
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
            <b>Listar productos</b>
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
            <b>Listar productos disponibles para venta/alquiler</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="invoiceProducts" 
                 id="invoiceProducts"  
                 @change="listInvoiceProducts"
                 :checked="isInvoiceProductsChecked">
          <label class="form-check-label" for="invoiceProducts">
            <b>Listar productos Vendidos</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="rentalProducts" 
                 id="rentalProducts"  
                 @change="listRentalProducts"
                 :checked="isRentalProductsChecked">
          <label class="form-check-label" for="rentalProducts">
            <b>Listar productos Alquilados</b>
          </label>
        </div>
      </div>

      <div class="container mt-4 p-0">
        <div class="row">
          <div class="col d-flex align-items-center">
            <label for="searchProduct" class="form-label"><b>Buscar Producto:</b></label>
            <input
              type="text"
              class="form-control"
              id="searchProduct"
              placeholder="Ingrese referencia del producto"
              v-model="searchReference"
              @input="selectList"
            />
          </div>
          <div class="col d-flex align-items-center">
            <label for="searchProduct" class="form-label"><b>Buscar por Categoria:</b></label>
            <select
            class="form-select"
            v-model="searchCategoryType"
            @change="selectList"
            required>
            <option disabled>Seleccionar una opción</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.type">
              {{ category.type }}
            </option>
            <option>Todas</option>
          </select>
          </div>
        </div>
      </div>

    </div>
    <ProductTable
      :products="products"
    >
    </ProductTable>
  </div>
</template>

<script setup>
  import { RouterLink } from "vue-router";
  import { ref, onMounted, watchEffect } from 'vue';
  import ProductTable from '@/components/product/ProductTable.vue';
  import { useDressRentalStore } from '@/stores/dress_rental';
 

  const store = useDressRentalStore();
  const categories = ref([]);
  const products = ref([]);
  
  const isAllProductsChecked = ref(true);
  const isAvailableProductsChecked = ref(false);
  const isInvoiceProductsChecked = ref(false);
  const isRentalProductsChecked = ref(false);

  const searchReference = ref('');
  const searchCategoryType = ref('');

  onMounted(async () => fetchProducts());

  watchEffect(async () => await store.fetchProductsData());

  /**
   * Fetch and update product data.
   */
  async function fetchProducts() {
    await store.fetchCategoriesData();
    categories.value = store.categories;

    await store.fetchProductsData();
    selectList();
  }

  /**
   * Select product list based on a filter defined.
   */
  function selectList() {
    if (isAllProductsChecked.value) listAllProducts();
    if (isAvailableProductsChecked.value) listAvailableProducts();
    if (isInvoiceProductsChecked.value) listInvoiceProducts();
    if (isRentalProductsChecked.value) listRentalProducts();
  }

  /**
   * Filter by product reference.
   * @param {array} products - Product array.
   * @return {array} - Filter products by reference.
   */
  function filterByProduct(products) {
    return products.filter(product => product.reference.includes(searchReference.value));
  }

  /**
   * Filter products by category.
   * @param {array} products - Product array.
   * @return {array} - Filter products by category type.
   */
  function filterByCategory(products) {
    if (searchCategoryType.value && searchCategoryType.value !== 'Todas') {
      return products.filter(product => product.categoryType === searchCategoryType.value);
    } else {
      return products;
    }
  }

  /**
   * List all products.
   */
  function listAllProducts() {
    products.value = filterByCategory(filterByProduct(store.products));
    setSingleChecked(isAllProductsChecked);
  }

  /**
   * List available products.
   */
  function listAvailableProducts() {
    products.value = filterByCategory(filterByProduct(store.filterAvailableProducts));
    setSingleChecked(isAvailableProductsChecked);
  }

  /**
   * List sold products.
   */
  function listInvoiceProducts() {
    products.value = filterByCategory(filterByProduct(store.filterInvoiceProducts));
    setSingleChecked(isInvoiceProductsChecked);
  }

  /**
   * List rental products.
   */
  function listRentalProducts() {
    products.value = filterByCategory(filterByProduct(store.filterRentalProducts));
    setSingleChecked(isRentalProductsChecked);
  }

  /**
   * Set flag to define the correct product list.
   * @param {boolean} productCheckedToSet - Flag list.
   */
  function setSingleChecked(productCheckedToSet) {
    const productsChecked = [
      isAllProductsChecked,
      isAvailableProductsChecked,
      isInvoiceProductsChecked,
      isRentalProductsChecked
    ];

    for (const checked of productsChecked) {
      checked.value = checked === productCheckedToSet ? true : false;
    }
  }
</script>