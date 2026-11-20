import * as tutorModel from "../models/tutorModel.js";
import { Erro } from "../utils/erro.js";

export function listarTutores() {
  return tutorModel.listarTodos();
}

export function buscarTutor(id) {
  const tutor = tutorModel.buscarPorId(id);

  if (!tutor) {
    throw new Erro("Tutor não encontrado", 404);
  }

  return tutor;
}

export function cadastrarTutor(dados) {
  if (!dados.nome || !dados.telefone || !dados.email) {
    throw new Erro("Nome, telefone e e-mail são obrigatórios", 400);
  }

  const emailExistente = tutorModel.buscarPorEmail(dados.email);

  if (emailExistente) {
    throw new Erro("E-mail já cadastrado", 409);
  }

  return tutorModel.criar({
    nome: dados.nome,
    telefone: dados.telefone,
    email: dados.email,
  });
}

export function atualizarTutor(id, dados) {
  buscarTutor(id);

  if (dados.email) {
    const emailExistente = tutorModel.buscarPorEmail(dados.email);

    if (emailExistente && emailExistente.id !== id) {
      throw new Erro("E-mail já cadastrado por outro tutor", 409);
    }
  }

  return tutorModel.atualizar(id, dados);
}

export function excluirTutor(id) {
  buscarTutor(id);
  tutorModel.remover(id);
}