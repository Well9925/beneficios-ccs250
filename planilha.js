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
  const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS9cGzpZYt-H-69LaYJrIWBiQAGiZwbazp5zTEtA81ljhu0Gp63JjrtcixMs7D6ulWhkd8PvdskyQ_b/gviz/tq?tqx=out:json';
  try {
    const response = await fetch(spreadsheetUrl);
    if (!response.ok) {
      const error = new Error(response.statusText);
      console.error(`Erro ao buscar ${spreadsheetUrl}. Status: ${response.status}, Mensagem: ${error.message}`);
      mostrarErro('Não foi possível carregar os benefícios.');
      return;
    }

    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
    } catch (err) {
      console.error('Falha ao analisar JSON da planilha. Resposta original:', text, 'Erro:', err.message);
      mostrarErro('Não foi possível carregar os benefícios.');
      return;
    }
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
    console.error(`Erro ao buscar ${spreadsheetUrl}. Mensagem: ${err.message}`);
    mostrarErro('Não foi possível carregar os benefícios.');
  }
}

document.addEventListener('DOMContentLoaded', carregarBeneficios);

if (typeof module !== 'undefined') {
  module.exports = { carregarBeneficios };
}
