<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar />

  <section class="datenschutz-section container py-5 page-content">
    <h1 class="fw-bold mb-4">Datenschutzerklärung</h1>

    <div class="datenschutz-card shadow-sm p-4 mb-5">

      <h4 class="fw-bold mb-3">1. Allgemeine Hinweise</h4>
      <p>
        Der Schutz Ihrer persönlichen Daten ist uns sehr wichtig. 
        Wir behandeln Ihre personenbezogenen Daten vertraulich 
        und entsprechend der gesetzlichen Datenschutzvorschriften 
        sowie dieser Datenschutzerklärung.
      </p>

      <h4 class="fw-bold mt-4 mb-3">2. Verantwortliche Stelle</h4>
      <p>
        CakeLab GmbH<br />
        Musterstraße 12<br />
        12345 Musterstadt<br />
        Deutschland<br />
        E-Mail: info@cakelab.de
      </p>

      <h4 class="fw-bold mt-4 mb-3">3. Erhebung und Speicherung personenbezogener Daten</h4>
      <p>
        Wir erheben personenbezogene Daten nur, wenn Sie uns diese 
        im Rahmen einer Bestellung, Registrierung oder Kontaktanfrage 
        freiwillig mitteilen.
      </p>

      <h4 class="fw-bold mt-4 mb-3">4. Cookies</h4>
      <p>
        Unsere Website verwendet Cookies, um die Nutzung für Sie zu erleichtern 
        und bestimmte Funktionen bereitzustellen. 
        Sie können das Speichern von Cookies in den Einstellungen Ihres Browsers deaktivieren.
      </p>

      <h4 class="fw-bold mt-4 mb-3">5. Server-Log-Dateien</h4>
      <p>
        Der Provider der Seiten erhebt und speichert automatisch Informationen 
        in sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. 
        Dies sind zum Beispiel Browsertyp, Betriebssystem, IP-Adresse, Uhrzeit der Anfrage.
      </p>

      <h4 class="fw-bold mt-4 mb-3">6. Kontaktformular</h4>
      <p>
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, 
        werden Ihre Angaben aus dem Formular zwecks Bearbeitung gespeichert. 
        Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
      </p>

      <h4 class="fw-bold mt-4 mb-3">7. Ihre Rechte</h4>
      <p>
        Sie haben jederzeit das Recht auf unentgeltliche Auskunft 
        über Ihre gespeicherten personenbezogenen Daten, deren Herkunft 
        und Empfänger, den Zweck der Datenverarbeitung sowie 
        ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
      </p>

      <h4 class="fw-bold mt-4 mb-3">8. Änderung dieser Datenschutzbestimmungen</h4>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, 
        damit sie stets den aktuellen rechtlichen Anforderungen entspricht.
      </p>
    </div>
  </section>

  <Footer />
</template>

<style scoped>
.datenschutz-section {
  color: var(--dark-gray);
}

.datenschutz-card {
  background-color: var(--light-gray);
  border-radius: 12px;
}

.page-content {
  /* Sticky-Footer Fix */
  min-height: calc(100vh - 350px);
}

h1 {
  color: var(--zweitfarbe);
}

h4 {
  color: var(--zweitfarbe);
}

p {
  line-height: 1.6;
  font-size: 1.05rem;
}

/* Responsive */
@media (max-width: 768px) {
  .datenschutz-card {
    padding: 1.5rem;
  }
}
</style>
