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

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () =>
          Promise.resolve(`/**/google.visualization.Query.setResponse(${JSON.stringify(sampleData)});`)
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('insere cards com título, subtítulo, descrição e link opcional antes do CTA', async () => {
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
});

