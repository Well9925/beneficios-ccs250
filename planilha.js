function mostrarErro(mensagem) {
  console.error(mensagem);
  const container = document.getElementById('benefits-container');
  if (container) {
    const errorEl = document.createElement('p');
    errorEl.textContent = mensagem;
    container.appendChild(errorEl);
  }
}

async function carregarBeneficios() {
main
      mostrarErro('Não foi possível carregar os benefícios.');
      return;
    }

    const text = await response.text();
    let json;
    try {
 main
    const rows = json.table.rows;

    const container = document.getElementById('benefits-container');
    const ctaCard = document.getElementById('cta-card');

    if (!container || !ctaCard) {
      mostrarErro('Elementos necessários não encontrados.');
      return;
    }

    const fragment = document.createDocumentFragment();

    rows.forEach(row => {
      const cells = row.c;
      const titulo = cells[0]?.v || '';
      const subtitulo = cells[1]?.v || '';
      const descricao = cells[2]?.v || '';
      const link = cells[3]?.v || '';

      const card = document.createElement('div');
      card.className = 'benefit-card';

      const titleEl = document.createElement('div');
      titleEl.className = 'benefit-title';
      titleEl.textContent = titulo;
      card.appendChild(titleEl);

      const subtitleEl = document.createElement('div');
      subtitleEl.className = 'benefit-subtitle';
      subtitleEl.textContent = subtitulo;
      card.appendChild(subtitleEl);

      const descEl = document.createElement('p');
      descEl.textContent = descricao;
      card.appendChild(descEl);

      if (link) {
        const linkEl = document.createElement('a');
        linkEl.className = 'app-link';
        linkEl.href = link;
        linkEl.target = '_blank';
        linkEl.setAttribute('aria-label', 'Acessar');
        linkEl.textContent = 'Acessar';
        card.appendChild(linkEl);
      }

      fragment.appendChild(card);
    });

    container.insertBefore(fragment, ctaCard);
  } catch (err) {
 main
    mostrarErro('Não foi possível carregar os benefícios.');
  }
}

document.addEventListener('DOMContentLoaded', carregarBeneficios);

if (typeof module !== 'undefined') {
  module.exports = { carregarBeneficios };
}
