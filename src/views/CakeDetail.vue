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

    <!-- Produkt existiert -->
    <div v-if="cake" class="row detail-container">

      <!-- Bild -->
      <div class="col-lg-6 image-wrapper">
        <img :src="cake.bildUrl" class="img-cake" :alt="cake.name" />
      </div>

      <!-- Info -->
     <div class="col-lg-6 d-flex flex-column justify-content-center">
        <h2 class="fw-bold">{{ cake.name }}</h2>
        <p class="fw-bold fs-4">{{ cake.preis }} €</p>
        <p class="desc">{{ cake.beschreibung }}</p>

        <Button 
  variant="accent" 
  class="mt-3 mb-5"
  @click="addToCart"
>
  In den Warenkorb
</Button>

 <CakeReviews :cakeId="id"/>

      </div>

    </div>  
   

    <!-- Related cakes -->
    <div class="related-box mt-5 p-4 text-center" >

      <h4 class="mb-4 fw-bold">Ähnliche Produkte</h4>

 <!-- Desktop Grid -->
<div class="row g-4 d-none d-lg-flex">
  <div v-for="prod in related" :key="prod.id" class="col-lg-3">
    <CakeCard :cake="prod" />
  </div>
</div>

<!-- Mobile Slider -->
<div class="mobile-slider d-lg-none">
  <div
    v-for="prod in related"
    :key="prod.id"
    class="slider-item"
  >
    <CakeCard :cake="prod" />
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
}
.image-wrapper img {
  width: 100%;
  border-radius: 1rem;
}
.img-cake {
  width: 100%;
  border-radius: 1rem;
  height: auto;
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
  gap: 1.2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 1rem 0 1.5rem;

  scrollbar-width: thin;
  scrollbar-color: var(--zweitfarbe) transparent;
}


.mobile-slider::-webkit-scrollbar {
  height: 6px; /* dünn & elegant */
}

.mobile-slider::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 10px;
}

.mobile-slider::-webkit-scrollbar-thumb {
  background: var(--zweitfarbe);
  border-radius: 10px;
}

.mobile-slider::-webkit-scrollbar-thumb:hover {
  background: #6f4f68; 
}

.slider-item {
  min-width: 70%;
  scroll-snap-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* 2 Karten bereits sehr früh aktiv */
@media (max-width: 1500px) {
  .slider-item {
    min-width: 50%; /* halb so breit → 2 sichtbar */
  }
}

/* 1 Karte erst auf kleinen Geräten */
@media (max-width: 700px) {
  .slider-item {
    min-width: 75%;
  }
}
@media (max-width: 991px) {
  .image-wrapper {
    max-width: 620px;   
    margin: 0 auto;     
  }
}


</style>
