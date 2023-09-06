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
            Listar productos disponibles para venta/alquiler
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
            Listar productos Vendidos
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
            Listar productos Alquilados
          </label>
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
  import ProductTable from '@/components/ProductTable.vue';
  import { useDressRentalStore } from '@/stores/dress_rental';
 

  const store = useDressRentalStore();
  const products = ref([]);
  
  const allProducts = ref([]);
  const isAllProductsChecked = ref(true);
  const availableProducts = ref([]);
  const isAvailableProductsChecked = ref(false);
  const saleProducts = ref([]);
  const isSaleProductsChecked = ref(false);
  const rentalProducts = ref([]);
  const isRentalProductsChecked = ref(false);

  onMounted(async () => {
    fetchProducts();
  });

  watchEffect(() => fetchProducts());

  /**
   * 
   */
  async function fetchProducts() {
    await store.fetchProductsData();
    allProducts.value = store.products;
    listAllProducts();

    availableProducts.value = products.value.filter(item => !item.hasSale);
    saleProducts.value = products.value.filter(item => item.hasSale);
    rentalProducts.value = products.value.filter(item => item.hasRental);
  }

  /**
   * 
   */
  function listAllProducts() {
    products.value = allProducts.value;
    isAllProductsChecked.value = true;
    isAvailableProductsChecked.value = false;
    isSaleProductsChecked.value = false;
    isRentalProductsChecked.value = false;
  }

  /**
   * 
   */
  function listAvailableProducts() {
    products.value = availableProducts.value;
    isAllProductsChecked.value = false;
    isAvailableProductsChecked.value = true;
    isSaleProductsChecked.value = false;
    isRentalProductsChecked.value = false;
  }

  /**
   * 
   */
  function listSaleProducts() {
    products.value = saleProducts.value;
    isAllProductsChecked.value = false;
    isAvailableProductsChecked.value = false;
    isSaleProductsChecked.value = true;
    isRentalProductsChecked.value = false;
  }

    /**
   * 
   */
   function listRentalProducts() {
    products.value = rentalProducts.value;
    isAllProductsChecked.value = false;
    isAvailableProductsChecked.value = false;
    isSaleProductsChecked.value = false;
    isRentalProductsChecked.value = true;
  }
</script>