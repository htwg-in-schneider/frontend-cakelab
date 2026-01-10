import { defineStore } from "pinia";

const FREE_SHIPPING_LIMIT = 50;

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    showCart: false,
    freeShippingLimit: FREE_SHIPPING_LIMIT,
    lastOrder: null,
  }),

  getters: {
    cartTotal(state) {
      return state.items.reduce(
        (sum, item) => sum + item.preis * item.quantity,
        0
      );
    },
    itemCount(state) {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    amountMissingForFreeShipping() {
      const missing = this.freeShippingLimit - this.cartTotal;
      return missing > 0 ? missing : 0;
    },
    freeShippingProgress() {
      const p = this.cartTotal / this.freeShippingLimit;
      return Math.min(Math.max(p, 0), 1);
    },
  },

  actions: {
    openCart() {
      this.showCart = true;
    },

    closeCart() {
      this.showCart = false;
    },

    saveLastOrder(order) {
      this.lastOrder = order;
    },

    addItem(cake, customization = null) {
      const lineId = crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString();

      this.items.push({
        lineId,
        cakeId: cake.id,
        name: cake.name,
        preis: cake.preis,
        bildUrl: cake.bildUrl,
        quantity: 1,
        customization,
      });
    },

    removeItem(lineId) {
      this.items = this.items.filter((item) => item.lineId !== lineId);
    },

    updateQuantity(lineId, quantity) {
      const item = this.items.find((i) => i.lineId === lineId);
      if (!item) return;

      if (quantity <= 0) this.removeItem(lineId);
      else item.quantity = quantity;
    },

    clearCart() {
      this.items = [];
    },

    async checkout() {
      const order = {
        total: this.cartTotal,
        items: this.items.map((item) => ({
          cake: {cake: item.cakeId},
          name: item.name,
          price: item.preis,
          quantity: item.quantity,
          customization: item.customization ?? null,
        })),
      };

      const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!response.ok) return null;

      const savedOrder = await response.json();

      this.saveLastOrder({
        itemCount: this.itemCount,
        total: this.cartTotal,
        shippingFree: this.cartTotal >= this.freeShippingLimit,
      });

      this.items = [];
      this.showCart = false;

      return savedOrder;
    },
  },
});
