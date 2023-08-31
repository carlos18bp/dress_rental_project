<template>
  <div class="container mt-5">
    <h1>Detalle del Producto:</h1>
    <div v-if="detailProduct.product" class="row mt-5">
      <div class="col-6">
        <h2>Titulo:</h2>
        <p>{{ detailProduct.product.title }}</p>
      </div>
      <div class="col-6">
        <h2>Referencia:</h2>
        <p>{{ detailProduct.product.reference }}</p>
      </div>
      <div class="col-6">
        <h2>Categoria:</h2>
        <p>{{ detailProduct.product.categoryType }}</p>
      </div>
    </div>
    <div v-if="detailProduct.product && detailProduct.product.sales.length">
      <h2>Lista de Ventas/Alquileres:</h2>
      <table class="table table-striped table-hover mt-4 text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Cédula Cliente</th>
            <th scope="col">Tipo</th>
            <th scope="col">Fecha Despacho</th>
            <th scope="col">Fecha Devolución</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(sale, index) in detailProduct.product.sales" :key="sale.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ sale.customer.identification }}</td>
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
                      params: { sale: encodeURIComponent(JSON.stringify(sale)),
                                customer_id: sale.customer.id,
                                customers: encodeURIComponent(JSON.stringify(dressRentalStore.customers)),
                                product_id: sale.product.id,
                                products: encodeURIComponent(JSON.stringify(dressRentalStore.products)) } }" 
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
    <div class="d-flex justify-content-center align-items-center">
      <button @click="goBack" class="btn btn-primary mx-3">Regresar</button>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, reactive } from "vue";
  import { useRoute } from "vue-router";
  import { useDressRentalStore } from '@/stores/dress_rental';

  const route = useRoute();
  const dressRentalStore = useDressRentalStore();
  const detailProduct = reactive({});

  onMounted(async () => {
    const encodedData = route.params.product;
    const decodedData = await JSON.parse(decodeURIComponent(encodedData));
    detailProduct.product = decodedData;
  });

  const goBack = () => {
    window.history.back();
  };
</script>
