<script setup>
import { onMounted, ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
const { isAuthenticated, getAccessTokenSilently } = useAuth0();
import { RouterLink } from "vue-router";
import Navbar from "@/components/Navbar.vue";
const orders = ref([]);
const error = ref(null);
const API_PROFILE = import.meta.env.VITE_API_BASE_URL + `/api/profile/orders`;
const API_ORDER= import.meta.env.VITE_API_BASE_URL + `/api/orders`;
async function loadOrders() {
  try {
    const token = await getAccessTokenSilently({
      audience: import.meta.env.VITE_AUTH0_AUDIENCE
    });

    const res = await fetch(API_PROFILE, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("ORDERS:", data);

    orders.value = data;
  } catch (e) {
    error.value = e.message;
    console.error("LOAD ORDERS ERROR:", e);
  }
}

onMounted(async () => {
    
    if (isAuthenticated.value){ 
        await loadOrders();
    }
}) ;
import { watch } from "vue";

watch(isAuthenticated, (loggedIn) => {
  if (loggedIn) {
    loadOrders();
  }
});

</script>
<template>
  <Navbar />
 <div class="customer-container" v-if="isAuthenticated">
     <div class="eclipse">

          <RouterLink to="/profile" class="circle mein-profile" active-class="active-circle">
            Mein Profil
          </RouterLink>

          <RouterLink to="/profile/orders" class="circle meine-Bestellungen" active-class="active-circle">
            Meine Bestellungen
          </RouterLink>
        </div>
        <div class="profile-card">
    <div v-for="order in orders" :key="order.id" class="orders-user">
      <div v-for="item in order.items" :key="item.id" class="item-card">
        <!-- Bild -->
        <img :src="item.bildUrl" class="item-image" />

        <!-- Infos -->
        <div class="item-info">

          <div class="item-name">{{ item.name }}</div>

          <div class="item-custom" v-if="item.customization">
            <div>Basis: {{ item.customization.baseName }}</div>
            <div>Größe: {{ item.customization.size }}</div>
            <div>Schriftart: {{ item.customization.fontFamily }}</div>
            <div>Farbe: {{ item.customization.fontColor }}</div>
            <div v-if="item.customization.text">
              Text: "{{ item.customization.text }}"
            </div>
          </div>

          <div class="item-price">
            {{ (item.price * item.quantity).toFixed(2) }} €
          </div>

          <div class="summary-row">
            <span>Anzahl Produkte: </span>
            <span>{{ order.itemCount }}</span>
          </div>

          <div class="summary-row">
            <span>Versand: </span>
            <span>
              {{ order.shippingFree ? "Kostenlos" : "Standardversand" }}
            </span>
          </div>

          <div class="summary-row total">
            <span>Gesamtbetrag: </span>
            <span>{{ order.total.toFixed(2) }} €</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>

  .eclipse {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: -40px; 
  gap: 20px;
  margin-bottom: 40px;
  justify-content: space-between; 
}

/* --- Grundlayout --- */

.circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  text-align: center;
  text-decoration: none;

  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  z-index: 2;
}

.active-circle {
  outline: 4px solid white;
  box-shadow: 0 0 0 6px var(--dark-gray);
}


.mein-profile,
.meine-Bestellungen {

  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;

  z-index: 2;
}

.meine-Bestellungen {
  color: white;
  background-color: var(--rose);

}

.mein-profile {
  color: white;
  background-color: var(--zweitfarbe);
}

.eclipse::after {
  content: "";
  position: absolute;
  height: 6px;

  
  width: calc(100% - 140px);

  background: #999;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1;
}

.customer-container {
  padding: 30px;
  max-width: 1100px;
  margin: auto;
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
  transition: 0.25s ease;
}

.order-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}


.items-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.item-card {
  display: flex;
  background: var(--light-gray);
  border-radius: 18px;
  padding: 16px;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  gap: 16px;
}

.item-image {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 14px;
}

.item-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
}

.item-custom {
  font-size: 0.85rem;
  color: var(--dark-gray);
  margin-top: 5px;
}

.item-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--black);
  margin-top: 8px;
}

/* SUMME */
.total-box {
  margin-top: 30px;
  background: var(--rose);
  padding: 20px;

  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 1.2rem;
  font-weight: 700;
  color: white;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.total-amount {
  font-size: 1.3rem;
}
</style>