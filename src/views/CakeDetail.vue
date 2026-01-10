<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ZusatzInfo from '@/components/ZusatzInfo.vue';

import Button from '@/components/Button.vue';
import CakeCard from '@/components/CakeCard.vue';

import CakeReviews from '@/components/CakeReviews.vue';
import { ref, onMounted, computed , watch} from 'vue';

import { useCartStore } from "@/stores/cart";
const url = import.meta.env.VITE_API_BASE_URL + '/api/cake';


const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const cake = ref(null);
const allCakes = ref([]); 


async function fetchCake() {
  try {
    const response = await fetch(`${url}/${props.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    cake.value = await response.json();
    console.log(cake.value);
  } catch (error) {
    console.error('Error fetching cake:', error);
  }
}
async function fetchAllCakes() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    allCakes.value = await response.json();
  } catch (error) {
    console.error('Error fetching all cakes:', error);
  }
}
onMounted(async () => {await fetchCake(); await fetchAllCakes()} );
watch(() => props.id, async () => {
  await fetchCake();
});

// Related cakes (alle außer dieses)
const related = computed(() =>{
    if (!cake.value) return [];
  return allCakes.value
    .filter((p) => p.id !== cake.value.id)
    .slice(0, 4);

  });


const cart = useCartStore();

function addToCart() {
  if (!cake.value) return;
  cart.addItem(cake.value);
  cart.openCart();
}

</script>

<template>
  <Navbar />
  <ZusatzInfo />

<section class="container py-5">
  <div v-if="cake" class="row g-5 align-items-start">

    <!-- Bild -->
    <div class="col-12 col-md-6">
      <div class="image-wrapper">
        <img :src="cake.bildUrl" class="img-cake" :alt="cake.name" />
      </div>
    </div>

    <!-- Info -->
    <div class="col-12 col-md-6 d-flex flex-column">
      <h2 class="fw-bold">{{ cake.name }}</h2>
      <p class="fw-bold fs-4">{{ cake.preis }} €</p>
      <p class="desc">{{ cake.beschreibung }}</p>

      <Button variant="accent" class="mt-3 mb-4 w-100 w-lg-auto" @click="addToCart">
        In den Warenkorb
      </Button>

      <CakeReviews :cakeId="id" />
    </div>

  </div>

  <!-- Related -->
  <div class="related-box mt-5 p-4">
    <h4 class="mb-4 fw-bold text-center">Ähnliche Produkte</h4>

    <!-- Desktop Grid -->
    <div class="row g-4 d-none d-lg-flex">
      <div v-for="prod in related" :key="prod.id" class="col-lg-3 d-flex">
        <CakeCard class="w-100" :cake="prod" />
      </div>
    </div>

  
    <div class="mobile-slider d-lg-none">
      <div v-for="prod in related" :key="prod.id" class="slider-item">
        <CakeCard class="w-100" :cake="prod" />
      </div>
    </div>
  </div>
</section>


  <Footer />
</template>

<style scoped>
  .CakeCard {
  width: 100% !important;
}
.detail-container {
  align-items: start;
}


.image-wrapper {
  border-radius: 1rem;
  overflow: hidden;
  background: #eee; 
}

.img-cake {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 1rem;
}

@media (max-width: 991px) {
  .img-cake {
    aspect-ratio: 4 / 3;

  }
}


@media (max-width: 576px) {
  .img-cake {
    aspect-ratio: auto;     
    max-height: 320px;
    object-fit: contain;     
    background: #f3f3f3;    
    padding: 12px;
  }
}

.related-box {
  background-color: var(--rose);
  border-radius: 1rem;
  color: var(--white);
}

.mobile-slider {
  display: flex;
  gap: 1.2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 1rem 0 1.5rem;
}

.slider-item {
  min-width: 75%;
  scroll-snap-align: center;
}

@media (min-width: 500px) {
  .slider-item {
    min-width: 60%;
  }
}

@media (min-width: 700px) {
  .slider-item {
    min-width: 45%;
  }
}


</style>
