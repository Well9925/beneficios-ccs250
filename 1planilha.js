function mostrarErro(mensagem) {
  console.error(mensagem);
  const container = document.getElementById('benefits-container');
  if (container) {
    const erroEl = document.createElement('p');
    erroEl.textContent = mensagem;
    container.appendChild(erroEl);
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

    if (!container) {
      console.error('Elemento .container não encontrado no HTML.');
      return;
    }

    rows.forEach(row => {
      const titulo = row.c[0]?.v || "";
      const subtitulo = row.c[1]?.v || "";
      const descricao = row.c[2]?.v || "";
      const link = row.c[3]?.v || "#";

      const card = document.createElement("div");
      card.className = "benefit-card";
      card.innerHTML = `
        <div class="benefit-title">${titulo}</div>
        <div class="benefit-subtitle">${subtitulo}</div>
        <p>${descricao}</p>
        ${link && link !== "#" ? `<a href="${link}" target="_blank" class="app-link">Acessar</a>` : ""}
      `;

      if (ctaCard) {
        container.insertBefore(card, ctaCard);
      } else {
        container.appendChild(card);
      }
    });

  } catch (err) {
    console.error('Erro inesperado:', err.message);
    mostrarErro('Não foi possível carregar os benefícios.');
  }
}

// Executa automaticamente quando a página carregar
document.addEventListener('DOMContentLoaded', carregarBeneficios);
