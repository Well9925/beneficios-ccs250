const { fecharSaudacao } = require('./fecharSaudacao');

describe('fecharSaudacao', () => {
  test('esconde o banner de boas-vindas', () => {
    document.body.innerHTML = '<div id="welcome-banner" style="display: block;"></div>';
    fecharSaudacao();
    const banner = document.getElementById('welcome-banner');
    expect(banner.style.display).toBe('none');
  });
});
