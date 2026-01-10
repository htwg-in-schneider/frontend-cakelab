<script setup>
import NavButton from './NavButton.vue';

defineProps({
  cake: {
    type: Object,
    required: true,
  },
  showEditButton: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="card h-100 shadow-sm cake-card">
    <img
      :src="`${import.meta.env.BASE_URL}assets/images/${cake.bildUrl}`"
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
  max-width: 360px;
  margin: 0 auto;
}

.card {
  border: none;
  border-radius: 1rem;
}

.card-img-top {
  width: 100%;
  height: 250px;       /* WICHTIG */
  object-fit: cover;  /* Kein Verzerren */
  border-radius: 1rem 1rem 0 0;
}
</style>
