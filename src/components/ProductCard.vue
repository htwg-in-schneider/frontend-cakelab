<script setup>
import NavButton from './NavButton.vue';

defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="card h-100 shadow-sm">
    <img :src="product.bildUrl" class="card-img-top" alt="" />

    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="fw-bold">{{ product.preis }} €</p>

      <!-- Zum Produkt -->
      <NavButton
        variant="dark"
        class="mt-auto"
        :to="`/product/${product.id}`"
      >
        Zum Produkt
      </NavButton>

      <!-- Bearbeiten -->
      <NavButton
        variant="outline-dark"
        class="mt-2"
        :to="`/product/edit/${product.id}`"
      >
        Bearbeiten
      </NavButton>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: none;
  border-radius: 1rem;
}

.card-img-top {
  width: 100%;
  aspect-ratio: 1 / 1; /* Quadratische Fläche */
  object-fit: cover;   /* Sauberer Crop */
  border-radius: 12px 12px 0 0;
}
</style>
