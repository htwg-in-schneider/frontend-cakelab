<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
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
  loginWithRedirect();
}

function handleLogout() {
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
}
</script>

<template>
  <div class="auth-container">

    <!-- LEFT -->
    <div v-if="!isLoading" class="auth-left">
      <div class="auth-card shadow-lg">

        <!-- NICHT EINGELOGGT -->
        <template v-if="!isAuthenticated">
          <h2 class="fw-bold text-center mb-3">Willkommen zurück</h2>
          <p class="text-center mb-4">
            Melde dich an, um fortzufahren.
          </p>

          <button
            @click="handleLogin"
            class="btn btn-accent w-100"
          >
            Anmelden
          </button>
        </template>

        <!-- EINGELOGGT -->
        <template v-else>
          <h2 class="fw-bold text-center mb-3">
            Hi {{ user?.name }}
          </h2>

          <!-- ERSTE STUFE -->
          <template v-if="!confirmLogout">
            <p class="text-center mb-4">
              Du bist aktuell angemeldet.
            </p>

            <button
              class="btn btn-outline-secondary w-100 mb-2"
              @click="confirmLogout = true"
            >
              Abmelden
            </button>

            <router-link
              to="/"
              class="btn btn-accent w-100"
            >
              Zurück zur Seite
            </router-link>
          </template>

          <!-- BESTÄTIGUNG -->
          <template v-else>
            <p class="text-center mb-4">
              Möchtest du dich wirklich abmelden?
            </p>

            <button
              class="btn btn-danger w-100 mb-2"
              @click="handleLogout"
            >
              Ja, abmelden
            </button>

            <button
              class="btn btn-outline-secondary w-100"
              @click="confirmLogout = false"
            >
              Doch angemeldet bleiben
            </button>
          </template>
        </template>

      </div>
    </div>

    <!-- RIGHT -->
    <div class="auth-right">
      <img
        src="/src/assets/images/cake-login.png"
        class="auth-image"
        alt="Cake"
      />
    </div>

  </div>
</template>
