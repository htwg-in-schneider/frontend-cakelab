<script setup>
import { useBannerStore } from '@/stores/banner';
import Button from '@/components/Button.vue';

const bannerStore = useBannerStore();

defineProps({
    text: {
        type: String,
        default: 'Freier Versand für alle Bestellungen über 50€'
    }
});
</script>

<template>
    <div id="specialbanner" class="text-center py-3" v-if="bannerStore.isVisible">
        {{ text }}&nbsp;&nbsp;
        <Button variant="dark" @click="bannerStore.hideBanner">OK!</Button>
    </div>
</template>

<style scoped>
#specialbanner {
    background-color: #ff6600;
    color: white;
}
</style>