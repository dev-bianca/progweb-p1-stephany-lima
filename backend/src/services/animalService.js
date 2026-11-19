import * as animalModel from "../models/animalModel.js";
import * as tutorModel from "../models/tutorModel.js";
import { Erro } from "../utils/erro.js";

export function listarAnimais(tutorId) {
  const animais = animalModel.listarTodos();

  if (tutorId) {
    return animais.filter((animal) => animal.tutorId === tutorId);
  }

  return animais;
}

export function buscarAnimal(id) {
  const animal = animalModel.buscarPorId(id);

  if (!animal) {
    throw new Erro("Animal não encontrado", 404);
  }

  return animal;
}

export function cadastrarAnimal(dados) {
  if (!dados.nome || !dados.especie || !dados.tutorId) {
    throw new Erro("Nome, espécie e tutorId são obrigatórios", 400);
  }

  const tutor = tutorModel.buscarPorId(Number(dados.tutorId));

  if (!tutor) {
    throw new Erro("O tutor informado não existe", 422);
  }

  return animalModel.criar({
    nome: dados.nome,
    especie: dados.especie,
    raca: dados.raca || "",
    dataNascimento: dados.dataNascimento || "",
    tutorId: Number(dados.tutorId),
  });
}

export function atualizarAnimal(id, dados) {
  buscarAnimal(id);

  if (dados.tutorId !== undefined) {
    const tutor = tutorModel.buscarPorId(Number(dados.tutorId));

    if (!tutor) {
      throw new Erro("O tutor informado não existe", 422);
    }

    dados.tutorId = Number(dados.tutorId);
  }

  return animalModel.atualizar(id, dados);
}

export function excluirAnimal(id) {
  buscarAnimal(id);
  animalModel.remover(id);
}