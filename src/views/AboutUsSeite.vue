<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Navbar />
  <div class="about-page">
    <section class="hero-section">
      <div class="container">
        <div class="hero-text">
          <span class="badge">Unsere Geschichte</span>
          <h1>About CakeLab</h1>
          <p class="description">
            CakeLab begann nicht als Unternehmen, sondern als gemeinsame Leidenschaft zweier Schwestern.
            Was als gemeinsames Hobby in einer kleinen Küche begann, wurde schnell mehr: 
            die Idee, Backwaren zu schaffen, die nicht nur gut schmecken, sondern echte Erinnerungen erzeugen.
          </p>
        </div>
        <div class="hero-image-container">
          <img
            src="/src/assets/images/Aboutus_bild.png"
            alt="CakeLab Team"
            class="hero-image"
          />
        </div>
      </div>
    </section>

    <section class="philosophy-section">
      <div class="container">
        <div class="content-box">
          <h2>Mehr als ein Rezept</h2>
          <p>
            Für uns ist Backen mehr als ein Rezept. Es ist Zeit, Hingabe und Liebe zum Detail. 
            Jedes Produkt entsteht frisch, von Hand und mit dem Anspruch, etwas Besonderes zu sein.
          </p>
          <p class="focus-text">
            Heute steht CakeLab für handgefertigte Kuchen, hochwertige Zutaten und ehrliches Handwerk 
            – ohne Abkürzungen, ohne Kompromisse.
          </p>
        </div>
      </div>
    </section>

    <section class="why-us-section">
      <div class="container split-layout">
        <div class="split-media">
          <img
            src="/src/assets/images/Backen_aesthetic.png"
            alt="Backzutaten"
            class="side-image"
          />
        </div>
        <div class="split-text">
          <h2>Warum CakeLab?</h2>
          <p>Weil wir an Qualität glauben. Bei CakeLab bekommt jedes Produkt die Zeit und Aufmerksamkeit, die es verdient.</p>
          
          <div class="usp-grid">
            <div class="usp-item">
              <span class="dot"></span>
              <p>Hausgemachte Rezepte</p>
            </div>
            <div class="usp-item">
              <span class="dot"></span>
              <p>Individuelle Designs</p>
            </div>
            <div class="usp-item">
              <span class="dot"></span>
              <p>Echte Leidenschaft</p>
            </div>
          </div>

          <div class="manifesto-box">
            <p>Keine Massenproduktion.</p>
            <p>Keine Kompromisse.</p>
            <p class="highlight-pink">Nur ehrlicher Geschmack.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>

<style scoped>

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Section */
.hero-section {
  padding: 80px 0;
  text-align: center;
}

.badge {
  display: inline-block;
  background-color: var(--rosa);
  color: var(--zweitfarbe);
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 24px;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--black);
  margin-bottom: 24px;
  font-weight: 800;
}

.description {
  max-width: 750px;
  margin: 0 auto 60px;
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--medium-gray);
}

.hero-image {
  width: 100%;
  border-radius: 32px;
  object-fit: cover;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
}

/* Philosophy Section */
.philosophy-section {
  background-color: var(--light-gray);
  padding: 100px 0;
}

.content-box {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  font-size: 2.2rem;
  color: var(--zweitfarbe);
  margin-bottom: 24px;
}

.focus-text {
  margin-top: 24px;
  font-weight: 600;
  color: var(--dark-gray);
  font-size: 1.2rem;
}

/* Split Section (Why Us) */
.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  padding: 80px 0;
}

.side-image {
  width: 100%;
  border-radius: 24px;
}

.usp-grid {
  margin: 32px 0;
}

.usp-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-weight: 500;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: var(--rose);
  border-radius: 50%;
}

.manifesto-box {
  background-color: var(--white);
  border: 1px solid var(--rosa);
  padding: 30px;
  border-radius: 20px;
  margin-top: 40px;
}

.manifesto-box p {
  margin-bottom: 8px;
  font-weight: 700;
}

.highlight-pink {
  color: var(--zweitfarbe);
  font-size: 1.4rem;
  margin-top: 10px;
}

/* Mobile Adjustments */
@media (max-width: 850px) {
  .split-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .hero-section {
    padding: 40px 0;
  }
}
</style>