<script setup>
import ProductCard from './ProductCard.vue';
import { torten } from '../data.js';
</script>

<template>
  <section class="shop-section">
    <div class="container">

      <!-- Titel + Edit Icon -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="text-center flex-grow-1">Unsere Bestseller</h2>
        <button class="edit-btn ms-3">
  <img src="@/assets/Images/edit_Icon.png" alt="Edit" class="edit-icon" />
</button>
      </div>

      <!-- Produkt Grid -->
      <div class="row g-4">
        <div
          v-for="torte in torten"
          :key="torte.id"
          class="col-12 col-sm-6 col-lg-3"
        >
          <ProductCard :product="torte" />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.shop-section {
  background-color: var(--rose);
  padding: 2rem;
  border-radius: 1rem;
  margin: 1.5rem auto;
  max-width: 95%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
}

/* Überschrift */
.shop-section h2 {
  color: var(--white);
  font-weight: 700;
}

/* EDIT ICON */
.edit-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.edit-icon {
  width: 60px;
  height: 60px;
}
</style>
