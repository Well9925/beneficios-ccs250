const { carregarBeneficios } = require('./planilha');

describe('carregarBeneficios', () => {
  const sampleData = {
    table: {
      rows: [
        { c: [
          { v: 'Título 1' },
          { v: 'Subtítulo 1' },
          { v: 'Descrição 1' },
          { v: 'https://exemplo.com' }
        ] },
        { c: [
          { v: 'Título 2' },
          { v: 'Subtítulo 2' },
          { v: 'Descrição 2' },
          null
        ] }
      ]
    }
  };

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="benefits-container">
        <div id="cta-card"></div>
      </div>
    `;

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
    console.error.mockRestore();
  });

  test('insere cards com título, subtítulo, descrição e link opcional antes do CTA', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () =>
          Promise.resolve(`/**/google.visualization.Query.setResponse(${JSON.stringify(sampleData)});`)
      })
    );

    await carregarBeneficios();

    const container = document.getElementById('benefits-container');
    const ctaCard = document.getElementById('cta-card');
    const children = Array.from(container.children);

    expect(children).toHaveLength(3);
    expect(children[2]).toBe(ctaCard);

    const primeiroCard = children[0];
    expect(primeiroCard.querySelector('.benefit-title').textContent).toBe('Título 1');
    expect(primeiroCard.querySelector('.benefit-subtitle').textContent).toBe('Subtítulo 1');
    expect(primeiroCard.querySelector('p').textContent).toBe('Descrição 1');
    const link = primeiroCard.querySelector('a.app-link');
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('https://exemplo.com');

    const segundoCard = children[1];
    expect(segundoCard.querySelector('.benefit-title').textContent).toBe('Título 2');
    expect(segundoCard.querySelector('.benefit-subtitle').textContent).toBe('Subtítulo 2');
    expect(segundoCard.querySelector('p').textContent).toBe('Descrição 2');
    expect(segundoCard.querySelector('a')).toBeNull();
  });

  test('loga detalhes quando fetch retorna status não OK', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 403
      })
    );

    await carregarBeneficios();

    expect(logSpy.mock.calls[0][0]).toContain('URL: https://');
    expect(logSpy.mock.calls[0][0]).toContain('status: 403');
    expect(logSpy.mock.calls[0][0]).toContain('mensagem: HTTP error: 403');

    logSpy.mockRestore();
  });

  test('loga string original quando JSON é inválido', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve('dados invalidos')
      })
    );

    await carregarBeneficios();

    expect(logSpy.mock.calls[0][0]).toContain('URL: https://');
    expect(logSpy.mock.calls[0][0]).toContain('status: 200');
    expect(logSpy.mock.calls[0][0]).toContain('mensagem:');
    expect(logSpy.mock.calls[1][0]).toBe('String recebida: dados invalidos');

    logSpy.mockRestore();
  });
});

