<template>
  <div class="container mt-5">
    <h1>{{ defineAction }}</h1>
    <form @submit.prevent="onSubmit">
      <div v-if="saleformData.sale" class="mt-3">
        <div class="mb-3">
          <label for="customer" class="form-label">Customer:</label>
          <select
            class="form-select"
            v-model="saleformData.sale.customerId"
            required>
            <option disabled>Seleccionar una opción</option>
            <option
              v-for="customer in dressRentalStore.customers"
              :key="customer.id"
              :value="customer.id">
              {{ customer.firstName }} {{ customer.lastName }} ({{
                customer.identification
              }})
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="product" class="form-label">
            Referencia del producto:
          </label>          
          <div>
            <div class="d-flex mt-2" 
              v-for="(productId, index) in selectedProductIdsLength()" :key="productId">
              <select
                class="form-select"
                v-model="saleformData.sale.productIds[index]"
                @change="checkSelectedProductIds(saleformData.sale.productIds[index], index)"
                required>
                <option disabled selected>Seleccionar una opción</option>
                <option
                  v-for="product in availableRentalProducts"             
                  :key="product.id"
                  :value="product.id">
                  {{ product.reference }}
                </option>
              </select>            
              <button class="btn btn-danger" :disabled="isFirstProduct(index)" @click="lessProduct(index)">
                  Eliminar ultimo producto
              </button>
            </div>
          </div>
          <div class="d-flex mt-2">
            <button class="btn btn-secondary" @click="addFieldProduct">
                Agregar otro producto
            </button>
          </div>
        </div>

        <div class="mb-3">
          <label for="type" class="form-label">Venta / Alquiler:</label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="saleformData.sale.type"
            required
          >
            <option disabled>Seleccionar una opción</option>
            <option>Venta</option>
            <option>Alquiler</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">
            Precio (Sin comas ni puntos):
          </label>
          <input
            type="number"
            class="form-control"
            id="price"
            placeholder="Precio (Sin comas ni puntos)"
            v-model="saleformData.sale.price"
            required
          />
        </div>

        <div class="mb-3">
          <label for="advancePayment" class="form-label">
            Abono (Sin comas ni puntos):
          </label>
          <input
            type="number"
            class="form-control"
            id="advancePayment"
            placeholder="Abono (Sin comas ni puntos)"
            v-model="saleformData.sale.advancePayment"
            required
          />
        </div>

        <div class="mb-3">
          <label for="advancePaymentDate" class="form-label">
            Fecha de Abono:
          </label>
          <input
            type="date"
            class="form-control"
            id="advancePaymentDate"
            placeholder="Fecha de Abono"
            v-model="saleformData.sale.advancePaymentDate"
            required
          />
        </div>

        <div class="mb-3">
          <label for="isProductDelivered" class="form-label">
            El Producto fue Entregado al Cliente:
          </label>
          <select
            class="form-control"
            id="isProductDelivered"
            v-model="saleformData.sale.isProductDelivered">
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="deliveryDate" class="form-label">
            Fecha Estimada de Entrega al Cliente:
          </label>
          <input
            type="date"
            class="form-control"
            id="deliveryDate"
            placeholder="Fecha Estimada de Entrega al Cliente"
            v-model="saleformData.sale.deliveryDate"
            required
          />
        </div>

        <div v-if="isRental" class="mb-3">
          <label for="returnDate" class="form-label">
            Fecha Estimada de Devolución:
          </label>
          <input
            type="date"
            class="form-control"
            id="returnDate"
            placeholder="Fecha Estimada de Devolución"
            v-model="saleformData.sale.returnDate"
            required
          />
        </div>
        
        <div class="mb-3">
          <label for="is_return" class="form-label">
            El Producto fue Devuelto:
          </label>
          <select
            class="form-control"
            id="is_return"
            v-model="saleformData.sale.isProductReturn">
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <button type="submit" class="btn btn-primary mx-3">Guardar</button>
        <RouterLink :to="{ name: 'list_sales' }" class="btn btn-danger">
          Cancelar
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import Swal from "sweetalert2";
  import { submitHandler } from "@/shared/submitHandler";
  import { computed, onMounted, ref, watchEffect } from "vue";
  import { useDressRentalStore } from '@/stores/dress_rental';

  const router = useRouter();
  const dressRentalStore = useDressRentalStore();
  const availableRentalProducts = ref([]);

  const props = defineProps({
    action: String,
    saleformData: Object,
    endPoint: String,
  });
  
  onMounted(() => {
    availableRentalProducts.value = dressRentalStore.products.filter(item => !item.isSale);
  });

  watchEffect(() => {
    if (props.saleformData.sale) {
      if (new Date(props.saleformData.sale.deliveryDate) >= new Date(props.saleformData.sale.returnDate)) {
        Swal.fire({
          icon: "warning",
          title: "Fecha no valida",
          text: "La fecha de entrega debe ser menor que la fecha de devolucion!",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            props.saleformData.sale.deliveryDate = '';
            props.saleformData.sale.returnDate = '';
          }
        });
      }

      dressRentalStore.sales.forEach((sale) => {
        sale.products.forEach((product) => {
          props.saleformData.sale.productIds.forEach((productId) => {
            if (props.saleformData.sale.type === 'Alquiler' &&
                sale.type === 'Alquiler' && 
                product.id === productId) {   
              if (new Date(props.saleformData.sale.deliveryDate) < new Date(sale.deliveryDate) && 
                  new Date(sale.returnDate) < new Date(props.saleformData.sale.returnDate)) {
                let textWarning = `Este rango de fecha de alquiler no esta disponible para
                                  el producto: ${product.reference}.
                                  Alquiler registrado del: ${sale.deliveryDate} a ${sale.returnDate}. 1`;
                warningMessageForInvalidDate(textWarning);
              } else if (new Date(sale.deliveryDate) < new Date(props.saleformData.sale.deliveryDate) && 
                        new Date(props.saleformData.sale.returnDate) < new Date(sale.returnDate)) {
                let textWarning = `Este rango de fecha de alquiler no esta disponible para
                                  el producto: ${product.reference}.
                                  Alquiler registrado del: ${sale.deliveryDate} a ${sale.returnDate}. 2`;
                warningMessageForInvalidDate(textWarning);
              } else if (new Date(sale.deliveryDate) > new Date(props.saleformData.sale.deliveryDate) &&
                        new Date(props.saleformData.sale.returnDate) > new Date(sale.deliveryDate) && 
                        new Date(props.saleformData.sale.returnDate) < new Date(sale.returnDate)) {
                let textWarning = `Este rango de fecha de alquiler no esta disponible para 
                                  el producto: ${product.reference}.
                                  Alquiler registrado del: ${sale.deliveryDate} a ${sale.returnDate}. 3`;
                warningMessageForInvalidDate(textWarning);
              } else if (new Date(sale.deliveryDate) < new Date(props.saleformData.sale.deliveryDate) &&
                        new Date(sale.returnDate) > new Date(props.saleformData.sale.deliveryDate) &&
                        new Date(props.saleformData.sale.returnDate) > new Date(sale.returnDate)) {
                let textWarning = `Este rango de fecha de alquiler no esta disponible para 
                                  el producto: ${product.reference}.
                                  Alquiler registrado del: ${sale.deliveryDate} a ${sale.returnDate}. 4`;
                warningMessageForInvalidDate(textWarning);
              }
            }
          }); 
        });
      }); 
    }
  });

  function warningMessageForInvalidDate(text) {
    Swal.fire({
      icon: "warning",
      title: "Fecha no valida",
      text: text,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        props.saleformData.sale.deliveryDate = '';
        props.saleformData.sale.returnDate = '';
      }
    });
  }

  function selectedProductIdsLength() {
    return props.saleformData.sale.productIds.length ? props.saleformData.sale.productIds.length : 1;
  }

  function addFieldProduct() {
    props.saleformData.sale.productIds.push(0);
  }

  function lessProduct(index) {
    props.saleformData.sale.productIds.splice(index, 1);
  }

  function checkSelectedProductIds(productId, index) {
    let checkDuplicateProductId = props.saleformData.sale.productIds.filter(item => item === productId).length
    if (checkDuplicateProductId > 1) {
      let product = availableRentalProducts.value.find(item => item.id == productId)
      Swal.fire({
      icon: "warning",
      title: "Producto no valida",
      text: `El producto: ${product.reference} ya ha sido seleccionado`,
      confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          props.saleformData.sale.productIds[index] = 0;
        }
      });
    }
  }

  function isFirstProduct(index) {
    return !index;
  }

  const defineAction = computed(() => {
    if (props.action == "create") return "Crear Nuevo Venta:";
    return "Editar Venta:";
  });

  const isRental = computed(() => {
    if (props.saleformData.sale.type === 'Alquiler') return true;
    return false;
  });

  const onSubmit = () => {
    let text_response =
      props.endPoint == "create_sale/"
        ? "Se ha creado tu nueva venta"
        : "Se ha editado la venta";
    submitHandler(
      props.action,
      props.endPoint,
      props.saleformData,
      text_response,
      router,
      "/list_sales"
    );
  };
</script>