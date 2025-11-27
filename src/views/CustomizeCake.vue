<script setup>import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { torten } from '@/data.js';
import { ref } from 'vue';

const selectedBase = ref(null);
const selectedSize = ref(null); 
</script>
<template>
  <Navbar />
  <section class="container py-5 customize-section">
    <h2 class="fw-bold mb-2">Customize your cake</h2>
    <p class="text-muted mb-4"> Wähle eine Basis sowie Schriftart, Farbe und Größe für deine individuelle Torte. </p>
    <!-- BASIS (3 → 2 → 1 Cards responsive) -->
    <h4 class="fw-bold mb-3">1. Wähle die Basis</h4>
    <div class="row g-4">
      <div v-for="cake in torten" :key="cake.id" class="col-12 col-sm-6 col-lg-4">
        <div class="base-card p-3" :class="{ selected: selectedBase === cake.id }" @click="selectedBase = cake.id"> <img
            :src="cake.bildUrl" class="base-image" :alt="cake.name" />
          <h6 class="mt-2 fw-bold">{{ cake.name }}</h6>
          <p class="text-muted small">{{ cake.beschreibung }}</p>
          <p class="fw-bold">{{ cake.preis }} €</p>
        </div>
      </div>
    </div> <!-- TEXT KONFIGURATION (jetzt unter der Basis-Auswahl) -->
    <div class="row mt-5">
      <div class="col-12 col-lg-6 mb-5">
        <h4 class="fw-bold mb-3">2. Wähle deinen Text</h4>
        <div class="config-box p-4"> 
          <label class="fw-bold mb-1">Schriftart</label> 
          <select class="form-select mb-3">
            <option>Handwriting</option>
            <option>Elegant</option>
          </select> 
          <label class="fw-bold mb-1">Schriftfarbe</label>
           <select class="form-select mb-3">
            <option>Schwarz</option>
            <option>Weiß</option>
          </select> 
          <label class="fw-bold mb-1">Text</label> 
          <input type="text" class="form-control"placeholder="Gib deinen Text ein" />
        </div>
      </div> <!-- GRÖSSE -->
      <div class="col-12 col-lg-6 mb-5">
        <h4 class="fw-bold mb-3">3. Wähle die Größe</h4>
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

/* Base cards */
.base-card {
  background: #f7f2f5;
  border-radius: 16px;
  cursor: pointer;
  transition: 0.2s;
  border: 3px solid transparent;
}

.base-card:hover {
  transform: translateY(-5px);
  border-color: #e5c6d9;
}

.base-card.selected {
  border-color: #b76ba3;
  /* kräftiges Highlight */
  transform: translateY(-5px);
  box-shadow: 0 0 10px rgba(183, 107, 163, 0.3);
}

.base-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  object-fit: cover;
}

/* Textbox style */
.config-box {
  background: #f0d7e2;
  border-radius: 12px;
}

/* Sizes */
.size-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.size-item {
  background: #f0d7e2;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: 0.25s ease;
  border: 3px solid transparent;
}

.size-item:hover {
  transform: translateY(-4px);
  background: #e7c2d7;
  border-color: #d8aac8;
}

.size-item.selected {
  background: #b76ba3;
  color: white;
  border-color: #b76ba3;
  transform: translateY(-4px);
  box-shadow: 0 0 10px rgba(183, 107, 163, 0.3);
}

/* Fertig Button */
.fertig-btn {
  width: 100%;
  background: black;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
}

/*Form elements */
/* Dropdown (select) styling */
.form-select {
  border-radius: 20px !important;
  padding: 10px 16px;
  border: 2px solid #d7bfd3;
  background-color: #f9f2f7;
  transition: 0.2s ease;
  font-size: 16px;
  color: #4a3b47;
}

/* Hover + Focus */
.form-select:hover {
  background-color: #f4e7ef;
  border-color: #c59bb8;
}

.form-select:focus {
  border-color: #b76ba3 !important;
  box-shadow: 0 0 0 4px rgba(183, 107, 163, 0.15);
  background-color: white;
}

/* --- DROPDOWN LIST (geöffnete Auswahl) --- */
.form-select option {
  border-radius: 12px;
}

/* Das eigentliche Dropdown-Menü schöner machen */
select.form-select {
  -webkit-appearance: none;
}
</style>
