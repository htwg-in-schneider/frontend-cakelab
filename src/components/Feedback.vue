<template>
    <section class="feedback-section text-center">
        <div class="container narrow-box">
            <h2 class="fw-bold mb-4">Feedback</h2>
            <div class="row g-4 justify-content-center">
                <div class="col-md-3 col-sm-6">
                    <div class="card p-3 h-100">
                        <p>Ich habe schon zum dritten Mal bestellt, jede Torte war perfekt! Frisch, lecker und super
                            liebevoll verpackt.</p>
                        <div class="d-flex align-items-center justify-content-center mt-auto">
                            <img src="/src/assets/images/Benutzer1.png" class="rounded-circle me-2" alt="Benutzer1"
                                height="50">
                            <strong>Lara</strong>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="card p-3 h-100">
                        <p>Einfach wow! Mein personalisierter Geburtstagskuchen sah toll aus und kam super bei allen
                            Gästen an.</p>
                        <div class="d-flex align-items-center justify-content-center mt-auto">
                            <img src="/src/assets/images/Benutzer3.png" class="rounded-circle me-2" alt="Benutzer3"
                                height="50">
                            <strong>Nina</strong>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="card p-3 h-100">
                        <p>Tolle Idee, den Text selbst zu gestalten, so konnte ich ein richtig persönliches Geschenk
                            machen. Gerne wieder!</p>
                        <div class="d-flex align-items-center justify-content-center mt-auto">
                            <img src="/src/assets/images/Benutzer2.png" class="rounded-circle me-2" alt="Benutzer2"
                                height="50">
                            <strong>Ben</strong>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="card p-3 h-100">
                        <p>Die Qualität ist einfach top. Sah nicht nur toll aus, sondern schmeckte auch himmlisch!
                            Lieferung war super schnell.</p>
                        <div class="d-flex align-items-center justify-content-center mt-auto">
                            <img src="/src/assets/images/Benutzer4.png" class="rounded-circle me-2" alt="Benutzer4"
                                height="50">
                            <strong>Jonas</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

/* Feedback */
.feedback-section {
    background-color: var(--rose);
    padding: 3rem 1rem;
    border-radius: 1rem;
    margin: 2rem auto;
    max-width: 95%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
}

/* Überschrift weiß */
.feedback-section h2 {
    color: var(--white);
}

.feedback-section .card {
    border: none;
    border-radius: 0.8rem;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>