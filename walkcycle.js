const mascotte = document.getElementById("mascotte");
const emportezSection = document.querySelector(".section.emportez");

let lastExecution = 0;
const throttleDelay = 120; // ms

window.addEventListener("scroll", () => {
  const now = Date.now();
  if (now - lastExecution < throttleDelay) return;
  lastExecution = now;

  const sectionRect = emportezSection.getBoundingClientRect();
  const mascotteRect = mascotte.getBoundingClientRect();

  const isVisible =
    mascotteRect.top < window.innerHeight && mascotteRect.bottom > 0;

  if (isVisible) {
    const scrollTop = window.scrollY;
    const containerWidth = window.innerWidth - mascotte.offsetWidth;

    const sectionScroll = Math.min(
      Math.max(
        0,
        (window.innerHeight - mascotteRect.top) /
          (window.innerHeight + sectionRect.height)
      ),
      1
    );
    console.log(sectionScroll);

    const startOffset = -300; // commence plus à gauche (négatif)
    const endOffset = containerWidth * 1.5; // ajuste si besoin pour l'arrivée
    const translateX = startOffset + sectionScroll * (endOffset - startOffset);

    mascotte.style.transform = `translateX(${translateX*1}px)`;

    const frame = (Math.floor(scrollTop / 20) % 4) + 1;
    mascotte.src = `./walk-cycle/frame-${frame}.svg`;
  } else {
    mascotte.style.transform = `translateX(0)`;
    mascotte.src = "./walk-cycle/frame-1.svg";
  }
});
