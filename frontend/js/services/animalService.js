import { api } from "../api.js";

function preparar(dados) {
  const animal = {
    nome: (dados.nome ?? "").trim(),
    especie: (dados.especie ?? "").trim(),
    raca: (dados.raca ?? "").trim(),
    dataNascimento: dados.dataNascimento ?? "",
    tutorId: Number(dados.tutorId),
  };

  if (!animal.nome || !animal.especie || !animal.tutorId) {
    throw new Error("Preencha o nome, a espécie e selecione um tutor.");
  }

  return animal;
}

export const animalService = {
  listar() {
    return api.get("/animais");
  },

  criar(dados) {
    return api.post("/animais", preparar(dados));
  },

  atualizar(id, dados) {
    return api.put(`/animais/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/animais/${id}`);
  },
};