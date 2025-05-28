// scripts/main.js

function gerarOrdens() {
  const container = document.getElementById("formularioOrdens");
  const num = parseInt(document.getElementById("numOrdens").value);

  const dadosAntigos = [];
  for (let i = 0; i < container.children.length; i++) {
    const preco = parseFloat(document.getElementById("preco" + i)?.value) || "";
    const lote = parseFloat(document.getElementById("lote" + i)?.value) || "";
    dadosAntigos.push({ preco, lote });
  }

  container.innerHTML = "";
  for (let i = 0; i < num; i++) {
    const precoVal = dadosAntigos[i]?.preco ?? "";
    const loteVal = dadosAntigos[i]?.lote ?? "";

    const div = document.createElement("div");
    div.className = "row g-2 align-items-center mb-2";
    div.innerHTML = `
      <div class="col-12 fw-bold">Ordem ${i + 1}</div>
      <div class="col-md-6">
        <input type="number" step="0.01" id="preco${i}" class="form-control" placeholder="Preço Entrada" value="${precoVal}">
      </div>
      <div class="col-md-6">
        <input type="number" step="0.01" id="lote${i}" class="form-control" placeholder="Lote" value="${loteVal}">
      </div>
    `;
    container.appendChild(div);
  }
  atualizarPainelResumo();
}

function calcularPrecoSaida() {
  const tipo = document.getElementById("tipoOperacao").value;
  const num = parseInt(document.getElementById("numOrdens").value);
  const spread = parseFloat(document.getElementById("spreadPontos").value) * 0.01;
  const lucroDesejado = parseFloat(document.getElementById("lucroDesejado").value);

  let somaLotes = 0;
  let somaPrecoLote = 0;

  for (let i = 0; i < num; i++) {
    const preco = parseFloat(document.getElementById("preco" + i).value);
    const lote = parseFloat(document.getElementById("lote" + i).value);
    if (isNaN(preco) || isNaN(lote)) return alert("Preencha todos os campos.");
    somaLotes += lote;
    somaPrecoLote += preco * lote;
  }

  const precoMedio = somaPrecoLote / somaLotes;
  const ajusteLucro = lucroDesejado / (somaLotes * 100);
  const precoSaida = tipo === "buy"
    ? precoMedio + ajusteLucro + spread
    : precoMedio - ajusteLucro - spread;

  document.getElementById("resultadoSaida").innerHTML = `
    Preço médio: <strong>${precoMedio.toFixed(2)}</strong><br>
    Spread: <strong>${spread.toFixed(2)}</strong><br>
    Preço de saída: <strong>${precoSaida.toFixed(2)}</strong>
  `;
  atualizarPainelResumo();
}

function calcularLucroAtual() {
  const tipo = document.getElementById("tipoOperacao").value;
  const precoAtual = parseFloat(document.getElementById("precoAtual").value);
  const num = parseInt(document.getElementById("numOrdens").value);
  if (isNaN(precoAtual)) return alert("Informe o preço atual.");

  let lucroTotal = 0;
  for (let i = 0; i < num; i++) {
    const preco = parseFloat(document.getElementById("preco" + i).value);
    const lote = parseFloat(document.getElementById("lote" + i).value);
    if (isNaN(preco) || isNaN(lote)) return alert("Preencha todos os campos.");
    lucroTotal += tipo === "buy"
      ? (precoAtual - preco) * lote * 100
      : (preco - precoAtual) * lote * 100;
  }

  document.getElementById("resultadoLucro").innerHTML = `Lucro/Prejuízo atual: <strong>US$ ${lucroTotal.toFixed(2)}</strong>`;
  atualizarPainelResumo();
}

function resetarFormulario() {
  document.getElementById("numOrdens").value = 1;
  document.getElementById("formularioOrdens").innerHTML = "";
  document.getElementById("lucroDesejado").value = 1000;
  document.getElementById("spreadPontos").value = 16;
  document.getElementById("precoAtual").value = "";
  document.getElementById("resultadoSaida").innerHTML = "";
  document.getElementById("resultadoLucro").innerHTML = "";
  gerarOrdens();
}

function atualizarPainelResumo() {
  const tipo = document.getElementById("tipoOperacao").value;
  const num = parseInt(document.getElementById("numOrdens").value);
  let totalLote = 0;
  let somaPrecoLote = 0;

  for (let i = 0; i < num; i++) {
    const preco = parseFloat(document.getElementById("preco" + i).value);
    const lote = parseFloat(document.getElementById("lote" + i).value);
    if (!isNaN(preco) && !isNaN(lote)) {
      totalLote += lote;
      somaPrecoLote += preco * lote;
    }
  }

  const precoMedio = totalLote ? (somaPrecoLote / totalLote).toFixed(2) : "-";

  document.getElementById("painelResumo").innerHTML = `
    <div class="alert alert-info">
      <strong>Resumo:</strong><br>
      Tipo de operação: <strong>${tipo.toUpperCase()}</strong><br>
      Ordens: <strong>${num}</strong> | Lote Total: <strong>${totalLote.toFixed(2)}</strong><br>
      Preço Médio: <strong>${precoMedio}</strong>
    </div>
  `;
}

function salvarSimulacao() {
  alert("Funcionalidade de salvar simulação ainda será implementada.");
}
