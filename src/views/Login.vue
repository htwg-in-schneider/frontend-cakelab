<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRoute } from "vue-router";
const route = useRoute();
import "@/assets/auth.css";

onMounted(() => {
  document.body.classList.add("no-nav-padding");
});

onUnmounted(() => {
  document.body.classList.remove("no-nav-padding");
});

const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();

const confirmLogout = ref(false);

function handleLogin() {
  loginWithRedirect({
    appState: {
      target: window.location.hash
        ? window.location.hash.substring(1)
        : route.fullPath
    }
  });
}


function handleLogout() {
  logout({
    logoutParams: {
      returnTo:  import.meta.env.VITE_AUTH0_REDIRECT_URI,
    },
  });
}
</script>
<template>
  <div class="auth-container">
    <div v-if="!isLoading" class="auth-left">
      <div class="auth-card shadow-lg auth-card-custom">

        <template v-if="!isAuthenticated">
          <h2 class="fw-bold text-center mb-3">Willkommen zurück</h2>
          <p class="text-center mb-4">Melde dich an, um fortzufahren.</p>
          <button @click="handleLogin" class="btn btn-accent w-100">Anmelden</button>
        </template>

        <template v-else>
          <h2 class="fw-bold text-center mb-3 user-name">
            Hi {{ user?.name }}
          </h2>

          <template v-if="!confirmLogout">
            <p class="text-center mb-4 text-muted">Du bist aktuell angemeldet.</p>
            <div class="d-grid gap-3">
              <button class="btn btn-outline-secondary w-100" @click="confirmLogout = true">
                Abmelden
              </button>
              <router-link to="/" class="btn btn-accent w-100">
                Zurück zur Seite
              </router-link>
            </div>
          </template>

          <template v-else>
            <p class="text-center mb-4 text-danger fw-medium">Möchtest du dich wirklich abmelden?</p>
            <div class="d-grid gap-2">
              <button class="btn btn-danger w-100" @click="handleLogout">Ja, abmelden</button>
              <button class="btn btn-outline-secondary w-100" @click="confirmLogout = false">
                Doch angemeldet bleiben
              </button>
            </div>
          </template>
        </template>
      </div>
    </div>

    <div class="auth-right d-none d-md-flex">
      <img src="/src/assets/images/cake-login.png" class="auth-image" alt="Cake" />
    </div>
  </div>
</template>