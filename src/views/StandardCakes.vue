<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ZusatzInfo from '@/components/ZusatzInfo.vue';
import Searching from '@/components/Searching.vue';
import ProductCard from '@/components/ProductCard.vue';

const url = 'http://localhost:8081/api/product';
const torten = ref([]);

async function fetchProducts() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    torten.value = await response.json();
    console.log(torten.value);
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
  <ZusatzInfo/>
  <Searching/>
  <div class="container mt-5 pt-5 pb-5">

    <!-- HEADER + ICON ALS FLEX-BOX -->
    <div class="d-flex align-items-start justify-content-between">

       <div>
        <h1 class="fw-bold mb-2">Standard cakes</h1>
        <p class="text-muted" style="max-width: 500px;">
         Wähle aus unseren beliebtesten Standardtorten, bereit zum Bestellen und Genießen.
        </p>
      </div>

      <img 
        src="@/assets/Images/edit_Icon.png" 
        alt="Edit" 
        class="edit-icon"
      />

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
/* EDIT ICON */
.edit-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.edit-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

</style>