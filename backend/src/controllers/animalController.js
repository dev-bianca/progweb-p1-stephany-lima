import * as animalService from "../services/animalService.js";

export function listar(req, res) {
  const tutorId = req.query.tutorId
    ? Number(req.query.tutorId)
    : undefined;

  const animais = animalService.listarAnimais(tutorId);
  res.json(animais);
}

export function buscar(req, res) {
  const id = Number(req.params.id);
  const animal = animalService.buscarAnimal(id);
  res.json(animal);
}

export function cadastrar(req, res) {
  const novoAnimal = animalService.cadastrarAnimal(req.body);
  res.status(201).json(novoAnimal);
}

export function atualizar(req, res) {
  const id = Number(req.params.id);
  const animalAtualizado = animalService.atualizarAnimal(id, req.body);
  res.json(animalAtualizado);
}

export function excluir(req, res) {
  const id = Number(req.params.id);
  animalService.excluirAnimal(id);
  res.status(204).send();
}