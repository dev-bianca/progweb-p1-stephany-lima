import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("banco.db");

db.exec("PRAGMA foreign_keys = ON");

// Tabela de clientes
db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    email TEXT
  )
`);

// Tabela de contas
db.exec(`
  CREATE TABLE IF NOT EXISTS contas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL CHECK (tipo IN ('corrente', 'poupanca')),
    saldo REAL NOT NULL,
    cliente_id INTEGER NOT NULL,
    criada_em TEXT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
  )
`);

export default db;