<script setup>
import { onMounted, ref , watch} from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
const { isAuthenticated, getAccessTokenSilently } = useAuth0();
import { RouterLink } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
const orders = ref([]);
const error = ref(null);
const API_PROFILE = import.meta.env.VITE_API_BASE_URL + `/api/profile/orders`;

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

  if (isAuthenticated.value) {
    await loadOrders();
  }
});


watch(isAuthenticated, (loggedIn) => {
  if (loggedIn) {
    loadOrders();
  }
});

</script>
<template>
  <Navbar />
  <div class="customer-container" v-if="isAuthenticated">
    <div class="profile-wrapper">
      <div class="eclipse">

        <RouterLink to="/profile" class="circle mein-profile" active-class="active-circle">
          Mein Profil
        </RouterLink>

        <RouterLink to="/profile/orders" class="circle meine-Bestellungen" active-class="active-circle">
          Meine Bestellungen
        </RouterLink>
      </div>
      <div v-if="orders.length > 0">
        <div v-for="order in orders" :key="order.id" class="orders-user">

          <!-- ITEMS -->
          <div v-for="item in order.items" :key="item.id" class="item-card">
            <div class="item-order-number">
              Bestellungsnummer: {{ order.id }}
            </div>
            <img v-if="item.cake?.bildUrl" :src="item.cake.bildUrl" class="item-image" />

            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>

              <div class="item-price">
                Kuchenpreis:
                {{ (item.price * item.quantity).toFixed(2) }} €
              </div>

              <div>
                Menge: {{ item.quantity }}
              </div>
            </div>
          </div>

        </div>
        <!-- TRENNWAND -->
        <!-- TRENNWAND -->
        <div class="order-separator soft">
          <span>=</span>
        </div>

        <!-- BESTELL-INFOS ALS CARD -->
        <div class="order-summary card">
          <div class="summary-row">
            <span>Anzahl Artikel: </span>
            <span>{{ order?.items.length }}</span>
          </div>

          <div class="summary-row">
            <span>Versand: </span>
            <span>
              {{ order.shippingFree ? "Kostenlos" : "Standardversand" }}
            </span>
          </div>

          <div class="summary-row total">
            <span>= Gesamtbetrag:</span>
            <span>{{ order.total != null ? order.total.toFixed(2) : '0.00' }} €</span>
          </div>
        </div>

      </div>
    </div>
     </div>
    <div v-else>
      Noch keine Bestellung vorhanden
    </div>
  <Footer />
</template>
<style scoped>
.eclipse {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: -20px;
  gap: 20px;
  margin-bottom: 40px;
  justify-content: space-between;
}

/* --- Grundlayout --- */
.orders-user {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 60px;
  margin-bottom: 80px;
  padding-bottom: 50px;

  border-bottom: 2px dashed rgba(0, 0, 0, 0.12);
}

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

/* weichere Trennwand */
.order-separator {
  margin: 40px 0 30px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.order-separator::before,
.order-separator::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--dark-gray);
  opacity: 0.35;
}

.order-separator span {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--dark-gray);
  opacity: 0.7;
}

.order-separator.soft {
  margin: 30px 0 20px;
}


.order-separator.soft span {
  font-size: 1rem;
  opacity: 0.6;
}

/* Info-Card */
.order-summary.card {
  background: var(--light-gray);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
  gap: 20px;
}

/* dezente Hervorhebung der Summe */
.summary-row.total {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed rgba(0, 0, 0, 0.15);
  font-size: 1.1rem;
  font-weight: 700;
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
  margin-bottom: 30px;
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
  font-size: 20px;
}

.item-custom {
  font-size: 0.85rem;
  color: var(--dark-gray);
  margin-top: 5px;
}

.item-order-number {
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