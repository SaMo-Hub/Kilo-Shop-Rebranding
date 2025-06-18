const lenis = new Lenis({
  autoRaf: true,
});
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}