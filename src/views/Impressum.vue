<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar />

 <section class="impressum-section container py-5 page-content">

    <h1 class="fw-bold mb-4">Impressum</h1>

    <div class="impressum-card shadow-sm p-4 mb-5">
      <h4 class="fw-bold mb-3">Angaben gemäß § 5 TMG</h4>
      <p>
        CakeLab GmbH<br />
        Musterstraße 12<br />
        12345 Musterstadt<br />
        Deutschland
      </p>

      <h4 class="fw-bold mt-4 mb-3">Kontakt</h4>
      <p>
        Telefon: +49 123 456789<br />
        E-Mail: info@cakelab.de
      </p>

      <h4 class="fw-bold mt-4 mb-3">Vertreten durch</h4>
      <p>
        Geschäftsführer: Max Mustermann
      </p>

      <h4 class="fw-bold mt-4 mb-3">Umsatzsteuer-ID</h4>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE123456789
      </p>

      <h4 class="fw-bold mt-4 mb-3">Haftungsausschluss</h4>
      <p>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
        Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
      </p>
    </div>
  </section>

  <Footer />
</template>

<style scoped>
    .page-content {
  min-height: calc(100vh - 350px); 
}

.impressum-section {
  color: var(--dark-gray);
}

.impressum-card {
  background-color: var(--light-gray);
  border-radius: 12px;
}

h1 {
  color: var(--zweitfarbe);
}

h4 {
  color: var(--zweitfarbe);
}

p {
  line-height: 1.6;
  font-size: 1.05rem;
}

/* Responsive */
@media (max-width: 768px) {
  .impressum-card {
    padding: 1.5rem;
  }
}
</style>
