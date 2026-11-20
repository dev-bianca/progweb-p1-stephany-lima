import { API_URL } from './config.js';
// camada responsável pela comunicação HTTP com a API.
async function request(metodo, caminho, dados) {
  const opcoes = { method: metodo, headers: {} };

  if (dados !== undefined) {
    opcoes.headers['Content-Type'] = 'application/json';
    opcoes.body = JSON.stringify(dados);
  }

  let resp;

  try {
    resp = await fetch(`${API_URL}${caminho}`, opcoes);
  } catch {
    throw new Error('Não consegui falar com a API. Ela está rodando?');
  }
// status 204 significa que a resposta não tem conteúdo.
  if (resp.status === 204) return null;

  const corpo = await resp.json().catch(() => null);

//fetch não considera erros HTTP (400, 404, 500) como falha.
  if (!resp.ok) {
    throw new Error(corpo?.erro ?? `Erro ${resp.status}`);
  }

  return corpo;
}

export const api = {
  get: (caminho) => request('GET', caminho),
  post: (caminho, dados) => request('POST', caminho, dados),
  put: (caminho, dados) => request('PUT', caminho, dados),
  delete: (caminho) => request('DELETE', caminho),
};