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

      <NavButton
        variant="dark"
        class="mt-auto"
        :to="`/product/${product.id}`"
      >
        Zum Produkt
      </NavButton>
    </div>
  </div>
</template>

<style scoped>

.card
  {
    border: none;
    border-radius: 1rem;
  }
.card-img-top {
  height: 260px;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
}
</style>
