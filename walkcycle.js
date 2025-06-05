const mascotte = document.getElementById('mascotte');
const emportezSection = document.querySelector('.section.emportez');

window.addEventListener('scroll', () => {
  const sectionRect = emportezSection.getBoundingClientRect();
  const mascotteRect = mascotte.getBoundingClientRect();

  // Vérifie si la section emportez est dans le viewport
  const isVisible = mascotteRect.top < window.innerHeight && mascotteRect.bottom > 0;
   
    
  if (isVisible) {
    const scrollTop = window.scrollY;
    const containerWidth = window.innerWidth - mascotte.offsetWidth;

    // Pourcentage de scroll **dans** la section
    const sectionScroll = Math.min(Math.max(0, (window.innerHeight - mascotteRect.top) / (window.innerHeight + sectionRect.height)), 1);

    mascotte.style.transform = `translateX(${sectionScroll * containerWidth}px)`;

    // Animation des frames
    const frame = Math.floor(scrollTop / 20) % 4 + 1;
    mascotte.src = `./walk-cycle/frame-${frame}.svg`;
  } else {
    // Facultatif : reset si la section n’est plus visible
    mascotte.style.transform = `translateX(0)`;
    mascotte.src = './walk-cycle/frame-1.svg';
  }
});
