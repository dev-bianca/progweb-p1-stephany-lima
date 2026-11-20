
import * as clienteService from "../services/clienteService.js";

export function listar(req, res) {
  const clientes = clienteService.listarClientes();
  res.json(clientes);
}

export function buscar(req, res) {
  const id = Number(req.params.id);
  const cliente = clienteService.buscarCliente(id);
  res.json(cliente);
}

export function cadastrar(req, res) {
  const novoCliente = clienteService.cadastrarCliente(req.body);
  res.status(201).json(novoCliente);
}

export function atualizar(req, res) {
  const id = Number(req.params.id);
  const clienteAtualizado = clienteService.atualizarCliente(id, req.body);
  res.json(clienteAtualizado);
}

export function excluir(req, res) {
  const id = Number(req.params.id);
  clienteService.excluirCliente(id);
  res.status(204).send();
}
