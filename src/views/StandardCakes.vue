<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ZusatzInfo from '@/components/ZusatzInfo.vue';
import Searching from '@/components/Searching.vue';
import ProductCard from '@/components/ProductCard.vue';

const url = 'http://localhost:8081/api/product';
const torten = ref([]);

async function fetchProducts(filters={}) {
  try {
     const params = new URLSearchParams();
      if (filters.name && filters.name.trim() !== '') {
      params.append('name', filters.name.trim());
    }
    if (filters.category && filters.category.trim() !== '') {
      params.append('category', filters.category.trim());
    }
      
  const response = await fetch(`${url}?${params.toString()}`);


    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    torten.value = await response.json();
      console.log("Fetching products:", response);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

onMounted(async () => {
  await fetchProducts();
});
</script>

<template>
  <Navbar />
  <ZusatzInfo />
  <Searching @productUpdate="fetchProducts" />
  <div class="container mt-5 pt-5 pb-5">

    <!-- HEADER + ICON ALS FLEX-BOX -->
  <div class="d-flex align-items-center justify-content-between mb-3">
  <div>
    <h1 class="fw-bold mb-2 d-flex align-items-center">
      Standard cakes
    </h1>
    <p class="text-muted" style="max-width: 500px;">
      Wähle aus unseren beliebtesten Standardtorten, bereit zum Bestellen und Genießen.
    </p>
  </div>

  <!-- Add Icon -->
  <RouterLink to="/product/create" class="icon-wrapper">
    <img src="\assets\images\plus_icon.png" alt="Torte hinzufügen" class="add-icon" />
  </RouterLink>
</div>

    <div class="row g-4 mt-4">
      <div v-for="item in torten" :key="item.id" class="col-12 col-md-6 col-lg-4">
        <ProductCard :product="item" />
      </div>
    </div>

  </div>

  <Footer />
</template>

<style scoped>
.add-icon {
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: 0.2s ease;
}

.add-icon:hover {
  transform: scale(1.1);
}

.icon-wrapper {
  display: flex;
  align-items: center;
}
</style>