const caixa = document.querySelector('#aviso');

function mostrar(tipo, texto) {
  caixa.className = `alert alert-${tipo}`;
  caixa.textContent = texto;
}

export const aviso = {
  sucesso: (texto) => mostrar('success', texto),

  erro: (texto) => mostrar('danger', texto),

  limpar: () => {
    caixa.className = 'alert d-none';
    caixa.textContent = '';
  },
};