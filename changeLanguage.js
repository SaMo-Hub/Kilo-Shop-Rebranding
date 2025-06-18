const supportedLangs = ["fr", "en", "de", "nl"];
const defaultLang = "fr";

// Toutes les clés sont en minuscule
const countryToLang = {
  france: "fr",
  belgique: "nl",
  allemagne: "de",
  belgië:'nl',
  duitsland:'de',
  belgien:'nl',
deutschland:'de',
belgium:'nl',
germany:'de'
};

const langToDisplayName = {
  fr: "Francais",
  en: "Anglais",
  de: "Allemand",
  nl: "Nederlands",
};

async function loadLang(lang) {
  console.log(lang);

  if (!supportedLangs.includes(lang)) lang = defaultLang;

  try {
    const response = await fetch(`./locales/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
  
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Met à jour aussi le texte affiché dans le bouton langue
  } catch (e) {
    console.error(`Erreur lors du chargement de la langue ${lang}:`, e);
  }
}



document.addEventListener("DOMContentLoaded", () => {
  // Récupère pays et langue stockés
  let storedLang = localStorage.getItem("lang");
  let storedCountry = localStorage.getItem("country");

  // Si aucune langue n’est stockée, on utilise celle du pays ou celle par défaut
  console.log(storedLang);
  if (!storedLang) {
    const countryLang =
      countryToLang[(storedCountry || "France").toLowerCase()] || defaultLang;
    storedLang = countryLang;
    localStorage.setItem("lang", storedLang);
  }

  loadLang(storedLang);

  // --- Gestion clic sur pays ---
  document.querySelectorAll(".pays-list .item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const countryName = btn.textContent.trim();

      // Trouve la langue correspondant au pays
      console.log(btn.textContent.trim(),'true');
      const newLang = countryToLang[countryName.toLowerCase()] || defaultLang;
      console.log(newLang,false);
      
      // Stocke le pays et la langue
      localStorage.setItem("country", countryName);
      localStorage.setItem("lang", newLang);

      // Charge la langue
      loadLang(newLang);
      document.querySelector(".div-langue").classList.remove("pays");
      newLang !== "fr" &&
        document.querySelector(".div-langue").classList.add("pays");
      document.querySelectorAll(".pays-list .item").forEach((item) => {
        item.classList.remove("active");
      });
      btn.classList.add("active");

      // Fermer la liste pays
      document.querySelector(".pays-list").classList.remove("active");
      document.querySelector(".toggle-pays").classList.remove("open");
    });
  });

  // --- Gestion clic sur langue (bouton langue) ---
  document.querySelectorAll(".langue-list .item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const clickedLangName = btn.textContent.trim();

      // Trouver la langue associée au texte affiché (ex : "Francais" => "fr")
      let newLang = defaultLang;
      for (const [code, name] of Object.entries(langToDisplayName)) {
        if (name.toLowerCase() === clickedLangName.toLowerCase()) {
          newLang = code;
          break;
        }
      }

      // Stocke la langue mais PAS le pays
      localStorage.setItem("lang", newLang);

      loadLang(newLang);

      btn.classList.add("active");
      // Fermer la liste langue
      document.querySelector(".langue-list").classList.remove("active");
      document.querySelector(".toggle-langue").classList.remove("open");
    });
  });

  // --- Toggle dropdown menus ---
  document
    .querySelector(".toggle-langue")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      document.querySelector(".langue-list").classList.toggle("active");
      document.querySelector(".toggle-langue").classList.toggle("open");
    });
  document
    .querySelector(".toggle-pays")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      document.querySelector(".pays-list").classList.toggle("active");
      document.querySelector(".toggle-pays").classList.toggle("open");
    });

  document.addEventListener("click", function () {
    document.querySelector(".langue-list").classList.remove("active");
    document.querySelector(".pays-list").classList.remove("active");
    document.querySelector(".toggle-langue").classList.remove("open");
    document.querySelector(".toggle-pays").classList.remove("open");
  });
});

function toggleMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const overlay = document.querySelector(".overlay");
  const navbar = document.querySelector(".navbarSelect");
  toggle.classList.toggle("menu-open");
  overlay.classList.toggle("open");
  navbar.classList.toggle("open");
}
