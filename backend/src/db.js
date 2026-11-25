import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("petshop.db");

db.exec("PRAGMA foreign_keys = ON");

// Tabela de tutores
db.exec(`
  CREATE TABLE IF NOT EXISTS tutores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );
`);

// Tabela de animais
db.exec(`
  CREATE TABLE IF NOT EXISTS animais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    especie TEXT NOT NULL,
    raca TEXT DEFAULT '',
    dataNascimento TEXT DEFAULT '',
    tutorId INTEGER NOT NULL,
    FOREIGN KEY (tutorId) REFERENCES tutores(id)
  )
`);

export default db;