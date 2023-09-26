<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand">
          <img
            :src="Logo" 
            class="logo-height"
          />
          <img
            :src="TextLogo" 
            class="text-logo-height"
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
                <RouterLink :to="{ name: 'home' }" 
                  class="custom-link test-home-link">
                  Home
                </RouterLink>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-3">
                <RouterLink :to="{ name: 'list_customers' }" 
                  class="custom-link test-list-customer-link">
                  Clientes
                </RouterLink>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-3">
                <RouterLink :to="{ name: 'list_products' }" 
                  class="custom-link test-list-product-link">
                  Productos
                </RouterLink>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-3">
                <RouterLink :to="{ name: 'list_invoices' }" 
                  class="custom-link test-list-invoice-link">
                  Facturas
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
  import Logo from "@/assets/logo/logo.png"
  import TextLogo from "@/assets/logo/only_text.png"
</script>

<style scoped>
  .custom-link {
    text-decoration: none;
    color: inherit;
  }
  .custom-link:hover {
    color: #0b5ed7;
  }
  .logo-height {
    height: 150px
  }
  .text-logo-height {
    height: 100px
  }
</style>
