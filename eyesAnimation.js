const eyes = document.querySelectorAll(".left-eye");

window.addEventListener("mousemove", (e) => {
  eyes.forEach((eye) => {
    const rect = eye.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(20, Math.hypot(dx, dy));

    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    const pupil = eye.querySelector(".pupille");
    pupil.style.transform = `translate(${offsetX - 50}%, ${offsetY - 50}%)`;
  });
});