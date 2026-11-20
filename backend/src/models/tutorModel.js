let tutores = [];
let proximoId = 1;

export function listarTodos() {
  return tutores;
}

export function buscarPorId(id) {
  return tutores.find((tutor) => tutor.id === id);
}

export function buscarPorEmail(email) {
  return tutores.find((tutor) => tutor.email === email);
}

export function criar(dados) {
  const novoTutor = {
    id: proximoId++,
    ...dados,
  };

  tutores.push(novoTutor);
  return novoTutor;
}

export function atualizar(id, dados) {
  const indice = tutores.findIndex((tutor) => tutor.id === id);

  if (indice === -1) {
    return null;
  }

  tutores[indice] = {
    ...tutores[indice],
    ...dados,
  };

  return tutores[indice];
}

export function remover(id) {
  const indice = tutores.findIndex((tutor) => tutor.id === id);

  if (indice === -1) {
    return false;
  }

  tutores.splice(indice, 1);
  return true;
}