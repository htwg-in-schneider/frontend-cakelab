<script setup>
import { onMounted, onUnmounted } from "vue";
import { useAuth0 } from '@auth0/auth0-vue';

// Navbar-Padding entfernen NUR für Login-Seite
onMounted(() => {
  document.body.classList.add("no-nav-padding");
});

onUnmounted(() => {
  document.body.classList.remove("no-nav-padding");
});

const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

function handleLogin() {
  loginWithRedirect();
}

function handleLogout() {
  logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
}
</script>

<template>
  <div class="auth-container">

    <!-- LEFT: Login Card -->
    <div v-if="!isLoading" class="auth-left">
      <div class="auth-card shadow-lg">
        <h2 class="fw-bold text-center mb-3">Willkommen zurück</h2>

        <p v-if="!isAuthenticated" class="text-center mb-4">
           Melde dich an, um fortzufahren
        
        </p>
<p v-else > Sie möchten SIch abmelden? </p>
        <!-- Login Button -->
        <button v-if="!isAuthenticated" @click="handleLogin" class="btn btn-accent w-100">
          Anmelden
        </button>

        <!-- Optional: Logout Button wenn eingeloggt -->
        <button v-else @click="handleLogout" class="btn btn-secondary w-100">
          Abmelden
        </button>

      </div>
    </div>

    <!-- RIGHT: Image -->
    <div class="auth-right">
      <img src="/src/assets/Images/cake-login.png" class="auth-image" alt="Cake" />
    </div>

  </div>
</template>
