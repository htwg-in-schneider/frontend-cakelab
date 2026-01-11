<script setup>
import Button from './Button.vue';
import NavButton from './NavButton.vue';
</script>

<template>
    <section class="hero d-flex align-items-end">
        <div class="container">
            <div class="sub-container col-md-6 col-sm-10">
                <h1>Create your own cake</h1>
                <p>Gestalte deinen Kuchen ganz nach deinem Geschmack! Ob zur Hochzeit, zum Geburtstag oder als
                    liebevolle Überraschung, dein persönlicher Touch macht ihn besonders.</p>
                    <NavButton variant="accent" class="mt-auto":to="`/customize-cake`">
                        Shop now
                    </NavButton>
                

            </div>
        </div>
    </section>
</template>

<style scoped>
/* Hero */
.hero {
    background: url('/src/assets/images/Landing_page_bild.png') center/cover no-repeat;
    height: 600px;
    display: flex;
    align-items: center;
}

.sub-container {
    background: none;
    padding: 2rem 0;
    border-radius: 0;
    color: var(--black);
}

.hero h1 {
    font-weight: 700;
    font-size: 2.8rem;
}

.hero p {
    font-size: 1.1rem;
    max-width: 600px;
}
</style>