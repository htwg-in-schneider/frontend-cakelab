<script setup>
import Button from './Button.vue';
</script>

<template>
    <section class="about-section">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-5 mb-4 mb-md-0">
                    <h2>Created by</h2>
                    <h6>Unsere Geschichte:</h6>
                    <p>Zwei Schwestern, eine große Leidenschaft fürs Backen. Aus einem kleinen Küchenprojekt wurde unser
                        Herzensbusiness.</p>
                    <h6>Unsere Philosophie:</h6>
                    <p>Jede Torte ist handgemacht, individuell und mit Liebe gestaltet. Wir glauben, dass die schönsten
                        Momente auch die süßesten sein sollten.</p>
                    <h6>Unsere Vision:</h6>
                    <p>Freude schenken mit Torten, die Geschichten erzählen und jeden Anlass ein bisschen besonderer
                        machen.</p>
                    <Button variant="dark" class="mt-auto">
                        Lerne uns kennen
                    </Button>
                </div>
                <div class="col-md-7 text-center">
                    <img src="/src/assets/images/Aboutus_bild.png" class="img-fluid rounded shadow"
                        alt="Bäckerteam">
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

.about-section {
    margin: 5rem 0;
}

.about-section h2 {
    font-weight: 700;
    margin-bottom: 2rem;
}

.about-section p {
    color: var(--medium-gray);
}
</style>
