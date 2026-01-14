<script setup>
import { ref, onMounted , watch} from "vue";
import { useRoute } from "vue-router";
import NavBar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useAuth0 } from '@auth0/auth0-vue';
const {   isAuthenticated,  getAccessTokenSilently } = useAuth0(); 


const isAdmin=ref(false)
const route = useRoute();
const order = ref(null);
const props = defineProps({
  id: {
    type: String,
    required: false
  }
});


async function loadCake(cakeId) {
  const token = await getAccessTokenSilently();
  const res = await fetch(import.meta.env.VITE_API_BASE_URL +`/api/cake/${cakeId}`);
  return await res.json();
}

async function loadAllCakes() {
  const res = await fetch(import.meta.env.VITE_API_BASE_URL+ "/api/cake");
 return await res.json();
}

async function loadOrder() {
  const id = route.params.id;
  const token = await getAccessTokenSilently();
  const res = await fetch(import.meta.env.VITE_API_BASE_URL + `/api/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  order.value = data;

  const allCakes = await loadAllCakes();
  console.log("ORDER ITEMS:", JSON.stringify(order.value.items, null, 2));


  for (const item of order.value.items) {
    if (item.cakeId) {
      const cake = allCakes.find(p => p.id === item.cakeId);
      if (cake) {
        item.cake.bildUrl = cake.bildUrl;
        item.beschreibung = cake.beschreibung;
      }
    }
else if (item.customization && item.customization.baseBildUrl) {
  item.bildUrl = item.customization.baseBildUrl;
  item.beschreibung = ""; 
}
}

}
onMounted(async () => {

  if (isAuthenticated.value) {
    checkAdminRole();
    loadOrder();
  }
});
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    checkAdminRole();
    loadOrder();
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

</script>
<template>
  <NavBar />
<section class="page-content">
<div class="admin check" v-if="isAdmin">
  <div class="details-wrapper" v-if="order">
    
    <div class="details-header">
      <button class="back-btn" @click="$router.back()">‹</button>

      <div>
        <h2 class="order-title">Bestellung #{{ order.id }}</h2>
        <div class="customer-name">Kunde: {{ order.user?.name }}</div>
      </div>
    </div>

    <div class="items-list">
      <div class="item-card" v-for="item in order.items" :key="item.id">

        <!-- Bild -->
        <img v-if="item.cake?.bildUrl" :src="item.cake.bildUrl" class="item-image" />

        <!-- Infos -->
        <div class="item-info">

          <div class="item-name">{{ item.name }}</div>

          <div class="item-custom" v-if="item.customization">
            <div>Basis: {{ item.cake.name }}</div>
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

        </div>
      </div>
    </div>

    <!-- TOTAL -->
    <div class="total-box">
      <span>Gesamtbetrag</span>
      <span class="total-amount">{{ (order.total ?? 0).toFixed(2) }} €</span>
    </div>

  </div>
</div>
</section>
    <Footer />
 
</template>



<style scoped>
.page-content {
  min-height: calc(100vh - 350px);
}


.details-wrapper {
  max-width: 850px;
  margin: 40px auto;
  padding: 20px;
}

.details-header {
  background: var(--rose);
  padding: 25px;
  border-radius: 18px;

  display: flex;
  align-items: center;
  gap: 18px;

  box-shadow: 0 4px 18px rgba(0,0,0,0.12);
  margin-bottom: 35px;
}

.back-btn {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: white;
  border: none;
  border-radius: 50%;

  font-size: 20px;
  cursor: pointer;

  transition: 0.25s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.12);
}

.back-btn:hover {
  transform: translateX(-4px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.18);
}

.order-title {
  font-size: 1.8rem;
  font-weight: 700;
}

.customer-name {
  font-size: 0.9rem;
  margin-top: 4px;
  color: var(--dark-gray);
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

  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
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

  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

.total-amount {
  font-size: 1.3rem;
}
.footer-wrapper {
  margin-top: auto;
}


</style>
