import db from "../db.js";

export function listarTodos() {
  return db.prepare("SELECT * FROM animais").all();
}

export function buscarPorId(id) {
  return db.prepare("SELECT * FROM animais WHERE id = ?").get(id);
}

export function buscarPorNome(nome) {
  return db.prepare("SELECT * FROM animais WHERE nome = ?").get(nome);
}

export function criar(dados) {
  const resultado = db
    .prepare(`
      INSERT INTO animais (nome, especie, raca, dataNascimento, tutorId)
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(
      dados.nome,
      dados.especie,
      dados.raca,
      dados.dataNascimento,
      dados.tutorId
    );

  return buscarPorId(Number(resultado.lastInsertRowid));
}

export function atualizar(id, dados) {
  const animalAtual = buscarPorId(id);

  if (!animalAtual) {
    return null;
  }

  const nome = dados.nome ?? animalAtual.nome;
  const especie = dados.especie ?? animalAtual.especie;
  const raca = dados.raca ?? animalAtual.raca;
  const dataNascimento = dados.dataNascimento ?? animalAtual.dataNascimento;
  const tutorId = dados.tutorId ?? animalAtual.tutorId;

  db.prepare(`
    UPDATE animais
    SET nome = ?, especie = ?, raca = ?, dataNascimento = ?, tutorId = ?
    WHERE id = ?
  `).run(nome, especie, raca, dataNascimento, tutorId, id);

  return buscarPorId(id);
}

export function remover(id) {
  const resultado = db
    .prepare("DELETE FROM animais WHERE id = ?")
    .run(id);

  return resultado.changes > 0;
}