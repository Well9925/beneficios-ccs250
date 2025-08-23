<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Benefícios Ativados | CCS Telecom</title>

  <style>
    body { background:#0f0f0f; color:#fff; font-family:'Segoe UI',sans-serif; margin:0; }
    header { background:#111; padding:40px 20px; text-align:center; }
    .container { max-width:900px; margin:40px auto; padding:0 20px; }
    .benefit-card { background:rgba(255,255,255,0.05); padding:30px; border-radius:16px; margin-bottom:30px; }
    .benefit-title { font-size:22px; font-weight:bold; margin-bottom:10px; }
    .benefit-subtitle { font-size:16px; color:#ccc; margin-bottom:15px; }
    .app-link { display:inline-block; margin-top:10px; padding:10px 20px; background:#fff; color:#111; border-radius:6px; text-decoration:none; }
    footer { background:#111; text-align:center; padding:20px; margin-top:60px; }
  </style>
</head>
<body>

<header>
  <h1>🎉 Benefícios Nível 1</h1>
  <p>Confira tudo que você ganhou com seu plano de <strong>250MB</strong></p>
</header>

<div class="container" id="benefits-container">
  <div id="cta-card"></div>
</div>

<footer>
  © 2025 CCS Telecom — Todos os direitos reservados
</footer>

<script>
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
      mostrarErro("Erro ao carregar dados: " + response.status);
      return;
    }
    const text = await response.text();
    const json = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
    const rows = json.table.rows;
    const container = document.getElementById('benefits-container');
    const ctaCard = document.getElementById('cta-card');
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
      container.insertBefore(card, ctaCard);
    });
  } catch (err) {
    mostrarErro("Erro inesperado: " + err.message);
  }
}
document.addEventListener('DOMContentLoaded', carregarBeneficios);
</script>

</body>
</html>
