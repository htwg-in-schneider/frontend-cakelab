<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import NavBar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

const route = useRoute();
const order = ref(null);

async function loadOrder() {
  const id = route.params.id;

  const res = await fetch(`http://localhost:8081/api/orders/${id}`);
  const data = await res.json();

  console.log("Geladene Bestellung:", data);

  order.value = data;
}



onMounted(loadOrder);
</script>
<template>
  <NavBar />

  <div class="details-wrapper" v-if="order">
    
    <!-- HEADER -->
  <div class="details-header">
  <button class="back-btn" @click="$router.back()">‹</button>

  <div>
    <h2 class="order-title">Bestellung #{{ order.id }}</h2>
    <div class="customer-name">Kunde: Mustermann</div>
  </div>
</div>


    <!-- ITEMS -->
    <div class="items-list">
      <div class="item-card" v-for="item in order.items" :key="item.id">
        
        <img
          :src="'/img/products/' + item.productId + '.jpg'"
          class="item-image"
        />

        <div class="item-info">
          <div class="item-name">{{ item.name }}</div>

          <div class="item-custom" v-if="item.customization">
            <div>Größe: {{ item.customization.size }}</div>
            <div>Schriftart: {{ item.customization.fontFamily }}</div>
            <div>Farbe: {{ item.customization.fontColor }}</div>
            <div v-if="item.customization.text">
              Text: "{{ item.customization.text }}"
            </div>
          </div>

          <div class="item-price">
            {{ item.price.toFixed(2) }} €
          </div>
        </div>
      </div>
    </div>

    <!-- TOTAL -->
    <div class="total-box">
      <span>Gesamtbetrag</span>
      <span>{{ (order.total ?? 0).toFixed(2) }} €</span>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
.details-container {
  width: 100%;
  max-width: 700px;
  margin: 40px auto;
  padding: 10px;
}

/* HEADER CARD */
.details-header {
  background: var(--rose);
  padding: 22px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 16px;

  box-shadow: 0 4px 14px rgba(0,0,0,0.12);
  margin-bottom: 25px;
}

/* BACK BUTTON */
.back-btn {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--white);
  border-radius: 50%;
  border: none;

  font-size: 20px;
  cursor: pointer;

  box-shadow: 0 2px 10px rgba(0,0,0,0.12);
  transition: 0.2s ease;
}

.back-btn:hover {
  transform: translateX(-3px);
  box-shadow: 0 3px 14px rgba(0,0,0,0.18);
}

.order-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  color: var(--black);
}

.customer-name {
  margin-top: -4px;
  font-size: 0.85rem;
  color: var(--dark-gray);
}

/* PRODUKT-LISTE */
.item-row {
  display: flex;
  align-items: center;
  padding: 16px;
  background: var(--light-gray);
  margin-bottom: 14px;
  border-radius: 14px;

  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.item-img {
  width: 85px;
  height: 85px;
  border-radius: 12px;
  object-fit: cover;
}

.item-info {
  flex-grow: 1;
  padding-left: 14px;
}

.item-name {
  font-weight: 600;
  font-size: 1rem;
}

.item-price {
  font-weight: 700;
  color: var(--black);
  margin-top: 5px;
}

/* CHECKMARK ICON */
.item-check {
  font-size: 1.2rem;
  color: var(--zweitfarbe);
  font-weight: bold;
}

/* SUMME */
.total-row {
  background: var(--light-gray);
  padding: 20px;
  margin-top: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 700;

  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}


</style>
