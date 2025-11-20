<script setup>
import { ref } from 'vue';

const showBanner = ref(true);

function closeBanner() {
  showBanner.value = false;
}
</script>

<template>
  <div
    class="versand-banner text-center py-2"
    v-if="showBanner"
  >
    <p>Freier Versand für alle Bestellungen über 50€</p>
    <button class="banner-btn" @click="closeBanner">OK</button>
  </div>
</template>

<style scoped>
.versand-banner {
  background-color: var(--zweitfarbe);
  color: var(--light-gray);
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.versand-banner p {
  margin: 0;
}

.banner-btn {
  background-color: var(--light-gray);
  color: var(--zweitfarbe);
  font-weight: 700;
  border: none;
  padding: 0.3rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.banner-btn:hover {
  opacity: 0.85;
}
</style>
