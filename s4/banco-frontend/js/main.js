import { criarStore } from './state/store.js';
import { clienteService } from './services/clienteService.js';
import { clienteView } from './ui/clienteView.js';
import { aviso } from './ui/aviso.js';

// Estado inicial da aplicação.
const clientes = criarStore({
  status: 'carregando',
  clientes: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

// Sempre que o estado mudar, a interface será atualizada.
clientes.assinar(clienteView.render);

// Busca os clientes na API.
async function carregarClientes() {
  clientes.set({ status: 'carregando', erro: null });

  try {
    const lista = await clienteService.listar();

    clientes.set({
      status: lista.length ? 'sucesso' : 'vazio',
      clientes: lista,
    });
  } catch (e) {
    clientes.set({
      status: 'erro',
      erro: e.message,
    });
  }
}

// Cadastra um cliente ou salva uma edição.
async function salvarCliente(dados) {
  const { editandoId } = clientes.get();

  aviso.limpar();
  clientes.set({ salvando: true });

  try {
    if (editandoId) {
      await clienteService.atualizar(editandoId, dados);
    } else {
      await clienteService.criar(dados);
    }

    aviso.sucesso(
      editandoId ? 'Cliente atualizado.' : 'Cliente cadastrado.'
    );

    clienteView.limparForm();
    clientes.set({ editandoId: null });

    await carregarClientes();
  } catch (e) {
    aviso.erro(e.message);
  } finally {
    clientes.set({ salvando: false });
  }
}

// Inicia a edição de um cliente.
function editarCliente(id) {
  const cliente = clientes.get().clientes.find(
    (c) => c.id === id
  );

  if (!cliente) return;

  clienteView.preencherForm(cliente);
  clientes.set({ editandoId: id });
}

// Cancela a edição.
function cancelarEdicaoCliente() {
  clienteView.limparForm();
  clientes.set({ editandoId: null });
}

// Remove um cliente após confirmação.
async function removerCliente(id) {
  if (!confirm(`Remover o cliente #${id}?`)) return;

  aviso.limpar();

  try {
    await clienteService.remover(id);
    aviso.sucesso('Cliente removido.');

    if (clientes.get().editandoId === id) {
      cancelarEdicaoCliente();
    }

    await carregarClientes();
  } catch (e) {
    aviso.erro(e.message);
  }
}

// Conecta os eventos da interface às funções da aplicação.
clienteView.aoEnviar(salvarCliente);
clienteView.aoCancelar(cancelarEdicaoCliente);
clienteView.aoRecarregar(carregarClientes);

clienteView.aoClicarNaLista({
  editar: editarCliente,
  remover: removerCliente,
});

// Carrega os clientes quando a aplicação inicia.
carregarClientes();