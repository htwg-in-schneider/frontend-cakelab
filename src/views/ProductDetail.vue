<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ZusatzInfo from '@/components/ZusatzInfo.vue';

import NavButton from '@/components/NavButton.vue';
import Button from '@/components/Button.vue';
import ProductCard from '@/components/ProductCard.vue';

import { computed } from 'vue';
import { torten } from '@/data.js';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const product = computed(() =>
  torten.find((t) => String(t.id) === String(props.id))
);

// Related products (alle außer dieses)
const related = computed(() =>
  torten.filter((t) => t.id !== product.value.id)
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
        <p>{{ product.beschreibung }}</p>

        <Button variant="accent" class="mt-3 mb-5">In den Warenkorb</Button>
      </div>

    </div>   

    <!-- Related products -->
    <div class="related-box mt-5 p-4 text-center" >

      <h4 class="mb-4 fw-bold">Related products</h4>

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
