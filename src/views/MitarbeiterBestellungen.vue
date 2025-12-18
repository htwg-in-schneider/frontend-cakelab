<script setup>
import { onMounted, ref , watch} from "vue";
import { useRouter } from "vue-router";
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useAuth0 } from '@auth0/auth0-vue';
 const {   isAuthenticated,  getAccessTokenSilently } = useAuth0(); 

const orders = ref([]);
const isAdmin=ref(false)
const router = useRouter();


const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/orders";

async function loadOrders() {
  const res = await fetch(API_URL);
  const allOrders = await res.json();

  // Nur Bestellungen anzeigen, die NICHT fertig sind
  orders.value = allOrders.filter(o => o.status !== "fertig");
}


async function setStatus(id, status) {
  // komplette Bestellung abrufen
  const res = await fetch(`${API_URL}/${id}`);
  const fullOrder = await res.json();

  // Wenn Status bereits gesetzt → wieder auf "offen"
  const newStatus = fullOrder.status === status ? "offen" : status;

  fullOrder.status = newStatus;

  // speichern
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fullOrder),
  });

  loadOrders();
}


async function finishOrder(id) {
  await fetch(`${API_URL}/${id}/finish`, {
    method: "PATCH"
  });

  loadOrders();
}

function goToOrderDetails(id) {
  router.push(`/admin/orders/${id}`);
}

onMounted(async () => {

  if (isAuthenticated.value) {
    checkAdminRole();
  }
});
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    checkAdminRole();
  }
});

async function checkAdminRole() {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      isAdmin.value = data.role === 'ADMIN';
    }
  } catch (error) {
    console.error('Error checking admin role:', error);
  }
}

onMounted(loadOrders);
</script>


<template>
  <Navbar />

  <! -- div class="admin-container" v-if="isAdmin"  -->
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

            <div class="order-meta">
              Status:
              <span class="status-badge" :class="order.status">
                {{ order.status ?? "offen" }}
              </span>
            </div>

          </div>
        </div>

        <div class="order-actions">
  
  <!-- Linker Button -->
  <button
    class="btn-order"
    @click="goToOrderDetails(order.id)"
  >
    Zur Bestellung →
  </button>

  <!-- Rechte Buttons -->
  <div class="order-status-buttons">
    <button
      class="btn-status"
      :class="{ activeButton: order.status === 'In bearbeitung' }"
      @click="setStatus(order.id, 'In bearbeitung')"
    >
      In Bearbeitung
    </button>

    <button
      class="btn-status"
      @click="finishOrder(order.id)"
    >
      Fertig
    </button>
  </div>

</div>

      </div>
    </div>
  <!--/div-->
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
.order-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  width: 100%;
}

.order-status-buttons {
  display: flex;
  gap: 10px;
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


.btn-order {
  background: var(--rose);
  border: none;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
  color: white;
}

.btn-order:hover {
  background: var(--zweitfarbe);
  transform: translateY(-2px);
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: capitalize;
  margin-left: 6px;
}


.btn-status.activeButton {
  background: var(--zweitfarbe);
  color: white;
  border-color: var(--zweitfarbe);
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0,0,0,0.12);
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
