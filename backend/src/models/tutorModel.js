import db from "../db.js";

export function listarTodos() {
  return db.prepare("SELECT * FROM tutores").all();
}

export function buscarPorId(id) {
  return db.prepare("SELECT * FROM tutores WHERE id = ?").get(id);
}

export function buscarPorEmail(email) {
  return db.prepare("SELECT * FROM tutores WHERE email = ?").get(email);
}

export function criar(dados) {
  const resultado = db
    .prepare(
      "INSERT INTO tutores (nome, telefone, email) VALUES (?, ?, ?)"
    )
    .run(dados.nome, dados.telefone, dados.email);

  return buscarPorId(Number(resultado.lastInsertRowid));
}

export function atualizar(id, dados) {
  const tutorAtual = buscarPorId(id);

  if (!tutorAtual) {
    return null;
  }

  const nome = dados.nome ?? tutorAtual.nome;
  const telefone = dados.telefone ?? tutorAtual.telefone;
  const email = dados.email ?? tutorAtual.email;

  db.prepare(
    "UPDATE tutores SET nome = ?, telefone = ?, email = ? WHERE id = ?"
  ).run(nome, telefone, email, id);

  return buscarPorId(id);
}

export function remover(id) {
  const resultado = db
    .prepare("DELETE FROM tutores WHERE id = ?")
    .run(id);

  return resultado.changes > 0;
}