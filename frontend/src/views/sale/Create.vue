<template>
  <div class="container mt-5">
    <h1>Crear Nueva Venta:</h1>

    <div class="mt-3">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Venta / Alquiler:</label
        >
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Seleccionar Opción
        </button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Venta</a></li>
            <li><a class="dropdown-item" href="#">Alquiler</a></li>
        </ul>
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Precio (Sin comas ni puntos):</label>
        <input
          type="number"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Precio (Sin comas ni puntos)"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Abono (Sin comas ni puntos):</label
        >
        <input
          type="number"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Abono (Sin comas ni puntos)"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Fecha de Abono:</label>
        <input
          type="date"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Teléfono"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >El Producto fue Entregado al Cliente:</label
        >
        <select class="form-control" id="exampleFormControlInput1">
            <option value="true">Si</option>
            <option value="false">No</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Fecha Estimada de Entrega al Cliente:</label>
        <input
          type="date"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Teléfono"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Fecha Estimada de Devolución:</label>
        <input
          type="date"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Teléfono"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >El Producto fue Devuelto:</label
        >
        <select class="form-control" id="exampleFormControlInput1">
            <option value="true">Si</option>
            <option value="false">No</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Referencia del Producto:</label>
        <input
          type="number"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Referencia (Sin comas ni puntos)"
        />
      </div>
    </div>
    <button class="btn btn-primary mt-4">Guardar</button>
  </div>
</template>

<script></script>
