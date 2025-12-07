import { defineStore } from 'pinia';

const FREE_SHIPPING_LIMIT = 50;

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        showCart: false,
        freeShippingLimit: FREE_SHIPPING_LIMIT,
    }),

    getters: {
        cartTotal(state) {
            return state.items.reduce((sum, item) => sum + item.preis * item.quantity, 0);
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
        }
    },

    actions: {
        openCart() {
            this.showCart = true;
        },
        closeCart() {
            this.showCart = false;
        },
        
        addItem(product, customization = null) {
            const lineId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();

            this.items.push({
                lineId,
                id: product.id,
                name: product.name,
                preis: product.preis,
                bildUrl: product.bildUrl,
                quantity: 1,
                customization,  // null oder objekt
            });
        },

        removeItem(lineId) {
            this.items = this.items.filter(item => item.lineId !== lineId);
        },

        updateQuantity(lineId, quantity) {
            const item = this.items.find(i => i.lineId === lineId);
            if (!item) return;

            if (quantity <= 0) this.removeItem(lineId);
            else item.quantity = quantity;
        },

        clearCart() {
            this.items = [];
        }

    }
});
