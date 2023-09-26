<template>
  <div class="container mt-5">
    <h1>{{ defineAction }}</h1>
    <form @submit.prevent="onSubmit">
      <div v-if="customerformData" class="mt-3">
        <div class="mb-3">
          <label for="identification" 
            class="form-label test-identification-label">
            Número de Cédula:
          </label>
          <input
            type="number"
            class="form-control test-identification-input"
            id="identificatio"
            placeholder="Número de Cédula"
            v-model="customerformData.identification"
            required
          />
        </div>
        <div class="mb-3">
          <label for="firstName" 
            class="form-label test-first-name-label">
            Nombre:
          </label>
          <input
            type="text"
            class="form-control test-first-name-input"
            id="firstName"
            placeholder="Nombre"
            v-model="customerformData.firstName" 
            required
          />
        </div>
        <div class="mb-3">
          <label for="lastName" 
            class="form-label test-last-name-label">
            Apellido:
          </label>
          <input
            type="text"
            class="form-control test-last-name-input"
            id="lastName"
            placeholder="Apellido"
            v-model="customerformData.lastName" 
            required
          />
        </div>
        <div class="mb-3">
          <label for="customerEmail" 
            class="form-label test-email-label">
            Email:
          </label>
          <input
            type="email"
            class="form-control test-email-input"
            id="customer-email"
            placeholder="Email"
            v-model="customerformData.email"
          />
        </div>
        <div class="mb-3">
          <label for="customerContact" 
            class="form-label test-contact-label">
            Número De Contacto:
          </label>
          <input
            type="number"
            class="form-control test-contact-input"
            id="customerContact"
            placeholder="Número De Contacto"
            v-model="customerformData.contact" 
            required
          />
        </div>
        <div class="mb-3">
          <label for="customerSecondContact" 
            class="form-label test-second-contact-label">
            Número De Contacto Secundario (opcional):
          </label>
          <input
            type="number"
            class="form-control test-second-contact-input"
            id="customerSecondContact"
            placeholder="Número De Contacto Secundario (opcional)"
            v-model="customerformData.secondContact" 
          />
        </div>
        <div class="mb-3">
          <label for="customerAddress" 
            class="form-label test-address-label">
            Direccion (opcional):
          </label>
          <input
            type="text"
            class="form-control test-address-input"
            id="customerAddress"
            placeholder="Direccion (opcional)"
            v-model="customerformData.address" 
          />
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
  import { computed } from 'vue';
  import { submitHandler } from '@/shared/submit_handler'; 

  const props = defineProps({
      action: String,
      customerformData: Object,
      model: String,
  });

  /**
   * Check action to define view title.
   * @returns {string} - view title.
   */
  const defineAction = computed(() => {
    return props.action == 'create' ? 'Crear Nuevo Cliente:' : 'Editar Cliente:';
  });

  /**
   * Submit event.
   */
  const onSubmit = () => {
    let text_response = 
      props.action == 'create' ? 'Se ha creado tu nuevo cliente' : 'Se ha editado el cliente';

    submitHandler(
      props.action, 
      props.customerformData, 
      props.model, 
      text_response,
      '/list_customers');
  };

  /**
   * Returns to the previous page.
   */
  const goBack = () => window.history.back();
</script>