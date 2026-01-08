<script setup>
import { ref, onMounted } from 'vue';
import CakeCard from '@/components/CakeCard.vue';

const torten = ref([]); // Lokaler State für Produkte

const url = import.meta.env.VITE_API_BASE_URL + '/api/cake';

async function fetchCakes() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    // Wenn Backend direkt ein Array zurückgibt:
    torten.value = await response.json();

    // Wenn Backend etwas wie { content: [...] } zurückgibt,
    // dann stattdessen:
    // const data = await response.json();
    // torten.value = data.content;
  } catch (error) {
    console.error('Error fetching cakes:', error);
  }
}

onMounted(fetchCakes);
</script>

<template>
  <section class="shop-section">
    <div class="container">

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="text-center flex-grow-1">Unsere Bestseller</h2>
      </div>

      <div class="row g-4">
        <div
          v-for="torte in torten.slice(0, 4)"
          :key="torte.id"
          class="col-12 col-sm-6 col-lg-3"
        >
          <CakeCard :cake="torte" />
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
