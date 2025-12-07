<script setup>
import { onMounted, ref } from "vue";
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';


const orders = ref([]);

async function loadOrders() {
  const res = await fetch("http://localhost:8081/api/orders");
  orders.value = await res.json();
}

onMounted(loadOrders);
</script>

<template>
  <Navbar />

  <div class="admin-container">

    <h2 class="admin-title">Bestellübersicht</h2>

    <div class="orders-list">
      <div class="order-card" v-for="order in orders" :key="order.id">
        <!-- Header -->
        <div class="order-header">
          <div>
            <div class="order-id">Bestell-ID: {{ order.id }}</div>
            <div class="order-meta">
        Anzahl Artikel: {{ order.items.length }}
            </div>
            <div class="order-meta">
              Summe: {{ (order.total ?? 0).toFixed(2) }} €

            </div>
          </div>

          <button class="delete-btn">🗑</button>
        </div>

        <!-- Status -->
        <div class="order-actions">
          <button class="btn-order" @click="$router.push({ name: 'admin-order-details', params: { id: order.id } })">
            Zur Bestellung
          </button>

          <div class="order-status-buttons">
            <button class="btn-status">In Bearbeitung</button>
            <button class="btn-status">Fertig</button>
          </div>
        </div>

      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.admin-container {
  padding: 30px;
  max-width: 1100px;
  margin: auto;
}

.admin-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 25px;
}

.orders-list {
  display: grid;
  gap: 20px;
}

.order-card {
  background: var(--light-gray);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #ddd;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.order-id {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.order-meta {
  color: var(--dark-gray);
  font-size: 0.9rem;
}

.delete-btn {
  border: none;
  background: transparent;
  font-size: 1.3rem;
  cursor: pointer;
}

.status-row {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.status-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid var(--black);
  background: white;
  font-weight: 600;
  cursor: pointer;
}

.status-btn.secondary {
  background: var(--rose);
  border: none;
}

.status-btn.success {
  background: var(--zweitfarbe);
  color: white;
  border: none;
}

.order-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  width: 100%;
}

/* --- Card Hover Effekt (modern, optional) --- */
.order-card {
  background: var(--light-gray);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #ddd;
  transition: 0.25s ease;
}

.order-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

/* DELETE BUTTON Hover */
.delete-btn {
  border: none;
  background: transparent;
  font-size: 1.3rem;
  cursor: pointer;
  transition: 0.2s ease;
}

.delete-btn:hover {
  color: #cc0000;
  transform: scale(1.15);
}

/* --- Buttons Layout --- */
.order-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  width: 100%;
}

/* Linker Button */
.btn-order {
  background: var(--rose);
  border: none;
  padding: 8px 18px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
}

.btn-order:hover {
  background: var(--zweitfarbe);
  color: var(--white);
  transform: translateY(-2px);
}

/* Rechter Button-Container */
.order-status-buttons {
  display: flex;
  gap: 8px;
}

/* Rechte Buttons */
.btn-status {
  background: white;
  border: 1px solid #aaa;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.25s ease;
}

.btn-status:hover {
  border-color: var(--zweitfarbe);
  color: var(--zweitfarbe);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* MOBILE */
@media (max-width: 768px) {
  .order-card {
    padding: 18px;
  }
}
</style>
