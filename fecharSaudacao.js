function fecharSaudacao() {
  document.getElementById('welcome-banner').style.display = 'none';
}

if (typeof module !== 'undefined') {
  module.exports = { fecharSaudacao };
}
