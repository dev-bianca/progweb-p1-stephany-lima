const form = document.querySelector('#form-cliente');
const campoNome = document.querySelector('#cli-nome');
const campoCpf = document.querySelector('#cli-cpf');
const campoEmail = document.querySelector('#cli-email');

const botaoSalvar = document.querySelector('#cli-salvar');
const botaoCancelar = document.querySelector('#cli-cancelar');

const carregando = document.querySelector('#clientes-carregando');
const erro = document.querySelector('#clientes-erro');
const erroMsg = document.querySelector('#clientes-erro-msg');
const vazio = document.querySelector('#clientes-vazio');
const sucesso = document.querySelector('#clientes-sucesso');
const linhas = document.querySelector('#clientes-linhas');
const botaoRecarregar = document.querySelector('#clientes-recarregar');

function esconderEstados() {
  carregando.classList.add('d-none');
  erro.classList.add('d-none');
  vazio.classList.add('d-none');
  sucesso.classList.add('d-none');
}

function render(estado) {
  esconderEstados();

  if (estado.status === 'carregando') {
    carregando.classList.remove('d-none');
  }

  if (estado.status === 'erro') {
    erro.classList.remove('d-none');
    erroMsg.textContent = estado.erro;
  }

  if (estado.status === 'vazio') {
    vazio.classList.remove('d-none');
  }

  if (estado.status === 'sucesso') {
    sucesso.classList.remove('d-none');
    linhas.replaceChildren();

    estado.clientes.forEach((cliente) => {
      const tr = document.createElement('tr');

      if (String(cliente.id) === String(estado.editandoId)) {
        tr.classList.add('editando');
      }

      const valores = [
        cliente.id,
        cliente.nome,
        cliente.cpf,
        cliente.email || '—',
      ];

      valores.forEach((valor) => {
        const td = document.createElement('td');
        td.textContent = valor;
        tr.appendChild(td);
      });

      const tdAcoes = document.createElement('td');
      tdAcoes.className = 'text-end';

      const botaoEditar = document.createElement('button');
      botaoEditar.type = 'button';
      botaoEditar.className = 'btn btn-sm btn-outline-primary me-2';
      botaoEditar.textContent = 'Editar';
      botaoEditar.dataset.acao = 'editar';
      botaoEditar.dataset.id = cliente.id;

      const botaoRemover = document.createElement('button');
      botaoRemover.type = 'button';
      botaoRemover.className = 'btn btn-sm btn-outline-danger';
      botaoRemover.textContent = 'Remover';
      botaoRemover.dataset.acao = 'remover';
      botaoRemover.dataset.id = cliente.id;

      tdAcoes.append(botaoEditar, botaoRemover);
      tr.appendChild(tdAcoes);
      linhas.appendChild(tr);
    });
  }

  botaoSalvar.disabled = estado.salvando;
  botaoSalvar.textContent = estado.salvando
    ? 'Salvando...'
    : estado.editandoId
      ? 'Salvar alterações'
      : 'Cadastrar cliente';

  botaoCancelar.classList.toggle('d-none', !estado.editandoId);
}

function limparForm() {
  form.reset();
}

function preencherForm(cliente) {
  campoNome.value = cliente.nome;
  campoCpf.value = cliente.cpf;
  campoEmail.value = cliente.email || '';
}

function aoEnviar(callback) {
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    callback({
      nome: campoNome.value,
      cpf: campoCpf.value,
      email: campoEmail.value,
    });
  });
}

function aoCancelar(callback) {
  botaoCancelar.addEventListener('click', callback);
}

function aoRecarregar(callback) {
  botaoRecarregar.addEventListener('click', callback);
}

function aoClicarNaLista(callbacks) {
  linhas.addEventListener('click', (evento) => {
    const botao = evento.target.closest('button[data-acao]');

    if (!botao) return;

    const id = Number(botao.dataset.id);

    if (botao.dataset.acao === 'editar') {
      callbacks.editar(id);
    }

    if (botao.dataset.acao === 'remover') {
      callbacks.remover(id);
    }
  });
}

export const clienteView = {
  render,
  limparForm,
  preencherForm,
  aoEnviar,
  aoCancelar,
  aoRecarregar,
  aoClicarNaLista,
};