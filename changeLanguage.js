
  const supportedLangs = ['fr', 'en'];
  const defaultLang = 'fr';

  async function loadLang(lang) {
    if (!supportedLangs.includes(lang)) lang = defaultLang;
    
    try {
      const response = await fetch(`./locales/${lang}.json`);
      const translations = await response.json();
      
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
    } catch (e) {
      console.error(`Erreur lors du chargement de la langue ${lang}:`, e);
    }
  }

  // Initialisation au chargement
  document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem('lang') || defaultLang;
    loadLang(storedLang);

    // Gestion du clic sur la sélection de langue
    document.querySelectorAll('.langue-list .item').forEach(btn => {
        
        btn.addEventListener('click', () => {
            console.log(btn.textContent);
const newLang = (btn.textContent === 'Francais' || btn.textContent === 'French') ? 'fr' : 'en';
        localStorage.setItem('lang', newLang);
        loadLang(newLang);
      });
    });
  });
