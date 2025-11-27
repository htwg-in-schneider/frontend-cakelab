<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

// <- das ist deine Produktliste
import { torten } from '@/data.js';
</script>

<template>
  <Navbar />

  <section class="container py-5 customize-section">

    <h2 class="fw-bold mb-2">Customize your cake</h2>
    <p class="text-muted mb-4">
      Wähle eine Basis sowie Schriftart, Farbe und Größe für deine individuelle Torte.
    </p>

    <div class="row gx-5">

      <!-- BASIS = STANDARD CAKES LADEN -->
      <div class="col-12 col-lg-6 mb-5">
        <h4 class="fw-bold mb-3">Wähle die Basis</h4>

        <div class="row g-4">
          <div 
            v-for="cake in torten"
            :key="cake.id"
            class="col-12 col-md-6"
          >
            <div class="base-card p-3">
              <img :src="cake.bildUrl" class="base-image" :alt="cake.name" />

              <h6 class="mt-2 fw-bold">{{ cake.name }}</h6>
              <p class="text-muted small">{{ cake.beschreibung }}</p>
              <p class="fw-bold">{{ cake.preis }} €</p>
            </div>
          </div>
        </div>
      </div>

      <!-- TEXT KONFIGURATION -->
      <div class="col-12 col-lg-3 mb-5">
        <h4 class="fw-bold mb-3">Wähle deinen Text</h4>

        <div class="config-box p-4">
          
          <label class="fw-bold mb-1">Schriftart</label>
          <select class="form-select mb-3">
            <option>Handwriting</option>
            <option>Elegant</option>
          </select>

          <label class="fw-bold mb-1">Schriftfarbe</label>
          <select class="form-select mb-3">
            <option>Gold</option>
            <option>Schwarz</option>
            <option>Weiß</option>
          </select>

          <label class="fw-bold mb-1">Text</label>
          <input type="text" class="form-control" placeholder="Gib deinen Text ein" />
        </div>
      </div>

      <!-- GRÖSSE -->
      <div class="col-12 col-lg-3 mb-5">
        <h4 class="fw-bold mb-3">Wähle die Größe</h4>

        <div class="size-grid">
          <div class="size-item">Ø 18 cm</div>
          <div class="size-item">Ø 22 cm</div>
          <div class="size-item">Ø 26 cm</div>
          <div class="size-item">Ø 31 cm</div>
        </div>

        <button class="fertig-btn mt-4">Fertig</button>
      </div>

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
}
.base-card:hover {
  transform: translateY(-5px);
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
}

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

</style>
