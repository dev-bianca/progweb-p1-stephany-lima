import db from "../db.js";

export function listarTodos() {
  return db.prepare("SELECT * FROM clientes").all();
}

export function buscarPorId(id) {
  return db.prepare("SELECT * FROM clientes WHERE id = ?").get(id);
}

export function buscarPorCpf(cpf) {
  return db.prepare("SELECT * FROM clientes WHERE cpf = ?").get(cpf);
}

export function criar(dados) {
  const resultado = db
    .prepare("INSERT INTO clientes (nome, cpf) VALUES (?, ?)")
    .run(dados.nome, dados.cpf);

  return buscarPorId(Number(resultado.lastInsertRowid));
}

export function atualizar(id, dados) {
  const clienteAtual = buscarPorId(id);

  if (!clienteAtual) {
    return null;
  }

  const nome = dados.nome ?? clienteAtual.nome;
  const cpf = dados.cpf ?? clienteAtual.cpf;

  db.prepare(
    "UPDATE clientes SET nome = ?, cpf = ? WHERE id = ?"
  ).run(nome, cpf, id);

  return buscarPorId(id);
}

export function remover(id) {
  const resultado = db
    .prepare("DELETE FROM clientes WHERE id = ?")
    .run(id);

  return resultado.changes > 0;
}
