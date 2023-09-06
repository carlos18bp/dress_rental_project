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
            Listar Ventas/Alquileres
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
            Listar Ventas
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
            Listar Alquileres
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
            Ventas pendientes por entrega
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
            Alquileres pendientes por entrega
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
            Alquileres vencidos
          </label>
        </div>
      </div>
    </div>

    <div class="container mt-4 p-0">
      <div class="row">
        <div class="col">
          <label for="startDate" class="form-label">Fecha de Inicio:</label>
          <input
            type="date"
            class="form-control"
            id="startDate"
            placeholder="Fecha de Inicio"
            v-model="startDate"
            @change="filterByDate"
          />
        </div>
        <div class="col">
          <label for="endDate" class="form-label">Fecha de Fin:</label>
          <input
            type="date"
            class="form-control"
            id="endDate"
            placeholder="Fecha de Fin"
            v-model="endDate"
            @change="filterByDate"
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
  import SaleTable from '@/components/SaleTable.vue'; 
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

  onMounted(async () => await fetchSales());

  watchEffect(async () => await store.fetchSalesData());

  /**
   * 
   */
   async function fetchSales() {
    await store.fetchSalesData();
    sales.value = store.sales;

    listAllSales();
    filterSalesByTypeSale();
    filterSalesByTypeRental();
    filterPendingDeliverySale();
    filterPendingDeliveryRental();
    filterExpiredDeliverySales();
   }

  /**
   * 
   */
  function filterSalesByTypeSale() {
    return store.sales.filter(item => item.type === 'Venta');    
  }

  /**
   * 
   */
  function filterSalesByTypeRental() {
    return store.sales.filter(item => item.type === 'Alquiler');
  }

  /**
   * 
   */
  function filterPendingDeliverySale() {
    return store.sales.filter(item => item.type === 'Venta' && !item.isProductDelivered);
  }

  /**
   * 
   */
  function filterPendingDeliveryRental() {
    return store.sales.filter(item => item.type === 'Alquiler' && !item.isProductDelivered);
  }

  /**
   * 
   */
  function filterExpiredDeliverySales() {
    return store.sales.filter(item => item.type === 'Alquiler' &&
                                      item.isProductReturn === false && 
                                      new Date(item.returnDate) < new Date());
  }

  /**
   * 
   */
  function filterByDate() {
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
  function filterByDateRange(sales) {
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
  function listAllSales() {
    sales.value = filterByDateRange(store.sales);
    setSingleChecked(isAllSalesChecked);
  }

  /**
   * 
   */
  function listSalesByTypeSale() {
    sales.value = filterByDateRange(filterSalesByTypeSale());    
    setSingleChecked(isSalesByTypeSaleChecked);
  }

  /**
   * 
   */
  function listSalesByTypeRental() {
    sales.value = filterByDateRange(filterSalesByTypeRental());    
    setSingleChecked(isSalesByTypeRentalChecked);
  }

  /**
   * 
   */
  function listPendingDeliverySales() {
    sales.value = filterByDateRange(filterPendingDeliverySale());   
    setSingleChecked(isPendingDeliverySalesChecked);
  }

  /**
   * 
   */
  function listPendingDeliveryRental() {
    sales.value = filterByDateRange(filterPendingDeliveryRental());   
    setSingleChecked(isPendingDeliveryRentalChecked);
  }

  /**
   * 
   */
  function listExpiredSales() {
    sales.value = filterByDateRange(filterExpiredDeliverySales());   
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