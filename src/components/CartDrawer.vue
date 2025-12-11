<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();

const cartItems = computed(() => cart.items);
const total = computed(() => cart.cartTotal.toFixed(2));
const missing = computed(() => cart.amountMissingForFreeShipping.toFixed(2));
const progress = computed(() => (cart.freeShippingProgress * 100).toFixed(0));

const freeShippingText = computed(() =>
  cart.amountMissingForFreeShipping === 0
    ? "Versandkostenfrei erreicht"
    : `Noch ${missing.value}€ bis Versandkostenfrei`
);
async function submitOrder() {
  if (cart.items.length === 0) return;

  const orderPayload = {
    items: cart.items.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.preis,
      quantity: item.quantity,
      customization: item.customization ?? null
    })),
    total: cart.cartTotal
  };

  try {
    const response = await fetch("http://localhost:8081/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderPayload)
    });

    if (!response.ok) {
      throw new Error("Fehler beim Absenden der Bestellung");
    }

    // Backend Antwort
    const savedOrder = await response.json();
    console.log("Bestellung gespeichert:", savedOrder);

    // Warenkorb leeren
    cart.clearCart();

    alert("Bestellung erfolgreich!");
    
  } catch (err) {
    console.error(err);
    alert("Es ist ein Fehler aufgetreten!");
  }
}


</script>


<template>
<div
  v-if="cart.showCart"
  class="overlay"
  @click.self="cart.closeCart()"
>
    <!-- Drawer -->
    <div class="drawer">

      <!-- Header -->
      <div class="drawer-header d-flex justify-content-between align-items-center">
        <h5 class="fw-bold m-0">Dein Warenkorb</h5>
       <button class="btn btn-sm btn-outline-dark" @click="cart.closeCart()">✕</button>
      </div>

      <!-- Versandkostenfrei Hinweis -->
  <p class="free-shipping-text">{{ freeShippingText }}</p>

<div class="shipping-progress">
  <div
    class="shipping-progress-bar"
    :style="{ width: progress + '%' }"
  ></div>
</div>


      <!-- Items -->
      <div class="drawer-items">
        <div
          v-for="item in cartItems"
          :key="item.lineId"
          class="drawer-item"
        >
          <!-- Bild -->
          <img :src="item.bildUrl" class="item-img" />

          <!-- Infos -->
          <div class="item-info flex-grow-1 ms-2">
            <div class="fw-semibold">{{ item.name }}</div>

            <!-- Custom -->
            <div v-if="item.customization" class="small text-muted">
              <div>Größe: {{ item.customization.size }}</div>
              <div>Schriftart: {{ item.customization.fontFamily }}</div>
              <div>Schriftfarbe: {{ item.customization.fontColor }}</div>
            <div v-if="item.customization.text" class="cart-text">
             Text: "{{ item.customization.text }}"
            </div>
            </div>

            <div class="fw-bold mt-1">
              {{ (item.preis * item.quantity).toFixed(2) }} €
            </div>
          </div>

          <!-- Aktionen -->
          <div class="item-actions d-flex flex-column align-items-end">
            <div class="btn-group btn-group-sm mb-2">
              <button
                class="btn btn-outline-dark"
                @click="cart.updateQuantity(item.lineId, item.quantity - 1)"
              >-</button>

              <button class="btn btn-outline-dark disabled">
                {{ item.quantity }}
              </button>

              <button
                class="btn btn-outline-dark"
                @click="cart.updateQuantity(item.lineId, item.quantity + 1)"
              >+</button>
            </div>

            <button
              class="btn btn-sm btn-outline-danger"
              @click="cart.removeItem(item.lineId)"
            >
              🗑
            </button>
          </div>
        </div>

        <!-- Wenn leer -->
        <div v-if="cartItems.length === 0" class="text-center text-muted py-5">
          Dein Warenkorb ist leer 🛒
        </div>
      </div>

      <!-- Footer -->
      <div class="drawer-footer p-3 border-top">
        <div class="d-flex justify-content-between fw-bold mb-2">
          <span>Summe</span>
          <span>{{ total }} €</span>
        </div>

      <button 
         class="checkout-btn"
        :disabled="cartItems.length === 0"
         @click="submitOrder"
        >
         Bestellung abschließen
      </button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 4000;
}

/* --- DRAWER Wrapper --- */
.drawer {
  background: var(--white);
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);

  /* DESKTOP DEFAULT */
  width: 550px;
  max-width: 100%;
}

/* MOBILE FULLSCREEN */
@media (max-width: 768px) {
  .drawer {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}

/* HEADER */
.drawer-header {
  padding: 18px;
  background: var(--rose);
  color: var(--black);
  font-weight: 700;
  font-size: 1.1rem;
}
.cart-text {
  overflow-wrap: break-word;  
  word-break: break-word;     
  white-space: normal;       
  max-width: 100%;
}


/* Versandinfo */
.free-shipping-wrapper {
  width: 100%;
  text-align: center;   
  display: flex;
  flex-direction: column;
  align-items: center;             
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 18px;
}

.free-shipping-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark-gray);
  margin-bottom: 10px;
  text-align: center;   
  width: 100%;
}


/* Progressbar Container */
.shipping-progress {
  width: calc(100% - 40px); 
  height: 12px;
  margin: 0 auto;
  background: #dbced3ff; 
  border-radius: 10px;
  overflow: hidden;
}

/* Fortschritt – richtige rose Farbe */
.shipping-progress-bar {
  height: 100%;
  background: var(--zweitfarbe); 
  transition: width 0.25s ease;
  border-radius: 10px;
}


/* ITEM LIST */
.drawer-items {
  flex-grow: 1;
  padding: 0 16px;
  overflow-y: auto;
}

/* SINGLE ITEM */
.drawer-item {
  background: var(--light-gray);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  position: relative;
}

.item-img {
  width: 95px;
  height: 95px;
  object-fit: cover;
  border-radius: 10px;
}

/* INFO */
.item-info {
  flex-grow: 1;
}

/* Preis */
.item-info .fw-bold {
  margin-top: 8px;
  font-size: 0.9rem;
}

/* ACTION BUTTONS */
.item-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.delete-btn,
.edit-btn {
  background: transparent;
  border: none;
  font-size: 1.1rem;
  color: var(--dark-gray);
  cursor: pointer;
}
.delete-btn:hover,
.edit-btn:hover {
  color: var(--zweitfarbe);
}

/* FOOTER */
.drawer-footer {
  background: var(--light-gray);
  padding: 20px;
  border-top: 1px solid #ddd;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 12px;
}

/* Checkout */
.checkout-btn {
  background: var(--zweitfarbe);
  color: var(--white);
  font-weight: 700;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
}
.checkout-btn:hover {
  opacity: 0.9;
}
</style>

