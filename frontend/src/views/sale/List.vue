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
            Listar Ventas y Alquileres
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
            Alquileres vencidas
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
          />
        </div>
      </div>
    </div>

    <table class="table table-striped table-hover mt-4 text-center">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Cédula Cliente</th>
          <th scope="col">Referencia</th>
          <th scope="col">Tipo</th>
          <th scope="col">Fecha Despacho</th>
          <th scope="col">Fecha Devolución</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="(sale, index) in sales" :key="sale.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ sale.customer.identification }}</td>
          <td>
            <select              
              class="form-control" id="productId">
              <option 
                v-for="product in sale.products" :key="product.id"
                value="product.id">
                {{ product.reference }}
              </option>
            </select>
          </td>
          <td>{{ sale.type }}</td>
          <td>{{ sale.deliveryDate }}</td>
          <td>{{ sale.returnDate }}</td>
          <td class="d-flex justify-content-around">
            <router-link 
              :to="{ name: 'detail_sale', 
                     params: { sale: encodeURIComponent(JSON.stringify(sale)) } }" 
              class="btn btn-primary">
              Detalle
            </router-link>
            <router-link 
              :to="{ name: 'edit_sale', 
                     params: { sale: encodeURIComponent(JSON.stringify(sale)) } }" 
              class="btn btn-primary">
              Editar Venta
            </router-link>
            <button class="btn btn-danger" @click="deleteHandler(sale.id, 'sale')">
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
  import { onMounted, ref, watchEffect } from 'vue';
  import { useDressRentalStore } from '@/stores/dress_rental';
  import { deleteHandler } from '@/shared/deleteHandler'; 

  const dressRentalStore = useDressRentalStore();
  const customers = ref([]);
  const products = ref([]);
  const sales = ref([]);
  const isAllSalesChecked = ref(true);
  const isSalesByTypeSaleChecked = ref(false);
  const isSalesByTypeRentalChecked = ref(false);
  const isPendingDeliverySalesChecked = ref(false);
  const isPendingDeliveryRentalChecked = ref(false);
  const isExpiredSalesChecked = ref(false);
  const startDate = ref('');
  const endDate = ref('');

  onMounted(async () => {
    await fetchData();

    listAllSales();
    filterSalesByTypeSale();
    filterSalesByTypeRental();
    filterPendingDeliverySale();
    filterPendingDeliveryRental();
    filterExpiredDeliverySales();
  });

  async function fetchData() {
    await dressRentalStore.fetchCustomersData();
    customers.value = dressRentalStore.customers;

    await dressRentalStore.fetchProductsData();
    products.value = dressRentalStore.products;

    await dressRentalStore.fetchSalesData();
    sales.value = dressRentalStore.sales;
  }

  function filterSalesByTypeSale() {
    return sales.value.filter(item => item.type === 'Venta');    
  }

  function filterSalesByTypeRental() {
    return sales.value.filter(item => item.type === 'Alquiler');
  }

  function filterPendingDeliverySale() {
    return sales.value.filter(item => item.type === 'Venta' && !item.isProductDelivered);
  }

  function filterPendingDeliveryRental() {
    return sales.value.filter(item => item.type === 'Alquiler' && !item.isProductDelivered);
  }

  function filterExpiredDeliverySales() {
    return sales.value.filter(item => item.type === 'Alquiler' &&
                                      item.isProductReturn === false && 
                                      new Date(item.returnDate) < new Date());
  }

  watchEffect(() => {
    sales.value = dressRentalStore.sales;
    
    if (isAllSalesChecked.value) listAllSales();
    if (isSalesByTypeSaleChecked.value) listSalesByTypeSale();
    if (isSalesByTypeRentalChecked.value) listSalesByTypeRental();
    if (isPendingDeliverySalesChecked.value) listPendingDeliverySales();
    if (isPendingDeliveryRentalChecked.value) listPendingDeliveryRental();
    if (isExpiredSalesChecked.value) listExpiredSales();

    sales.value = filterByDateRange();
  });

  function filterByDateRange() {
    const startDateValid = isValidDate(startDate.value);
    const endDateValid = isValidDate(endDate.value);

    if (startDateValid && endDateValid) {
      return sales.value.filter(item => new Date(item.deliveryDate) >= new Date(startDate.value) && 
                                        new Date(item.returnDate) <= new Date(endDate.value));
    } else if (startDateValid) {
      return sales.value.filter(item => new Date(item.deliveryDate) >= new Date(startDate.value));
    } else if (endDateValid) {
      return sales.value.filter(item => new Date(item.returnDate) <= new Date(endDate.value));
    } else {
      return sales.value;
    }
  }

  function isValidDate(dateValue) {
    return !isNaN(new Date(dateValue));
  }

  function listAllSales() {
    sales.value = dressRentalStore.sales;
    isAllSalesChecked.value = true;
    isSalesByTypeSaleChecked.value = false;
    isSalesByTypeRentalChecked.value = false;
    isPendingDeliverySalesChecked.value = false;
    isPendingDeliveryRentalChecked.value = false;
    isExpiredSalesChecked.value = false;
  }

  function listSalesByTypeSale() {
    sales.value = filterSalesByTypeSale();
    isAllSalesChecked.value = false;
    isSalesByTypeSaleChecked.value = true;
    isSalesByTypeRentalChecked.value = false;
    isPendingDeliverySalesChecked.value = false;
    isPendingDeliveryRentalChecked.value = false;
    isExpiredSalesChecked.value = false;
  }

  function listSalesByTypeRental() {
    sales.value = filterSalesByTypeRental();
    isAllSalesChecked.value = false;
    isSalesByTypeSaleChecked.value = false;
    isSalesByTypeRentalChecked.value = true;
    isPendingDeliverySalesChecked.value = false;
    isPendingDeliveryRentalChecked.value = false;
    isExpiredSalesChecked.value = false;
  }

  function listPendingDeliverySales() {
    sales.value = filterPendingDeliverySale();
    isAllSalesChecked.value = false;
    isPendingDeliverySalesChecked.value = true;
    isPendingDeliveryRentalChecked.value = false;
    isSalesByTypeRentalChecked.value = false;
    isExpiredSalesChecked.value = false;
  }

  function listPendingDeliveryRental() {
    sales.value = filterPendingDeliveryRental();
    isAllSalesChecked.value = false;
    isPendingDeliverySalesChecked.value = false;
    isPendingDeliveryRentalChecked.value = true;
    isSalesByTypeRentalChecked.value = false;
    isExpiredSalesChecked.value = false;
  }

  function listExpiredSales() {
    sales.value = filterExpiredDeliverySales();
    isAllSalesChecked.value = false;
    isPendingDeliverySalesChecked.value = false;
    isPendingDeliveryRentalChecked.value = false;
    isSalesByTypeRentalChecked.value = false;
    isExpiredSalesChecked.value = true;
  }
</script>