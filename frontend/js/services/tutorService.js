import { api } from "../api.js";

function preparar(dados) {
  const tutor = {
    nome: (dados.nome ?? "").trim(),
    telefone: (dados.telefone ?? "").trim(),
    email: (dados.email ?? "").trim(),
  };

  if (!tutor.nome || !tutor.telefone || !tutor.email) {
    throw new Error("Preencha todos os campos do tutor.");
  }

  return tutor;
}

export const tutorService = {
  listar() {
    return api.get("/tutores");
  },

  criar(dados) {
    return api.post("/tutores", preparar(dados));
  },

  atualizar(id, dados) {
    return api.put(`/tutores/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/tutores/${id}`);
  },
};