<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ZusatzInfo from '@/components/ZusatzInfo.vue';

import NavButton from '@/components/NavButton.vue';
import Button from '@/components/Button.vue';
import ProductCard from '@/components/ProductCard.vue';


import { ref, onMounted } from 'vue';
const url = 'http://localhost:8081/api/product';


const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const product = ref(null);
const allProducts = ref([]); 


async function fetchProduct() {
  try {
    const response = await fetch(`${url}/${props.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    product.value = await response.json();
    console.log(product.value);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}
async function fetchAllProducts() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    allProducts.value = await response.json();
  } catch (error) {
    console.error('Error fetching all products:', error);
  }
}
onMounted(async () => {await fetchProduct(); await fetchAllProducts()} );

// Related products (alle außer dieses)
const related = computed(() =>
    if (!product.value) return [];
  return allProducts.value
    .filter((p) => p.id !== product.value.id)
    .slice(0, 4);

  );
</script>

<template>
  <Navbar />
  <ZusatzInfo />

  <section class="container py-5">

    <!-- Produkt existiert -->
    <div v-if="product" class="row detail-container">

      <!-- Bild -->
      <div class="col-lg-6 image-wrapper">
        <img :src="product.bildUrl" class="img-cake" :alt="product.name" />
      </div>

      <!-- Info -->
     <div class="col-lg-6 d-flex flex-column justify-content-center">
        <h2 class="fw-bold">{{ product.name }}</h2>
        <p class="fw-bold fs-4">{{ product.preis }} €</p>
        <p class="desc">{{ product.beschreibung }}</p>

        <Button variant="accent" class="mt-3 mb-5">In den Warenkorb</Button>
      </div>

    </div>   

    <!-- Related products -->
    <div class="related-box mt-5 p-4 text-center" >

      <h4 class="mb-4 fw-bold">Ähnliche Produkte</h4>

      <!-- Desktop Grid -->
      <div class="row g-4 d-none d-md-flex">
        <div v-for="prod in related" :key="prod.id" class="col-md-3">
          <ProductCard :product="prod" />
        </div>
      </div>

      <!-- Mobile Slider -->
      <div class="mobile-slider d-md-none">
        <div
          v-for="prod in related"
          :key="prod.id"
          class="slider-item"
        >
          <ProductCard :product="prod" />
        </div>
      </div>

    </div>

  </section>

  <Footer />
</template>

<style scoped>
.detail-container {
  align-items: start;
}

.image-wrapper img {
  width: 100%;
  border-radius: 1rem;
}
.img-cake {
  width: 100%;
  border-radius: 1rem;
}

/* RELATED BOX */
.related-box {
  background-color: var(--rose);
  border-radius: 1rem;
  color: var(--white);
}

/* Mobile slider */
.mobile-slider {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.5rem;
}

.slider-item {
  min-width: 75%;
  scroll-snap-align: center;
}
</style>
