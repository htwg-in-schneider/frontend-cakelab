<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Navbar />

  <main class="about">

    <!-- HERO -->
    <section class="hero page-container">
      <img
        src="/src/assets/images/Aboutus_bild.png"
        alt="CakeLab Team"
        class="hero-image"
      />

      <div class="hero-text">
        <h1>About CakeLab</h1>
        <p>
          CakeLab begann nicht als Unternehmen,
          sondern als gemeinsame Leidenschaft zweier Schwestern.
        </p>
      </div>
    </section>

    <!-- STORY BOX -->
    <section class="story-box page-container">
      <div class="story-content">
        <p>
          Was als gemeinsames Hobby in einer kleinen Küche begann,
          wurde schnell mehr: die Idee, Backwaren zu schaffen,
          die nicht nur gut schmecken, sondern echte Erinnerungen erzeugen.
        </p>

        <p>
          Für uns ist Backen mehr als ein Rezept.
          Es ist Zeit, Hingabe und Liebe zum Detail.
          Jedes Produkt entsteht frisch, von Hand
          und mit dem Anspruch, etwas Besonderes zu sein.
        </p>

        <p>
          Heute steht CakeLab für handgefertigte Kuchen,
          hochwertige Zutaten und ehrliches Handwerk –
          ohne Abkürzungen, ohne Kompromisse.
        </p>
      </div>
    </section>

    <!-- SPLIT SECTION -->
    <section class="split page-container">

      <!-- IMAGE -->
      <div class="split-media">
        <img
          src="/src/assets/images/Backen_aesthetic.png"
          alt="Backzutaten"
        />
      </div>

      <!-- TEXT -->
      <div class="split-box">
        <h2>Warum CakeLab?</h2>

        <p>
          Weil wir an Qualität glauben.
          Bei CakeLab bekommt jedes Produkt die Zeit
          und Aufmerksamkeit, die es verdient.
        </p>

        <p>
          Unsere Rezepte sind hausgemacht,
          unsere Designs individuell
          und unsere Arbeit geprägt von echter Leidenschaft.
        </p>

        <p class="emphasis">
          Keine Massenproduktion.<br />
          Keine Kompromisse.<br />
          Nur ehrlicher Geschmack.
        </p>
      </div>

    </section>

  </main>

  <Footer />
</template>

<style scoped>

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}


.about {
  background: var(--white);
  color: var(--dark-gray);
}


.hero {
  padding: 48px 0 80px;
  text-align: center;
}

.hero-image {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 28px;
  margin-bottom: 36px;
}

.hero-text h1 {
  font-size: 34px;
  margin-bottom: 14px;
}

.hero-text p {
  font-size: 18px;
  color: var(--medium-gray);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

.story-box {
  background: var(--rose);
  margin: 0 auto 160px;
  border-radius: 32px;
}

.story-content {
  padding: 64px 32px;
  color: var(--white);
  font-size: 18px;
  line-height: 1.9;
}

.story-content p:not(:last-child) {
  margin-bottom: 28px;
}

.split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  margin-bottom: 180px;
}

.split-media {
  border-radius: 32px;
  overflow: hidden;
}

.split-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.split-box {
  background: var(--rose);
  border-radius: 32px;
  padding: 56px 40px;
  color: var(--white);

  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: 18px;
  line-height: 1.8;
}

.split-box h2 {
  font-size: 30px;
  margin-bottom: 22px;
}

.split-box p:not(:last-child) {
  margin-bottom: 20px;
}

.emphasis {
  font-weight: 600;
  letter-spacing: 0.4px;
}


@media (min-width: 900px) {
  .hero {
    padding: 80px 0 120px;
  }

  .hero-text h1 {
    font-size: 46px;
  }

  .split {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: stretch;
  }

  .split-media,
  .split-box {
    min-height: 460px;
  }
}
</style>
