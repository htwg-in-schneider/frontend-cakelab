<script setup>import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { torten } from '@/data.js';
import { ref } from 'vue';
import ZusatzInfo from '@/components/ZusatzInfo.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';

const selectedBase = ref(null);
const selectedSize = ref(null);
const fontColor = ref("");
const fontFamily = ref("");
const textInput = ref("");

</script>


<template>
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
          <div v-for="size in ['Ø 18 cm', 'Ø 22 cm', 'Ø 26 cm', 'Ø 31 cm']" :key="size" class="size-item"
            :class="{ selected: selectedSize === size }" @click="selectedSize = size">
            {{ size }}
          </div>
        </div>
      </div>
      <button class="fertig-btn mt-3">Fertig</button>
    </div>
  </section>
  <Footer />
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
