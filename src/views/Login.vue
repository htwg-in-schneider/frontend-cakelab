<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

// Import shared auth layout styles
import "@/assets/auth.css";

const route = useRoute();

      const justRegistered = ref(false);
const email = ref("");
const password = ref("");

// Navbar-Padding entfernen NUR für Login
onMounted(() => {
  document.body.classList.add("no-nav-padding");

  // Dynamischer Erfolgstitel nach Registrierung
  if (route.query.registered === "1") {
    justRegistered.value = true;
  }
});

onUnmounted(() => {
  document.body.classList.remove("no-nav-padding");
});
</script>

<template>
  <div class="auth-container">

    <!-- LEFT: Login Card -->
    <div class="auth-left">
      <div class="auth-card shadow-lg">

        <!-- Title -->
        <h2 class="fw-bold text-center mb-3">
          {{ justRegistered ? "Account erfolgreich erstellt!" : "Willkommen zurück" }}
        </h2>

        <!-- Subtitle -->
        <p class="text-center text-muted mb-4">
          {{ justRegistered ? "Du kannst dich jetzt mit deinen Zugangsdaten einloggen." : "Melde dich an, um deine Torte zu erstellen." }}
        </p>

        <!-- Email -->
        <label class="fw-bold mb-1">E-Mail</label>
        <input
          v-model="email"
          type="email"
          class="auth-input mb-3"
          placeholder="name@example.com"
        />

        <!-- Password -->
        <label class="fw-bold mb-1">Passwort</label>
        <input
          v-model="password"
          type="password"
          class="auth-input mb-4"
        />

        <!-- LOGIN BUTTON -->
        <router-link to="/customize-cake">
          <button class="auth-button mb-3">Einloggen</button>
        </router-link>

        <!-- Register Link -->
        <p class="auth-text mt-3">
          Kein Account?
          <router-link to="/registrieren" class="auth-link">
            Jetzt registrieren
          </router-link>
        </p>

      </div>
    </div>

    <!-- RIGHT: Image -->
    <div class="auth-right">
      <img src="/src/assets/Images/cake-login.png" class="auth-image" alt="Cake" />
    </div>

  </div>
</template>
