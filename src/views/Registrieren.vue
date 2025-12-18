<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

// Shared Auth Styles
import "@/assets/auth.css";

const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

onMounted(() => {
  document.body.classList.add("no-nav-padding");
});

onUnmounted(() => {
  document.body.classList.remove("no-nav-padding");
});

const handleRegister = () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = "Bitte fülle alle Felder aus.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Die Passwörter stimmen nicht überein.";
    return;
  }

  router.push({ path: "/login", query: { registered: 1 } });
};
</script>

<template>
  <div class="auth-container">

    <!-- LEFT (Card) -->
    <div class="auth-left">
      <div class="auth-card shadow-lg">

        <h2 class="fw-bold text-center mb-3">Account erstellen</h2>

        <p class="text-center text-muted mb-4">
          Erstelle deinen Account, um deine Torten zu personalisieren.
        </p>

        <p v-if="errorMessage" class="text-danger mb-3 text-center">
          {{ errorMessage }}
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
          class="auth-input mb-3"
        />

        <!-- Confirm Password -->
        <label class="fw-bold mb-1">Passwort bestätigen</label>
        <input
          v-model="confirmPassword"
          type="password"
          class="auth-input mb-4"
        />

        <button class="auth-button mb-3" @click="handleRegister">
          Registrieren
        </button>

        <p class="auth-text mt-3">
          Bereits einen Account?
          <router-link to="/login" class="auth-link">
            Jetzt einloggen
          </router-link>
        </p>

      </div>
    </div>

    <!-- RIGHT IMAGE -->
    <div class="auth-right">
      <img
        src="/src/assets/images/cake-login.png"
        class="auth-image"
        alt="Cake"
      />
    </div>

  </div>
</template>
