<template>
  <div class="container mt-5">
    <h1>{{ defineAction }}</h1>
    
    <form @submit.prevent="onSubmit">
      <div v-if="invoice && filterAvailableProducts()" class="mt-3">
        <div class="mb-3">
          <label for="customer" class="form-label">Customer:</label>
          <select
            class="form-select"
            v-model="invoice.customerId"
            required>
            <option disabled>Seleccionar una opción</option>
            <option
              v-for="customer in productStore.customers"
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
              v-for="(productId, index) in invoice.selectedProductIdsLength" :key="productId">
              <select
                class="form-select"
                v-model="invoice.productIds[index]"
                required>
                <option disabled selected>Seleccionar una opción</option>
                <option
                  v-for="product in filterAvailableProducts()"             
                  :key="product.id"
                  :value="product.id"
                  :disabled="invoice.isProductSelected(product.id)">
                  <p v-if="invoice.isProductSelected(product.id)">
                    {{ product.reference }} (Seleccionado)
                  </p>
                  <p v-else>
                    {{ product.reference }}
                  </p>
                </option>
              </select>            
              <button class="btn btn-danger" 
                :disabled="invoice.isFirstProduct(index)" 
                @click="invoice.removeProduct(index)">
                  Eliminar ultimo producto
              </button>
            </div>
          </div>
          <div class="d-flex mt-2">
            <button class="btn btn-secondary" @click="invoice.addFieldProduct">
                Agregar otro producto
            </button>
          </div>
        </div>

        <div class="mb-3">
          <label for="type" class="form-label">Venta / Alquiler:</label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="invoice.type"
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
            v-model="invoice.price"
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
            v-model="invoice.advancePayment"
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
            v-model="invoice.advancePaymentDate"
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
            v-model="invoice.isProductDelivered">
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
            v-model="invoice.deliveryDate"
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
            v-model="invoice.returnDate"
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
            v-model="invoice.isProductReturn">
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
  import { useRouter } from "vue-router";
  import Invoice from '@/models/invoice';
  import { submitHandler } from "@/shared/submit_handler";
  import { computed, ref, watchEffect } from "vue";
  import { useProductStore } from '@/stores/product';

  const router = useRouter();
  const productStore = useProductStore();
  const invoice = ref(null);

  const props = defineProps({
    action: String,
    invoiceformData: Object,
    model: String,
  });
  
  watchEffect(() => {
    if (props.invoiceformData && !invoice.value) {
      invoice.value = new Invoice(props.invoiceformData);      
    }
    if (invoice.value) invoice.value.checkDates;
  });

  /**
   * Filter available products.
   * @return {array} - Available product array.
   */
   function filterAvailableProducts() {
    return productStore.filterAvailableProductsByInvoice(invoice.value);
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
    if (invoice.value.type === 'Alquiler') return true;
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
      invoice.value,
      props.model,
      text_response,
      router,
      "/list_invoices"
    );
  };

  /**
   * Returns to the previous page.
   */
  const goBack = () => window.history.back();
</script>