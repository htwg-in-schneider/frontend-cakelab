<template>
  <transition name="fade">
    <div v-if="visible" class="popup" :class="type">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
const message = ref("");
const type = ref("success");

function show(msg, t = "success") {
  message.value = msg;
  type.value = t;
  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, 2000);
}

defineExpose({ show });
</script>

<style scoped>
.popup {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 14px 18px;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  z-index: 9999;
}

.success { background: #4caf50; }
.error { background: #e25252; }

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
