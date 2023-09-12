<template>
  <div class="container mt-5">
    <h1>{{ defineAction }}</h1>
    <form @submit.prevent="onSubmit">
      <div v-if="productformData" class="mt-3">
        <div class="mb-3">
          <label for="title" class="form-label">Titulo:</label>
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="Titulo del producto"
            v-model="productformData.title"
            required
          />
        </div>
        <div class="mb-3">
          <label for="reference" class="form-label">Referencia:</label>
          <input
            type="text"
            class="form-control"
            id="reference"
            placeholder="Referencia"
            v-model="productformData.reference"
            required
          />
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Categoria:</label>
          <select
            class="form-select"
            v-model="productformData.categoryId"
            required>
            <option disabled>Seleccionar una opción</option>
            <option
              v-for="category in store.categories"
              :key="category.id"
              :value="category.id">
              {{ category.type }}
            </option>
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
  import { submitHandler } from "@/shared/submit_handler";
  import { useDressRentalStore } from '@/stores/dress_rental';
  import { computed } from "vue";

  const props = defineProps({
    action: String,
    productformData: Object,
    model: String,
  });

  const router = useRouter();
  const store = useDressRentalStore();

  /**
   * Check action to define view title.
   * @returns {string} - view title.
   */
  const defineAction = computed(() => {
    return props.action == "create" ? "Crear Nuevo Producto:" : "Editar Producto:";
  });

  /**
   * Submit event.
   */
  const onSubmit = () => {
    let text_response =
      props.endPoint == "create_product/"
        ? "Se ha creado tu nuevo producto"
        : "Se ha editado el producto";
    submitHandler(
      props.action,
      props.productformData,
      props.model,
      text_response,      
      router,
      "/list_products"
    );
  };

  /**
   * Returns to the previous page.
   */
  const goBack = () => window.history.back();
</script>