<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between">
      <h1>Lista de Ventas:</h1>
      <router-link  
        :to="{ name: 'create_sale' }" 
        class="btn btn-primary btn-lg">
        Crear Venta
      </router-link>
    </div>

    <div class="container mt-4">
      <div class="row d-flex justify-content-center">
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="allSales" 
                 id="allSales"
                 @change="listAllSales"
                 :checked="isAllSalesChecked">
          <label class="form-check-label" for="allSales">
            <b>Listar Ventas/Alquileres</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="salesByTypeSale" 
                 id="salesByTypeSale"
                 @change="listSalesByTypeSale"
                 :checked="isSalesByTypeSaleChecked">
          <label class="form-check-label" for="salesByTypeSale">
            <b>Listar Ventas</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="salesByTypeRental" 
                 id="salesByTypeRental"
                 @change="listSalesByTypeRental"
                 :checked="isSalesByTypeRentalChecked">
          <label class="form-check-label" for="salesByTypeRental">
            <b>Listar Alquileres</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="pendingDeliverySales" 
                 id="pendingDeliverySales" 
                 @change="listPendingDeliverySales"
                 :checked="isPendingDeliverySalesChecked">
          <label class="form-check-label" for="pendingDeliverySales">
            <b>Ventas pendientes por entrega</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="pendingDeliveryRental" 
                 id="pendingDeliveryRental" 
                 @change="listPendingDeliveryRental"
                 :checked="isPendingDeliveryRentalChecked">
          <label class="form-check-label" for="pendingDeliveryRental">
            <b>Alquileres pendientes por entrega</b>
          </label>
        </div>
        <div class="col form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="expiredSales" 
                 id="expiredSales" 
                 @change="listExpiredSales"
                 :checked="isExpiredSalesChecked">
          <label class="form-check-label" for="expiredSales">
            <b>Alquileres vencidos</b>
          </label>
        </div>
      </div>
    </div>

    <div class="container mt-4 p-0">
      <div class="row">
        <div class="col d-flex align-items-center">
          <label for="startDate" class="form-label"><b>Fecha de Inicio:</b></label>
          <input
            type="date"
            class="form-control"
            id="startDate"
            placeholder="Fecha de Inicio"
            v-model="startDate"
            @change="selectList"
          />
        </div>
        <div class="col d-flex align-items-center">
          <label for="endDate" class="form-label"><b>Fecha de Fin:</b></label>
          <input
            type="date"
            class="form-control"
            id="endDate"
            placeholder="Fecha de Fin"
            v-model="endDate"
            @change="selectList"
          />
        </div>
      </div>
    </div>

    <div class="container mt-4 p-0">
      <div class="row">
        <div class="col d-flex align-items-center">
          <label for="searchCustomer" class="form-label"><b>Buscar Cliente:</b></label>
          <input
            type="number"
            class="form-control"
            id="searchCustomer"
            placeholder="Ingrese numero de cedula"
            v-model="searchCustomer"
            @input="selectList"
          />
        </div>
        <div class="col d-flex align-items-center">
          <label for="searchProduct" class="form-label"><b>Buscar Producto:</b></label>
          <input
            type="text"
            class="form-control"
            id="searchProduct"
            placeholder="Ingrese referencia del producto"
            v-model="searchProduct"
            @input="selectList"
          />
        </div>
      </div>
    </div>

    <SaleTable
      :sales="sales"
    >
    </SaleTable>
  </div>
</template>

<script setup>
  import { RouterLink } from "vue-router";
  import { onMounted, ref, watchEffect } from 'vue';
  import SaleTable from '@/components/sale/SaleTable.vue'; 
  import { useDressRentalStore } from '@/stores/dress_rental';

  const store = useDressRentalStore();
  const sales = ref([]);

  const isAllSalesChecked = ref(true);
  const isSalesByTypeSaleChecked = ref(false);
  const isSalesByTypeRentalChecked = ref(false);
  const isPendingDeliverySalesChecked = ref(false);
  const isPendingDeliveryRentalChecked = ref(false);
  const isExpiredSalesChecked = ref(false);

  const startDate = ref('');
  const endDate = ref('');

  const searchCustomer = ref('');
  const searchProduct = ref('');

  onMounted(async () => await fetchSales());

  watchEffect(async () => await store.fetchSalesData());

  /**
   * 
   */
   async function fetchSales() {
    await store.fetchSalesData();
    selectList();
   }

  /**
   * 
   */
  function selectList() {
    if (isAllSalesChecked.value) listAllSales();
    if (isSalesByTypeSaleChecked.value) listSalesByTypeSale();
    if (isSalesByTypeRentalChecked.value) listSalesByTypeRental();
    if (isPendingDeliverySalesChecked.value) listPendingDeliverySales();
    if (isPendingDeliveryRentalChecked.value) listPendingDeliveryRental();
    if (isExpiredSalesChecked.value) listExpiredSales();
  }

  /**
   * 
   */
  function getFilterByDate(sales) {
    const startDateValid = isValidDate(startDate.value);
    const endDateValid = isValidDate(endDate.value);

    if (startDateValid && endDateValid) {
      return sales.filter(item => new Date(item.deliveryDate) >= new Date(startDate.value) && 
                                  new Date(item.returnDate) <= new Date(endDate.value));
    } else if (startDateValid) {
      return sales.filter(item => new Date(item.deliveryDate) >= new Date(startDate.value));
    } else if (endDateValid) {
      return sales.filter(item => new Date(item.returnDate) <= new Date(endDate.value));
    } else {
      return sales;
    }
  }

  /**
   * 
   * @param {*} dateValue 
   */
  function isValidDate(dateValue) {
    return !isNaN(new Date(dateValue));
  }

  /**
   * 
   */
  function getFilterByCustomer(sales) {
    const query = searchCustomer.value.toString();
    return sales.filter(sale => sale.customer.identification.toString().includes(query));   
  }

  /**
   * 
   */
   function getFilterByProduct(sales) {
    return sales.filter(sale => {
            return sale.products.some(product => product.reference.includes(searchProduct.value));
          });
  }

  /**
   * 
   */
  function listAllSales() {
    sales.value = getFilterByProduct(
      getFilterByCustomer(
        getFilterByDate(store.sales)));
    setSingleChecked(isAllSalesChecked);
  }

  /**
   * 
   */
  function listSalesByTypeSale() {
    sales.value = getFilterByProduct(
      getFilterByCustomer(
        getFilterByDate(store.filterSalesByTypeSale)));    
    setSingleChecked(isSalesByTypeSaleChecked);
  }

  /**
   * 
   */
  function listSalesByTypeRental() {
    sales.value = getFilterByProduct(
      getFilterByCustomer(
        getFilterByDate(store.filterSalesByTypeRental)));    
    setSingleChecked(isSalesByTypeRentalChecked);
  }

  /**
   * 
   */
  function listPendingDeliverySales() {
    sales.value = getFilterByProduct(
      getFilterByCustomer(
        getFilterByDate(store.filterPendingDeliverySale)));   
    setSingleChecked(isPendingDeliverySalesChecked);
  }

  /**
   * 
   */
  function listPendingDeliveryRental() {
    sales.value = getFilterByProduct(
      getFilterByCustomer(
        getFilterByDate(store.filterPendingDeliveryRental)));   
    setSingleChecked(isPendingDeliveryRentalChecked);
  }

  /**
   * 
   */
  function listExpiredSales() {
    sales.value = getFilterByProduct(
      getFilterByCustomer(
        getFilterByDate(store.filterExpiredDeliverySales)));   
    setSingleChecked(isExpiredSalesChecked);
  }

  /**
   * 
   */
  function setSingleChecked(saleCheckedToSet) {
    const salesChecked = [
      isAllSalesChecked,
      isSalesByTypeSaleChecked,
      isSalesByTypeRentalChecked,
      isPendingDeliverySalesChecked,
      isPendingDeliveryRentalChecked,
      isExpiredSalesChecked,
    ];

    for (const checked of salesChecked) {
      checked.value = checked === saleCheckedToSet ? true : false;
    }
  }
</script>