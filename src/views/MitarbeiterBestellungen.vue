<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { isAuthenticated, getAccessTokenSilently } = useAuth0();
const orders = ref([]);
const isAdmin = ref(false);
const router = useRouter();
const searchQuery = ref(""); 
const statusFilter = ref("Alle"); 
const statusOptions = ["Alle", "offen", "In bearbeitung"]; 

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/orders";

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesId = searchQuery.value === "" || 
                     order.id.toString().includes(searchQuery.value);
    const matchesStatus = statusFilter.value === "Alle" || 
                         order.status?.toLowerCase() === statusFilter.value.toLowerCase();
    
    return matchesId && matchesStatus;
  });
});

const isProcessing = (status) => status?.toLowerCase().trim() === 'in bearbeitung';
const goToUsers = () => router.push('/users');
const goToOrderDetails = (id) => router.push(`/admin/orders/${id}`);

async function loadOrders() {
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`Fehler ${res.status}:`, errorBody);
      return; 
    }

    const allOrders = await res.json();
    orders.value = allOrders.filter(o => o.status?.toLowerCase() !== "fertig");
  } catch (e) {
    console.error("Netzwerkfehler beim Laden:", e);
  }
}

async function setStatus(id, newStatus) {
  if (newStatus === "fertig") {
    orders.value = orders.value.filter(o => o.id !== id);
  } else {
    const order = orders.value.find(o => o.id === id);
    if (order) order.status = newStatus;
  }
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
       console.error("Backend Fehler:", await res.text());
       await loadOrders();
    }
  } catch (error) {
    console.error("Netzwerkfehler (CORS?):", error);
  }
}

const toggleProcessing = (order) => {
  const next = isProcessing(order.status) ? "offen" : "In bearbeitung";
  setStatus(order.id, next);
};

const finishOrder = (id) => {
  setStatus(id, "fertig");
};

async function checkAdminRole() {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      isAdmin.value = data.role?.toUpperCase() === 'ADMIN';
    }
  } catch (e) { console.error(e); }
}

onMounted(async () => {
  if (isAuthenticated.value) await checkAdminRole();
  await loadOrders();
});
</script>

<template>
  <Navbar />
  <section class="page-content">
    <div class="admin-container" v-if="isAdmin">
      <h1 class="admin-dashboard">Admin Dashboard</h1>
      
      <div class="titles">
        <h2 class="admin-title">Bestellübersicht</h2>
        <div class="info-box" @click="goToUsers" style="cursor: pointer;">
          <h2 class="user-info">Kundenübersicht</h2>
        </div>
      </div>

      <div class="filter-section">
        <div class="search-container">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Bestell-ID suchen..."
            class="id-search-input"
            @input="searchQuery = searchQuery.replace(/[^0-9]/g, '')"
          />
        </div>
        
        <div class="dropdown-container">
          <DropdownMenu 
            v-model="statusFilter" 
            :options="statusOptions" 
            placeholder="Status filtern"
          />
        </div>
      </div>

      <div class="orders-list">
        <div class="order-card" v-for="order in filteredOrders" :key="order.id">
          <div class="order-header">
            <div>
              <div class="order-id">Bestell-ID: {{ order.id }}</div>
              <div class="order-meta">Summe: {{ (order.total ?? 0).toFixed(2) }} €</div>
              <div class="order-meta">
                Status: 
                <span class="status-badge" :class="order.status?.toLowerCase().replace(/\s+/g, '-')">
                  {{ order.status ?? "offen" }}
                </span>
              </div>
            </div>
          </div>

          <div class="order-actions">
            <button class="btn-order" @click="goToOrderDetails(order.id)">
              Details →
            </button>

            <div class="order-status-buttons">
              <button 
                class="btn-status" 
                :class="{ activeButton: isProcessing(order.status) }"
                @click="toggleProcessing(order)"
              >
                In Bearbeitung
              </button>

              <button class="btn-status" @click="finishOrder(order.id)">
                Fertig
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredOrders.length === 0" class="empty-state">
          Keine Bestellungen gefunden, die deiner Suche entsprechen.
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped>

.filter-section {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  align-items: center;
  flex-wrap: wrap;
}

.search-container {
  flex: 1;
  min-width: 250px;
}

.dropdown-container {
  width: 250px;
}

.id-search-input {
  width: 100%;
  height: 46px;
  border-radius: 30px;
  border: 2px solid var(--zweitfarbe);
  padding: 0 20px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s ease;
}

.id-search-input:focus {
  border-color: var(--rose);
}

.empty-state {
  text-align: center;
  padding: 50px;
  color: var(--dark-gray);
  font-style: italic;
  background: var(--light-gray);
  border-radius: 16px;
}

.status-badge.in-bearbeitung { background: #d1ecf1; color: #0c5460; }
.status-badge.offen { background: #fff3cd; color: #856404; }  
  .page-content {
  min-height: calc(100vh - 350px);
}

.titles {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-container {
  padding: 30px;
  max-width: 1100px;
  margin: auto;
}

.admin-title,
.user-info {
  color: var(--zweitfarbe);
  font-size: 2rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 25px;
}

.admin-title {
  color: var(--zweitfarbe);
}


.user-info {
  color: var(--rose);
}

.admin-dashboard {
  text-align: center;

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
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
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

.order-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  width: 100%;
}

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

.order-status-buttons {
  display: flex;
  gap: 8px;
}

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

@media (max-width: 768px) {
  .order-card {
    padding: 18px;
  }
    .titles {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }

</style>
