let animais = [];
let proximoId = 1;

export function listarTodos() {
  return animais;
}

export function buscarPorId(id) {
  return animais.find((animal) => animal.id === id);
}

export function buscarPorNome(nome) {
  return animais.find((animal) => animal.nome === nome);
}

export function criar(dados) {
  const novoAnimal = {
    id: proximoId++,
    ...dados,
  };

  animais.push(novoAnimal);
  return novoAnimal;
}

export function atualizar(id, dados) {
  const indice = animais.findIndex((animal) => animal.id === id);

  if (indice === -1) {
    return null;
  }

  animais[indice] = {
    ...animais[indice],
    ...dados,
  };

  return animais[indice];
}

export function remover(id) {
  const indice = animais.findIndex((animal) => animal.id === id);

  if (indice === -1) {
    return false;
  }

  animais.splice(indice, 1);
  return true;
}