<template>
  <table v-if="sales" class="table table-striped table-hover mt-4 text-center">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Cédula Cliente</th>
        <th scope="col">Referencia</th>
        <th scope="col">No. Productos</th>
        <th scope="col">Tipo</th>
        <th scope="col">Fecha Despacho</th>
        <th scope="col">Fecha Devolución</th>
        <th scope="col">Estado</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr v-for="(sale, index) in sales" :key="sale.id">
        <th>{{ index + 1 }}</th>
        <td v-if="sale.customer">
          {{ sale.customer.identification }}</td>
        <td>
          <select              
            class="form-control" id="productId">
            <option 
              v-for="product in getProducts(sale.id)" :key="product.id"
              value="product.id">
                {{ product.reference }}
            </option>
          </select>
        </td>
        <td v-if="getProducts(sale.id).length > 1"><i class="bi bi-plus-lg"></i> 1</td>
        <td v-else>1</td>
        <td><b>{{ sale.type }}</b></td>
        <td>{{ sale.deliveryDate }}</td>
        <td>{{ sale.returnDate }}</td>
        <td>
          <div v-if="noDeliverySaleOrRental(sale)">
            <button class="btn btn-primary" 
                    @click="saleFinished(sale.id, sale.type)"
                    disabled>
              Pendiente
            </button>
          </div>
          <div v-else-if="deliveryRentalAndNotReturn(sale)">
            <button class="btn btn-primary" 
                    @click="saleFinished(sale.id, sale.type)"
                    :disabled="isSale(sale)">
              Entregado
            </button>
          </div>
          <div v-else-if="isReturnOrDeliverySale(sale)">
            <i class="bi bi-calendar-check-fill size-check-icon"></i>
          </div>
        </td>
        <td class="d-flex justify-content-around">
          <router-link 
            :to="{ name: 'detail_sale', 
                    params: { sale: encodeURIComponent(JSON.stringify(getSale(sale.id))) } }" 
            class="btn btn-secondary">
            Detalle
          </router-link>
          <router-link 
            :to="{ name: 'edit_sale', 
                    params: { sale: encodeURIComponent(JSON.stringify(getSale(sale.id))) } }" 
            class="btn btn-info">
            Editar Venta
          </router-link>
          <button class="btn btn-danger" @click="deleteHandler(sale.id, 'sale')">
            Eliminar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import Swal from "sweetalert2";
  import { deleteHandler } from '@/shared/delete_handler';
  import { useDressRentalStore } from '@/stores/dress_rental';

  const store = useDressRentalStore();

  const props = defineProps({
    sales: Object,
  });

  /**
   * 
   */
  function getProducts(saleId) {
    return getSale(saleId).products;
  }

  /**
   * 
   */
   function getSale(saleId) {
    return store.sales.find(item => item.id === saleId);
  }

  /**
   * 
   */
  function isSale(sale) {
    return sale.type === 'Venta';
  }

  /**
   * 
   */
   function isRental(sale) {
    return sale.type === 'Alquiler';
  }

  /**
   * 
   */
  function noDeliverySaleOrRental(sale) {
    return !sale.isProductDelivered
  }

  /**
   * 
   */
  function deliveryRentalAndNotReturn(sale) {
    return (isRental(sale) && sale.isProductDelivered && !sale.isProductDelivered)
  }

  /**
   * 
   */
  function isReturnOrDeliverySale(sale) {
    return (isRental(sale) && sale.isProductReturn) || (isSale(sale) && sale.isProductDelivered) 
  }

  /**
   * 
   */
  function saleFinished(saleId, saleType) {
    store.saleFinished(saleId);

    Swal.fire({
      icon: "success",
      title: `${saleType} actualizado!`,
      text: '',
      confirmButtonText: "OK",
     }).then((result) => { });      
  }
</script>

<style scoped>
  .size-check-icon {
    font-size: 26px;
  }
</style>