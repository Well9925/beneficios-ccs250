function fecharSaudacao() {
  const banner = document.getElementById('welcome-banner');
  if (banner) {
    banner.classList.add('hidden');
    banner.addEventListener('transitionend', () => {
      banner.style.display = 'none';
    }, { once: true });
  }
}

module.exports = { fecharSaudacao };
