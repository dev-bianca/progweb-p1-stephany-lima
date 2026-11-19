import * as tutorService from "../services/tutorService.js";

export function listar(req, res) {
  const tutores = tutorService.listarTutores();
  res.json(tutores);
}

export function buscar(req, res) {
  const id = Number(req.params.id);
  const tutor = tutorService.buscarTutor(id);
  res.json(tutor);
}

export function cadastrar(req, res) {
  const novoTutor = tutorService.cadastrarTutor(req.body);
  res.status(201).json(novoTutor);
}

export function atualizar(req, res) {
  const id = Number(req.params.id);
  const tutorAtualizado = tutorService.atualizarTutor(id, req.body);
  res.json(tutorAtualizado);
}

export function excluir(req, res) {
  const id = Number(req.params.id);
  tutorService.excluirTutor(id);
  res.status(204).send();
}