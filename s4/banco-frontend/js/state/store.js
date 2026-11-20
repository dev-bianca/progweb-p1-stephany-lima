export function criarStore(inicial) {
  let estado = { ...inicial };
  const assinantes = [];

  return {
    get() {
      return estado;
    },

    set(parcial) {
      estado = { ...estado, ...parcial };
      assinantes.forEach((fn) => fn(estado));
    },

    assinar(fn) {
      assinantes.push(fn);
      fn(estado);
    },
  };
}