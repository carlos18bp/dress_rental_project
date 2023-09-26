<template>
  <div class="container mt-5">
    <h1>{{ defineAction }}</h1>
    
    <form @submit.prevent="onSubmit">
      <div v-if="invoiceformData && filterAvailableProducts()" class="mt-3">
        <div class="mb-3">
          <label for="customer" 
            class="form-label test-customer-label">
              Customer:
          </label>
          <select
            class="form-select test-customer-select"
            v-model="invoiceformData.customerId"
            required>
            <option disabled>Seleccionar una opción</option>
            <option
              v-for="customer in customerStore.customers"
              :key="customer.id"
              :value="customer.id">
              {{ customer.firstName }} {{ customer.lastName }} ({{
                customer.identification
              }})
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="product" 
            class="form-label test-product-label">
            Referencia del producto:
          </label>          
          <div>
            <div class="d-flex mt-2" 
              v-for="(productId, index) in invoiceformData.selectedProductIdsLength" :key="productId">
              <select
                class="form-select test-product-select"
                v-model="invoiceformData.productIds[index]"
                required>
                <option disabled selected>Seleccionar una opción</option>
                <option
                  v-for="product in filterAvailableProducts()"             
                  :key="product.id"
                  :value="product.id"
                  :disabled="invoiceformData.isProductSelected(product.id)">
                  <p v-if="invoiceformData.isProductSelected(product.id)">
                    {{ product.reference }} (Seleccionado)
                  </p>
                  <p v-else>
                    {{ product.reference }}
                  </p>
                </option>
              </select>            
              <button class="btn btn-danger" 
                :disabled="invoiceformData.isFirstProduct(index)" 
                @click="invoiceformData.removeProduct(index)">
                  Eliminar ultimo producto
              </button>
            </div>
          </div>
          <div class="d-flex mt-2">
            <button class="btn btn-secondary" @click="invoiceformData.addFieldProduct">
                Agregar otro producto
            </button>
          </div>
        </div>

        <div class="mb-3">
          <label for="type" 
            class="form-label test-sale-rental-label">
            Venta / Alquiler:
          </label>
          <select
            class="form-select test-sale-rental-select"
            aria-label="Default select example"
            v-model="invoiceformData.type"
            required
          >
            <option disabled>Seleccionar una opción</option>
            <option>Venta</option>
            <option>Alquiler</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="price" 
            class="form-label test-price-label">
            Precio (Sin comas ni puntos):
          </label>
          <input
            type="number"
            class="form-control test-price-input"
            id="price"
            placeholder="Precio (Sin comas ni puntos)"
            v-model="invoiceformData.price"
            required
          />
        </div>

        <div class="mb-3">
          <label for="advancePayment" 
            class="form-label test-advance-payment-label">
            Abono (Sin comas ni puntos):
          </label>
          <input
            type="number"
            class="form-control test-advance-payment-input"
            id="advancePayment"
            placeholder="Abono (Sin comas ni puntos)"
            v-model="invoiceformData.advancePayment"
            required
          />
        </div>

        <div class="mb-3">
          <label for="advancePaymentDate" 
            class="form-label test-advance-payment-date-label">
            Fecha de Abono:
          </label>
          <input
            type="date"
            class="form-control test-advance-payment-date-input"
            id="advancePaymentDate"
            placeholder="Fecha de Abono"
            v-model="invoiceformData.advancePaymentDate"
            required
          />
        </div>

        <div class="mb-3">
          <label for="isProductDelivered" 
            class="form-label test-is-product-delivered-label">
            El Producto fue Entregado al Cliente:
          </label>
          <select
            class="form-control test-is-product-delivered-select"
            id="isProductDelivered"
            v-model="invoiceformData.isProductDelivered">
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="deliveryDate" 
            class="form-label test-delivery-date-label">
            Fecha Estimada de Entrega al Cliente:
          </label>
          <input
            type="date"
            class="form-control test-delivery-date-input"
            id="deliveryDate"
            placeholder="Fecha Estimada de Entrega al Cliente"
            v-model="invoiceformData.deliveryDate"
            required
          />
        </div>

        <div v-if="isRental" class="mb-3">
          <label for="returnDate" 
            class="form-label test-return-date-label">
            Fecha Estimada de Devolución:
          </label>
          <input
            type="date"
            class="form-control test-return-date-input"
            id="returnDate"
            placeholder="Fecha Estimada de Devolución"
            v-model="invoiceformData.returnDate"
            required
          />
        </div>
        
        <div class="mb-3">
          <label for="is_return" 
            class="form-label test-is-product-return-label">
            El Producto fue Devuelto:
          </label>
          <select
            class="form-control test-is-product-return-select"
            id="is_return"
            v-model="invoiceformData.isProductReturn"
            required>
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div class="d-flex justify-content-center align-items-center">
        <button type="submit" class="btn btn-primary mx-3">Guardar</button>
        <button @click="goBack" class="btn btn-danger mx-3">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { submitHandler } from "@/shared/submit_handler";
  import { computed, onMounted, ref, watchEffect } from "vue";
  import { useCustomerStore } from '@/stores/customer';
  import { useProductStore } from '@/stores/product';

  const customerStore = useCustomerStore();
  const productStore = useProductStore();

  const props = defineProps({
    action: String,
    invoiceformData: Object,
    model: String,
  });

  onMounted(async () => {
    await customerStore.fetchCustomersData();
    await productStore.fetchProductsData();
  });
  
  watchEffect(() => {
    props.invoiceformData.checkDates;
  });

  /**
   * Filter available products.
   * @return {array} - Available product array.
   */
   function filterAvailableProducts() {
    return productStore.filterAvailableProductsByInvoice(props.invoiceformData);
  }

  /**
   * Check action to define view title.
   * @returns {string} - view title.
   */
  const defineAction = computed(() => {
    if (props.action == "create") return "Crear Nuevo Venta:";
    return "Editar Venta:";
  });

  /**
   * Check rental type.
   * @returns {boolean} - Check invoice type.
   */
  const isRental = computed(() => {
    if (props.invoiceformData.type === 'Alquiler') return true;
    return false;
  });

  /**
   * Submit event.
   */
  const onSubmit = () => {
    let text_response =
      props.endPoint == "create_invoice/"
        ? "Se ha creado tu nueva venta"
        : "Se ha editado la venta";

    submitHandler(
      props.action,
      props.invoiceformData,
      props.model,
      text_response,
      "/list_invoices"
    );
  };

  /**
   * Returns to the previous page.
   */
  const goBack = () => window.history.back();
</script>