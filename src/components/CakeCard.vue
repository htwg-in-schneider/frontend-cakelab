<script setup>

import NavButton from './NavButton.vue';

const props = defineProps({
  cake: {
    type: Object,
    required: true,
  },
  showEditButton: {
    type: Boolean,
    default: false,
  },
});

const imageBaseUrl = import.meta.env.BASE_URL;


</script>

<template>
  <div class="card h-100 shadow-sm cake-card">
   <img
  :src="`${imageBaseUrl}assets/images/${cake.bildUrl}`"
  class="card-img-top"
  :alt="cake.name"
    />


    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ cake.name }}</h5>
      <p class="fw-bold">{{ cake.preis }} €</p>

      <NavButton
        variant="dark"
        class="mt-auto"
        :to="`/cake/${cake.id}`"
      >
        Zum Produkt
      </NavButton>

      <NavButton
        v-if="showEditButton"
        variant="outline-dark"
        class="mt-2"
        :to="`/cake/edit/${cake.id}`"
      >
        Bearbeiten
      </NavButton>
    </div>
  </div>
</template>

<style scoped>
.cake-card {
 width: 100%;
}

.card {
  border: none;
  border-radius: 1rem;
}

.card-img-top {
  width: 100%;
  aspect-ratio: 1 / 1;     
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
}

@media (max-width: 992px) {
  .card-img-top {
    aspect-ratio: 4 / 3;
  }
}
@media (max-width: 768px) {
  .card-img-top {
    aspect-ratio: 3 / 2;
  }
}

@media (max-width: 576px) {
  .card-img-top {
    aspect-ratio: 16 / 9;
  }
}

</style>
