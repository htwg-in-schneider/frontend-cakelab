<script setup>
import ProductCard from './ProductCard.vue';
import { torten } from '../data.js';
</script>

<template>
  <section class="shop-section">
    <div class="container">

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="text-center flex-grow-1">Unsere Bestseller</h2>
      </div>

      <div class="row g-4">
        <div v-for="torte in torten.slice(0, 4)" :key="torte.id" class="col-12 col-sm-6 col-lg-3">
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

.shop-section h2 {
  color: var(--white);
  font-weight: 700;
}
</style>
