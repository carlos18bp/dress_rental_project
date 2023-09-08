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
                 name="saleProducts" 
                 id="saleProducts"  
                 @change="listSaleProducts"
                 :checked="isSaleProductsChecked">
          <label class="form-check-label" for="saleProducts">
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
  const isSaleProductsChecked = ref(false);
  const isRentalProductsChecked = ref(false);

  const searchReference = ref('');
  const searchCategoryType = ref('');

  onMounted(async () => fetchProducts());

  watchEffect(async () => await store.fetchProductsData());

  /**
   * 
   */
  async function fetchProducts() {
    await store.fetchCategoriesData();
    categories.value = store.categories;

    await store.fetchProductsData();
    selectList();
  }

  /**
   * 
   */
  function selectList() {
    if (isAllProductsChecked.value) listAllProducts();
    if (isAvailableProductsChecked.value) listAvailableProducts();
    if (isSaleProductsChecked.value) listSaleProducts();
    if (isRentalProductsChecked.value) listRentalProducts();
  }

  /**
   * 
   */
  function filterByProduct(products) {
    return products.filter(item => item.reference.includes(searchReference.value));
  }

  /**
   * 
   */
  function filterByCategory(products) {
    if (searchCategoryType.value && searchCategoryType.value !== 'Todas') {
      return products.filter(item => item.categoryType === searchCategoryType.value);
    } else {
      return products;
    }
  }

  /**
   * 
   */
  function listAllProducts() {
    products.value = filterByCategory(filterByProduct(store.products));
    setSingleChecked(isAllProductsChecked);
  }

  /**
   * 
   */
  function listAvailableProducts() {
    products.value = filterByCategory(filterByProduct(store.filterAvailableProducts));
    setSingleChecked(isAvailableProductsChecked);
  }

  /**
   * 
   */
  function listSaleProducts() {
    products.value = filterByCategory(filterByProduct(store.filterSaleProducts));
    setSingleChecked(isSaleProductsChecked);
  }

  /**
   * 
   */
  function listRentalProducts() {
    products.value = filterByCategory(filterByProduct(store.filterRentalProducts));
    setSingleChecked(isRentalProductsChecked);
  }

  /**
   * 
   * @param {*} productCheckedToSet 
   */
  function setSingleChecked(productCheckedToSet) {
    const productsChecked = [
      isAllProductsChecked,
      isAvailableProductsChecked,
      isSaleProductsChecked,
      isRentalProductsChecked
    ];

    for (const checked of productsChecked) {
      checked.value = checked === productCheckedToSet ? true : false;
    }
  }
</script>