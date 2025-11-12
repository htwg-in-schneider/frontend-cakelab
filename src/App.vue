<script setup>
import { ref } from 'vue';

const showBanner = ref(true);

function closeBanner() {
    showBanner.value = false;
}
</script>

<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top shadow-sm">
        <div class="container d-flex justify-content-between align-items-center">
            <a class="navbar-brand" href="#">
                <img src="./assets/images/Logo_schmal.png" alt="CakeLab Logo" class="logo-img">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav align-items-center">
                    <li class="nav-item mx-3"><a class="nav-link" href="#">Standard cake</a></li>
                    <li class="nav-item mx-3"><a class="nav-link" href="#">Customize cake</a></li>
                    <li class="nav-item mx-3"><a class="nav-link" href="#">About us</a></li>
                    <li class="nav-item ms-3">
                        <a href="#"><img src="./assets/images/account_image.png" alt="Account" class="icon-img"></a>
                    </li>
                    <li class="nav-item ms-3">
                        <a href="#"><img src="./assets/images/warenkorb_image.png" alt="Cart" class="icon-img"></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero d-flex align-items-end">
        <div class="container">
            <div class="sub-container col-md-6 col-sm-10">
                <h1>Create your own cake</h1>
                <p>Gestalte deinen Kuchen ganz nach deinem Geschmack! Ob zur Hochzeit, zum Geburtstag oder als
                    liebevolle Überraschung, dein persönlicher Touch macht ihn besonders.</p>
                <a href="#" class="btn btn-dark mt-3">Shop now</a>
            </div>
        </div>
    </section>

    <!-- Zusatzinfo -->
    <div class="versand-info text-center py-2">
        <p>Freier Versand für alle Bestellungen über 50€</p>
    </div>

    <!-- Shop -->
    <section class="shop-section text-center">
        <div class="container narrow-box">
            <h2 class="fw-bold mb-4">Shop Best-Seller</h2>
            <div class="row g-4 justify-content-center">
                <div class="col-md-3 col-sm-6">
                    <img src="./assets/images/Kuchen_Lotus-caramell.png" class="img-fluid rounded" alt="Lotus-Karamell">
                    <p>Lotus-Karamell</p>
                    <button class="btn btn-dark">Zum Produkt</button>
                </div>
                <div class="col-md-3 col-sm-6">
                    <img src="./assets/images/Kuchen_Schokolade.png" class="img-fluid rounded" alt="Schoko-Ganache">
                    <p>Schoko-Ganache</p>
                    <button class="btn btn-dark">Zum Produkt</button>
                </div>
                <div class="col-md-3 col-sm-6">
                    <img src="./assets/images/Kuchen_pistazien-Himbeer.png" class="img-fluid rounded" alt="Pistazien-Himbeer">
                    <p>Pistazien-Himbeer</p>
                    <button class="btn btn-dark">Zum Produkt</button>
                </div>
                <div class="col-md-3 col-sm-6">
                    <img src="./assets/images/Kuchen_beeren-Sahne.png" class="img-fluid rounded" alt="Beeren-Sahne">
                    <p>Beeren-Sahne</p>
                    <button class="btn btn-dark">Zum Produkt</button>
                </div>
            </div>
        </div>
    </section>

    <!-- About -->
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
                    <a href="#" class="btn btn-dark">Learn more</a>
                </div>
                <div class="col-md-7 text-center">
                    <img src="./assets/images/Schwestern in der Küche_Gemini.png" class="img-fluid rounded shadow"
                        alt="Bäckerteam">
                </div>
            </div>
        </div>
    </section>

    <!-- Feedback -->
    <section class="feedback-section text-center">
        <div class="container narrow-box">
            <h2 class="fw-bold mb-4">Feedback</h2>
            <div class="row g-4 justify-content-center">
                <div class="col-md-3 col-sm-6">
                    <div class="card p-3 h-100">
                        <p>Ich habe schon zum dritten Mal bestellt, jede Torte war perfekt! Frisch, lecker und super
                            liebevoll verpackt.</p>
                        <div class="d-flex align-items-center justify-content-center mt-auto">
                            <img src="./assets/images/Benutzer1.png" class="rounded-circle me-2" alt="Benutzer1" height="50">
                            <strong>Lara</strong>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="card p-3 h-100">
                        <p>Einfach wow! Mein personalisierter Geburtstagskuchen sah toll aus und kam super bei allen
                            Gästen an.</p>
                        <div class="d-flex align-items-center justify-content-center mt-auto">
                            <img src="./assets/images/Benutzer3.png" class="rounded-circle me-2" alt="Benutzer3" height="50">
                            <strong>Nina</strong>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="card p-3 h-100">
                        <p>Tolle Idee, den Text selbst zu gestalten, so konnte ich ein richtig persönliches Geschenk
                            machen. Gerne wieder!</p>
                        <div class="d-flex align-items-center justify-content-center mt-auto">
                            <img src="./assets/images/Benutzer2.png" class="rounded-circle me-2" alt="Benutzer2" height="50">
                            <strong>Ben</strong>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="card p-3 h-100">
                        <p>Die Qualität ist einfach top. Sah nicht nur toll aus, sondern schmeckte auch himmlisch!
                            Lieferung war super schnell.</p>
                        <div class="d-flex align-items-center justify-content-center mt-auto">
                            <img src="./assets/images/Benutzer4.png" class="rounded-circle me-2" alt="Benutzer4" height="50">
                            <strong>Jonas</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-3 mb-4">
                    <img src="./assets/images/Logo.png" alt="CakeLab Logo" class="logo-img mb-2">
                </div>
                <div class="col-md-3 mb-3">
                    <h6>User info</h6>
                    <a href="#">Create an account</a><br>
                    <a href="#">Login</a>
                </div>
                <div class="col-md-3 mb-3">
                    <h6>Shop</h6>
                    <a href="#">Standard cake</a><br>
                    <a href="#">Customize cake</a>
                </div>
                <div class="col-md-3 mb-3">
                    <h6>Rechtliches</h6>
                    <a href="#">Impressum</a><br>
                    <a href="#">Datenschutz</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped></style>
