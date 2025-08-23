const { fecharSaudacao } = require('./fecharSaudacao');

describe('fecharSaudacao', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('esconde o banner de boas-vindas', () => {
    document.body.innerHTML = '<div id="welcome-banner" style="display: block;"></div>';
    fecharSaudacao();
    const banner = document.getElementById('welcome-banner');
    expect(banner.classList.contains('hidden')).toBe(true);
    banner.dispatchEvent(new Event('transitionend'));
    expect(banner.style.display).toBe('none');
  });

  test('não lança erro se o banner não existir', () => {
    expect(() => fecharSaudacao()).not.toThrow();
  });
});
