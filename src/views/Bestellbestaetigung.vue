<script setup>
import { computed } from "vue";
import { onMounted, onUnmounted } from "vue";
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();
const order = computed(() => cart.lastOrder);

onMounted(() => {
  document.body.classList.add("no-nav-padding");
});

onUnmounted(() => {
  document.body.classList.remove("no-nav-padding");
});
</script>

<template>
  <section class="confirmation-page">

    <div class="success-hero">
      <div class="checkmark">✓</div>
      <h1>Vielen Dank für Ihre Bestellung!</h1>
      <p>
        Ihre Bestellung wurde erfolgreich aufgegeben.
        <br />
        Wir bereiten Ihre Torte mit viel Liebe zu 💕
      </p>
    </div>

    <div class="confirmation-content">

      <!-- ORDER SUMMARY -->
      <div class="summary-card">
        <h3>Bestellübersicht</h3>

        <div class="summary-row">
          <span>Anzahl Produkte</span>
          <span>{{ order.itemCount }}</span>
        </div>

        <div class="summary-row">
          <span>Versand</span>
          <span>
            {{ order.total >= 50 ? "Kostenlos" : "Standardversand" }}
          </span>
        </div>

        <div class="summary-row total">
          <span>Gesamtbetrag</span>
          <span>{{ order.total.toFixed(2) }} €</span>
        </div>
      </div>

      <!-- NEXT STEPS -->
      <div class="steps-card">
        <h3>So geht es weiter</h3>

        <ul class="steps">
          <li>
            <strong>Produktion</strong>
            <span>Ihre Torte wird frisch für Sie gebacken.</span>
          </li>
          <li>
            <strong>Versand</strong>
            <span>Sobald Ihre Bestellung versendet wurde, informieren wir Sie.</span>
          </li>
          <li>
            <strong>Benachrichtigung</strong>
            <span>Sie erhalten alle Infos per E-Mail.</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- ACTIONS -->
    <div class="confirmation-actions">
      <router-link to="/" class="btn btn-accent">Zurück zur Startseite</router-link>
    </div>
  </section>
</template>


<style scoped>
.confirmation-page {
  min-height: 100vh;
  padding: 60px 20px;
  background: var(--light-gray);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-hero {
  text-align: center;
  max-width: 700px;
  margin-bottom: 50px;
}

.checkmark {
  width: 80px;
  height: 80px;
  background: var(--zweitfarbe);
  color: white;
  border-radius: 50%;
  font-size: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.success-hero h1 {
  font-weight: 800;
  margin-bottom: 10px;
}

.success-hero p {
  color: var(--medium-gray);
  font-size: 1.1rem;
}

.confirmation-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  max-width: 900px;
  width: 100%;
}

@media (max-width: 768px) {
  .confirmation-content {
    grid-template-columns: 1fr;
  }
}

.summary-card,
.steps-card {
  background: var(--white);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.06);
}

.summary-card h3,
.steps-card h3 {
  margin-bottom: 20px;
  font-weight: 700;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.summary-row.total {
  font-weight: 800;
  font-size: 1.2rem;
  margin-top: 15px;
}

.steps {
  list-style: none;
  padding: 0;
}

.steps li {
  margin-bottom: 18px;
}

.steps strong {
  display: block;
  margin-bottom: 4px;
}

.confirmation-actions {
  margin-top: 50px;
  display: flex;
  gap: 15px;
}

.btn-primary {
  background: var(--zweitfarbe);
  color: white;
  border: none;
  padding: 14px 26px;
  border-radius: 30px;
  font-weight: 700;
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--zweitfarbe);
  color: var(--zweitfarbe);
  padding: 14px 26px;
  border-radius: 30px;
  font-weight: 700;
}
</style>