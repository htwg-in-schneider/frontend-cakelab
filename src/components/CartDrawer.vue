<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
const { getAccessTokenSilently,loginWithRedirect , isAuthenticated } = useAuth0();
const cart = useCartStore();
const router = useRouter();

// Items
const cartItems = computed(() => cart.items);

// Preise
const total = computed(() => cart.cartTotal.toFixed(2));

// Versandkosten-Logik
const shippingCost = computed(() => {
  return cart.cartTotal >= 50 ? 0 : 3.99;
});

const shippingLabel = computed(() => {
  return shippingCost.value === 0
    ? "Versandkostenfrei"
    : "3.99 €";
});

// Versandfrei
const missing = computed(() => cart.amountMissingForFreeShipping.toFixed(2));
const progress = computed(() => (cart.freeShippingProgress * 100).toFixed(0));

const freeShippingText = computed(() =>
  cart.amountMissingForFreeShipping === 0
    ? "Versandkostenfrei erreicht"
    : `Noch ${missing.value}€ bis Versandkostenfrei`
);

// Bestellung absenden

async function submitOrder() {
  if (!isAuthenticated.value) {
    loginWithRedirect();
    return;
  }

  if (cart.items.length === 0) return;

  const orderPayload = {
    items: cart.items.map(item => ({
      cakeId: item.cakeId ?? item.id,
      name: item.name,
      price: item.preis,
      quantity: item.quantity,
      customization: item.customization ?? null
    })),
    total: cart.cartTotal + shippingCost.value
  };

  const token = await getAccessTokenSilently({
    audience: import.meta.env.VITE_AUTH0_AUDIENCE
  });

  const response = await fetch(
    import.meta.env.VITE_API_BASE_URL + "/api/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(orderPayload)
    }
  );
 
   const finalTotal = cart.cartTotal + shippingCost.value;

cart.saveLastOrder({
  itemCount: cart.itemCount,
  total: finalTotal,
  shippingFree: shippingCost.value === 0
});

    cart.clearCart();
    cart.closeCart?.(); 
    router.push("/bestellbestaetigung");

}

</script>

<template>
<div
  v-if="cart.showCart"
  class="overlay"
  @click.self="cart.closeCart()"
>
    <div class="drawer">

      <!-- Header -->
      <div class="drawer-header d-flex justify-content-between align-items-center">
        <h5 class="fw-bold m-0">Dein Warenkorb</h5>
        <button class="btn btn-sm btn-outline-dark" @click="cart.closeCart()">✕</button>
      </div>

      <!-- Versandinfo -->
      <p class="free-shipping-text">{{ freeShippingText }}</p>

      <div class="shipping-progress">
        <div class="shipping-progress-bar" :style="{ width: progress + '%' }"></div>
      </div>

      <!-- Items -->
      <div class="drawer-items">
        <div
          v-for="item in cartItems"
          :key="item.lineId"
          class="drawer-item"
        >
          <img v-if="item.cake?.bildUrl" :src="item.cake.bildUrl" class="item-img" />

          <div class="item-info flex-grow-1 ms-2">
            <div class="fw-semibold">{{ item.name }}</div>

            <div v-if="item.customization" class="small text-muted">
              <div>Basis: {{ item.cake}}</div>
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

          <div class="item-actions d-flex flex-column align-items-end">
            <div class="btn-group btn-group-sm mb-2">
              <button class="btn btn-outline-dark" @click="cart.updateQuantity(item.lineId, item.quantity - 1)">-</button>

              <button class="btn btn-outline-dark disabled">{{ item.quantity }}</button>

              <button class="btn btn-outline-dark" @click="cart.updateQuantity(item.lineId, item.quantity + 1)">+</button>
            </div>

            <button class="btn btn-sm btn-outline-danger" @click="cart.removeItem(item.lineId)">🗑</button>
          </div>
        </div>

        <div v-if="cartItems.length === 0" class="text-center text-muted py-5">
          Dein Warenkorb ist leer 🛒
        </div>
      </div>

      <!-- Footer -->
      <div class="drawer-footer p-3 border-top">

        <!-- Versandkosten -->
        <div class="d-flex justify-content-between mb-1">
          <span class="fw-semibold">Versand</span>
          <span class="fw-semibold">
            {{ shippingLabel }}
          </span>
        </div>

        <!-- Summe -->
        <div class="d-flex justify-content-between fw-bold mb-2">
          <span>Gesamtbetrag</span>
          <span>{{ (cart.cartTotal + shippingCost).toFixed(2) }} €</span>
        </div>

        <button 
          class="checkout-btn"
          :disabled="cartItems.length === 0 "
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

.drawer {
  background: var(--white);
  height: 100%;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 550px;
  max-width: 100%;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .drawer { width: 100%; height: 100%; }
}

.drawer-header {
  padding: 18px;
  background: var(--rose);
  font-weight: 700;
  font-size: 1.1rem;
}

.free-shipping-text {
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  margin: 10px 0;
  color: var(--dark-gray);
}

.shipping-progress {
  width: calc(100% - 40px);
  height: 12px;
  margin: auto;
  background: #dbced3ff;
  border-radius: 10px;
  overflow: hidden;
}

.shipping-progress-bar {
  height: 100%;
  background: var(--zweitfarbe);
  transition: width 0.3s ease;
}

.drawer-items {
  flex-grow: 1;
  padding: 0 16px;
  overflow-y: auto;
}

.drawer-item {
  background: var(--light-gray);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.item-img {
  width: 95px;
  height: 95px;
  object-fit: cover;
  border-radius: 10px;
}

.cart-text {
  white-space: normal;
  word-break: break-word;
}

.drawer-footer {
  background: var(--light-gray);
  padding: 20px;
}

.checkout-btn {
  background: var(--zweitfarbe);
  color: white;
  font-weight: 700;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 30px;
}
</style>
