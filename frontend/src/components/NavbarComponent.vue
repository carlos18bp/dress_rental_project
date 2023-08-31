<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand">
          <img
            src="../assets/Logo/Logo_Paginas_Web.jpg"
            style="height: 150px"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse d-flex justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link fs-3">
                <RouterLink :to="{ name: 'home' }" class="custom-link">
                  Home
                </RouterLink>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-3">
                <RouterLink :to="{ name: 'list_customers' }" class="custom-link">
                  Clientes
                </RouterLink>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-3">
                <RouterLink :to="{ name: 'list_products' }" class="custom-link">
                  Productos
                </RouterLink>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-3">
                <RouterLink :to="{ name: 'list_sales' }" class="custom-link">
                  Ventas
                </RouterLink>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
  import { RouterLink } from "vue-router";
</script>

<style scoped>
  .custom-link {
    text-decoration: none;
    color: inherit;
  }
  .custom-link:hover {
    color: #0b5ed7;
  }
</style>
