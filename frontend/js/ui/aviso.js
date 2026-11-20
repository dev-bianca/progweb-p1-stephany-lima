export function mostrarAviso(mensagem, tipo = "info") {
  const area = document.getElementById("aviso");

  const alerta = document.createElement("div");
  alerta.className = `alert alert-${tipo}`;
  alerta.textContent = mensagem;

  area.replaceChildren(alerta);
}

export function limparAviso() {
  document.getElementById("aviso").replaceChildren();
}