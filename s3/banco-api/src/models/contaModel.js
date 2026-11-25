import db from "../db.js";

export function listarPorCliente(clienteId) {
  return db
    .prepare("SELECT * FROM contas WHERE cliente_id = ?")
    .all(clienteId);
}


export function existePorCliente(clienteId) {
  const resultado = db
    .prepare("SELECT id FROM contas WHERE cliente_id = ? LIMIT 1")
    .get(clienteId);

  return Boolean(resultado);
}