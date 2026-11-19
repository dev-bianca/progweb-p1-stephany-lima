
let clientes = [];
let proximoId = 1;

export function listarTodos() {
  return clientes;
}

export function buscarPorId(id) {
  return clientes.find((cliente) => cliente.id === id);
}

export function buscarPorCpf(cpf) {
  return clientes.find((cliente) => cliente.cpf === cpf);
}

export function criar(dados) {
  const novoCliente = {
    id: proximoId++,
    ...dados,
  };

  clientes.push(novoCliente);
  return novoCliente;
}

export function atualizar(id, dados) {
  const indice = clientes.findIndex((cliente) => cliente.id === id);

  if (indice === -1) {
    return null;
  }

  clientes[indice] = {
    ...clientes[indice],
    ...dados,
  };

  return clientes[indice];
}

export function remover(id) {
  const indice = clientes.findIndex((cliente) => cliente.id === id);

  if (indice === -1) {
    return false;
  }

  clientes.splice(indice, 1);
  return true;
}
