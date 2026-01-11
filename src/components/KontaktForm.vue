<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const touched = ref({
  name: false,
  email: false,
  message: false
})

const emailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
)

const formValid = computed(() =>
  name.value.trim().length > 1 &&
  emailValid.value &&
  message.value.trim().length > 3
)

function sendMail() {
  if (!formValid.value) return

  const subject = encodeURIComponent("Kontaktanfrage von " + name.value)
  const body = encodeURIComponent(
    `Name: ${name.value}\nEmail: ${email.value}\n\nNachricht:\n${message.value}`
  )

  window.location.href = `mailto:info@cakelab.de?subject=${subject}&body=${body}`
}
</script>

<template>
  <section class="container py-5 kontakt-section">
    <h2 class="fw-bold mb-4 text-center">Kontaktiere uns</h2>

    <div class="kontakt-wrapper shadow-lg rounded-4">

      <!-- FORM -->
      <div class="kontakt-left p-4">

        <label class="fw-bold mb-1">Name</label>
        <input
          v-model="name"
          @blur="touched.name = true"
          class="form-control mb-2"
          :class="{ invalid: touched.name && name.trim().length < 2 }"
        />
        <small v-if="touched.name && name.trim().length < 2" class="error-msg">
          Bitte gib einen gültigen Namen ein.
        </small>

        <label class="fw-bold mb-1 mt-3">E-Mail</label>
        <input
          v-model="email"
          @blur="touched.email = true"
          type="email"
          class="form-control mb-2"
          :class="{ invalid: touched.email && !emailValid }"
        />
        <small v-if="touched.email && !emailValid" class="error-msg">
          Bitte gib eine gültige E-Mail ein.
        </small>

        <label class="fw-bold mb-1 mt-3">Nachricht</label>
        <textarea
          v-model="message"
          @blur="touched.message = true"
          rows="9"
          class="form-control mb-2"
          :class="{ invalid: touched.message && message.trim().length < 4 }"
        ></textarea>
        <small v-if="touched.message && message.trim().length < 4" class="error-msg">
          Die Nachricht sollte mindestens 4 Zeichen enthalten.
        </small>

        <button
          @click="sendMail"
          class="btn btn-accent w-100 mt-4"
          :disabled="!formValid"
        >
          Absenden
        </button>

      </div>

      <!--IMAGE -->
      <div class="kontakt-right">
        <img
          src="/src/assets/images/cake-login.png"
          alt="Kontakt Bild"
          class="kontakt-img"
        >
      </div>

    </div>
  </section>
</template>

<style scoped>
.kontakt-wrapper {
  display: flex;
  background-color: var(--light-gray);
  border-radius: 16px;
  overflow: hidden;
}

.kontakt-left {
  width: 55%;
  background-color: var(--light-gray);
}

.kontakt-right {
  width: 45%;
  background-color: var(--rose);
  display: flex;
  justify-content: center;
  align-items: center;
}

.kontakt-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-control {
  border-radius: 10px;
  padding: 0.6rem 1rem;
  border: 2px solid #e3d9e0;
  transition: 0.2s;
}

.form-control:focus {
  border-color: var(--zweitfarbe);
  box-shadow: 0 0 0 3px rgba(131, 99, 122, 0.2);
}

.invalid {
  border-color: #e57373 !important;
  background-color: #fff6f6;
}

.error-msg {
  color: #d9534f;
  font-size: 0.85rem;
}


@media (max-width: 992px) {
  .kontakt-wrapper {
    flex-direction: column;
  }

  .kontakt-right {
    display: none; 
  }

  .kontakt-left {
    width: 100%;
  }
}
</style>
