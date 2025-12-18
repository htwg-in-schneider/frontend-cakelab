<script setup>import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { ref, onMounted, computed } from 'vue';
import ZusatzInfo from '@/components/ZusatzInfo.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { useCartStore } from '@/stores/cart';
import { useAttrs } from 'vue';

import  {useAuth0} from '@auth0/auth0-vue';
const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
const selectedBase = ref(null);
const selectedSize = ref(null);
const fontColor = ref("");
const fontFamily = ref("");
const textInput = ref("");
const torten = ref([]);
const cart = useCartStore();
const popup = ref(null);
onMounted(async () => {
  fetchTorten();
  if (isAuthenticated.value) {
    checkAdminRole();
  }
});
const errors = ref({
  base: false,
  size: false,
  fontFamily: false,
  fontColor: false,
  textInput: false
});

const sizePrices = {
  "Ø 18 cm": 0,
  "Ø 22 cm": 3,
  "Ø 26 cm": 6,
  "Ø 31 cm": 9
};

const isFormValid = computed(() => {
  return (
    selectedBase.value &&
    selectedSize.value &&
    fontFamily.value &&
    fontColor.value &&
    textInput.value.trim().length > 0
  );
});

const totalPrice = computed(() => {
  if (!selectedBase.value) return 0;

  const base = torten.value.find(p => p.id === selectedBase.value);
  if (!base) return 0;

  const extra = selectedSize.value ? sizePrices[selectedSize.value] : 0;

  return base.preis + extra;
});

const url = import.meta.env.VITE_API_BASE_URL + '/api/product';

async function fetchTorten() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Fehler beim Laden der Produkte");
    }
    torten.value = await response.json();
    console.log("CustomizeCake → Torten geladen:", torten.value);
  } catch (err) {
    console.error(err);
  }
}

onMounted(fetchTorten);

function addCustomizedCake() {
  // Einzelvalidierung
  errors.value.base = !selectedBase.value;
  errors.value.size = !selectedSize.value;
  errors.value.fontFamily = !fontFamily.value;
  errors.value.fontColor = !fontColor.value;
  errors.value.textInput = textInput.value.trim().length === 0;



const baseProduct = torten.value.find(p => p.id === selectedBase.value);

const customization = {
  baseCakeId: baseProduct.id,
  baseName: baseProduct.name,
  baseBildUrl: baseProduct.bildUrl,
  size: selectedSize.value,
  fontFamily: fontFamily.value,
  fontColor: fontColor.value,
  text: textInput.value,
};



  const item = {
    id: baseProduct.id,  
    name: "Customized Cake",
    preis: totalPrice.value,  
    bildUrl: baseProduct.bildUrl,
  };

  cart.addItem(item, customization);
  cart.openCart();


}


</script>



<template>
  <div v-if="isAuthenticated">
  <Navbar />
  <ZusatzInfo />
  <section class="container py-5 customize-section">
    <h1 class="fw-bold mb-2">Customize your cake</h1>
    <p class="text-muted mb-4"> Wähle eine Basis sowie Schriftart, Farbe und Größe für deine individuelle Torte. </p>
    <h2 class="fw-bold mb-3">1. Wähle die Basis</h2>
    <div class="row g-4">
      <div v-for="cake in torten" :key="cake.id" class="col-12 col-sm-6 col-lg-4">
        <div class="base-card p-3" :class="{ selected: selectedBase === cake.id }" @click="selectedBase = cake.id">

          <img :src="cake.bildUrl" class="base-image" :alt="cake.name" />

          <h6 class="mt-2 fw-bold">{{ cake.name }}</h6>

          <p class="text-muted small">{{ cake.beschreibung }}</p>

          <div class="flex-grow"></div> <!-- SCHIEBT Preis nach unten -->

          <p class="fw-bold mt-2">{{ cake.preis }} €</p>

        </div>

      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 col-lg-6 mb-5">
        <h2 class="fw-bold mb-3">2. Wähle deinen Text</h2>
        <div class="config-box p-4">
          <label class="fw-bold mb-1">Schriftart</label>
          <DropdownMenu :options="['Handschrift', 'Serif', 'Sans-Serif', 'Playful Brush', 'Elegant', 'Modern']"
            v-model="fontFamily" placeholder="Schriftart wählen" />

          <label class="fw-bold mb-1">Schriftfarbe</label>

          <DropdownMenu :options="['Schwarz', 'Weiß', 'Rot', 'Rosa', 'Blau', 'Grün', 'Gelb', 'Orange', 'Braun', 'Lila']"
            v-model="fontColor" placeholder="Farbe wählen" />

          <label class="fw-bold mb-1">Text</label>
          <input type="text" class="form-control" placeholder="Gib deinen Text ein" v-model="textInput"
            maxlength="50" />

          <div class="char-counter">
            {{ textInput.length }} / 50 Zeichen
          </div>


        </div>
      </div>


      <!-- GRÖSSE -->
      <div class="col-12 col-lg-6 mb-5">
        <h2 class="fw-bold mb-3">3. Wähle die Größe</h2>
        <div class="size-grid">
         <div
  v-for="size in Object.keys(sizePrices)"
  :key="size"
  class="size-item"
  :class="{ selected: selectedSize === size }"
  @click="selectedSize = size"
>
  <div>{{ size }}</div>
  <div class="size-extra">+{{ sizePrices[size] }} €</div>
</div>

          <p class="fw-bold mt-3 " style="font-size: 24px;">
            Gesamtpreis: {{ totalPrice }} €
          </p>

        </div>
      </div>
      <button class="fertig-btn mt-3" :disabled="!isFormValid" @click="addCustomizedCake">Fertig</button>
    </div>
  </section>


  <Footer />
</div>
</template>


<style scoped>
.customize-section {
  max-width: 1200px;
}


.customize-section h2 {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}

/* Step-Boxen */
.config-box {
  background: var(--light-gray);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}

/* Base cards */
.base-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--light-gray);
  border-radius: 16px;
  cursor: pointer;
  padding: 18px;
  transition: 0.2s;
  border: 2px solid transparent;
}

.flex-grow {
  flex-grow: 1;
}

.base-card:hover {
  transform: translateY(-6px);
  border-color: var(--rose);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.base-card.selected {
  border-color: var(--zweitfarbe);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  background-color: rgba(105, 16, 49, 0.15);
}

.base-image {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 12px;
  object-fit: cover;
}

/* Size selection */
.size-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.size-item {
  background: var(--light-gray);
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: 0.25s ease;
  border: 2px solid transparent;
}

.size-item:hover {
  transform: translateY(-4px);
  border-color: var(--rose);
}

.size-item.selected {
  border-color: var(--zweitfarbe);
  transform: translateY(-4px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
.size-extra {
  font-size: 14px;
  color: var(--dark-gray);
  margin-top: 4px;
  opacity: 0.8;
}


/* Fertig Button */
.fertig-btn {
  width: 100%;
  max-width: 380px;
  margin: 40px auto 0;
  display: block;
  background: var(--black);
  color: var(--white);
  padding: 14px;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 600;
  transition: 0.25s ease;
}

.fertig-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.fertig-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}


/* Character counter */
.char-counter {
  font-size: 14px;
  color: var(--medium-gray);
  margin-top: 4px;
  text-align: right;
}

/* Inputs */
.form-control {
  border-radius: 30px;
  padding: 12px 16px;
  border: 2px solid var(--zweitfarbe);
  background-color: var(--white);
  color: var(--dark-gray);
  transition: 0.2s;
}

.form-control:hover {
  border-color: var(--black);
}

.form-control:focus {
  border-color: var(--zweitfarbe);
  box-shadow: 0 0 0 4px rgba(146, 108, 135, 0.25);
}

</style>