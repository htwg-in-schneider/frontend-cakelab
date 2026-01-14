<script setup>
import { ref,onMounted  , watch} from "vue";
import { useCartStore } from "@/stores/cart";
import CartDrawer from "@/components/CartDrawer.vue";
import { useAuth0 } from '@auth0/auth0-vue';

 const { user, isAuthenticated, getAccessTokenSilently} = useAuth0(); 
const isAdmin = ref(false);
console.log("Drawer:", CartDrawer); 
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
const cart = useCartStore();
</script>


<template>
  <nav class="navbar navbar-expand-lg fixed-top shadow-sm">
    <div class="container d-flex justify-content-between align-items-center">

      <!-- Logo -->
      <router-link class="navbar-brand" to="/">
        <img src="/src/assets/images/Logo_schmal.png" alt="CakeLab Logo" class="logo-img">
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-center">
            <li class="nav-item">
                <router-link to="/admin/orders" class="nav-link" v-if="isAdmin">
                     Admin Dashboard
                </router-link>
            </li>

          <li class="nav-item mx-3">
            <router-link class="nav-link" to="/standard-cakes">Standard Cakes</router-link>
          </li>

          <li class="nav-item mx-3">
            <router-link class="nav-link" to="/customize-cake">Customize Cake</router-link>
          </li>

          <li class="nav-item mx-3">
            <router-link class="nav-link" to="/about-us">About Us</router-link>
          </li>
           
          <!-- Account -->
          <li class="nav-item ms-3">
            <router-link v-if="!isAuthenticated" to="/login">
              <img src="/src/assets/images/account_image.png" alt="Account" class="icon-img">
           </router-link>
   
          <router-link v-else to="/profile">
              <img src="/src/assets/images/account_image.png" alt="Account" class="icon-img">
          </router-link>
         </li>
          <!-- Warenkorb Icon -->
          <li class="nav-item ms-3 position-relative">
           <button 
                 class="btn p-0 border-0 bg-transparent"
                  @click="cart.openCart()">

              <img src="/src/assets/images/warenkorb_image.png" alt="Cart" class="icon-img cart-icon">

              <span
                v-if="cart.itemCount > 0"
                class="badge bg-danger position-absolute top-0 start-100 translate-middle"
                style="font-size: 0.7rem;"
              >
                {{ cart.itemCount }}
              </span>
            </button>
          </li>

        </ul>
      </div>

    </div>
  </nav>
 <CartDrawer />
</template>

<style scoped>
.navbar {
    background-color: var(--zweitfarbe);
    padding-left: 0;
    padding-right: 0;
}

.navbar .container {
    max-width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
}

.navbar-brand {
    margin-right: auto;
}

.navbar-collapse {
    justify-content: flex-end;
}

.navbar .nav-link {
    color: var(--white);
    font-weight: 600;
}

.navbar .nav-link:hover {
    text-decoration: underline;
}

.logo-img {
    width: 140px;
}

.icon-img {
    height: 30px;
    cursor: pointer;
}

.cart-icon {
    height: 35px;
}
</style>