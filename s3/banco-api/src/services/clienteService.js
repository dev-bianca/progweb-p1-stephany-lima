
import * as clienteModel from "../models/clienteModel.js";
import { Erro } from "../utils/erro.js";

export function listarClientes() {
  return clienteModel.listarTodos();
}

export function buscarCliente(id) {
  const cliente = clienteModel.buscarPorId(id);

  if (!cliente) {
    throw new Erro("Cliente não encontrado", 404);
  }

  return cliente;
}

export function cadastrarCliente(dados) {
  if (!dados.nome || !dados.cpf) {
    throw new Erro("Nome e CPF são obrigatórios", 400);
  }

  const clienteExistente = clienteModel.buscarPorCpf(dados.cpf);

  if (clienteExistente) {
    throw new Erro("CPF já cadastrado", 409);
  }

  return clienteModel.criar({
    nome: dados.nome,
    cpf: dados.cpf,
  });
}

export function atualizarCliente(id, dados) {
  buscarCliente(id);

  if (dados.cpf) {
    const clienteComCpf = clienteModel.buscarPorCpf(dados.cpf);

    if (clienteComCpf && clienteComCpf.id !== id) {
      throw new Erro("CPF já cadastrado por outro cliente", 409);
    }
  }

  const clienteAtualizado = clienteModel.atualizar(id, dados);

  return clienteAtualizado;
}

export function excluirCliente(id) {
  buscarCliente(id);
  clienteModel.remover(id);
}
