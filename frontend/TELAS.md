# Telas do Projeto 1 (S4)

Front: `npx http-server -p 5500 -c-1` em `frontend/`  
API: `npm run dev` em `backend/`

## Estados das listas

| Lista | Estado | Como provocar | O que aparece |
|---|---|---|---|
| Tutores | Carregando | DevTools → Network → Slow 4G → F5 | Mensagem "Carregando tutores..." |
| Tutores | Vazio | Reiniciar a API sem tutores cadastrados | "Nenhum tutor cadastrado." |
| Tutores | Erro | Ctrl+C no terminal da API → F5 | "Não foi possível carregar os tutores." |
| Tutores | Sucesso | Cadastrar um tutor | Tabela com os dados do tutor |
| Animais | Carregando | DevTools → Network → Slow 4G → F5 | Mensagem "Carregando animais..." |
| Animais | Vazio | Reiniciar a API sem animais cadastrados | "Nenhum animal cadastrado." |
| Animais | Erro | Ctrl+C no terminal da API → F5 | "Não foi possível carregar os animais." |
| Animais | Sucesso | Cadastrar um animal e selecionar um tutor | Tabela com os dados do animal e o nome do tutor |

## Erro de regra do backend

| Lista | Regra | Como provocar | Resultado esperado |
|---|---|---|---|
| Tutores | Não permitir e-mail duplicado | Cadastrar dois tutores utilizando o mesmo e-mail | API responde com status 409 e o frontend apresenta a mensagem de erro enviada pelo backend |

## Camadas

- **api:** `js/api.js` — comunicação HTTP com a API.
- **services:** `js/services/` — preparação e validação dos dados de tutores e animais.
- **state:** `js/state/store.js` — armazenamento do estado da tela.
- **ui:** `js/ui/` — atualização da interface e apresentação dos dados.
- **main.js:** integração entre as camadas.

## Observações

- O cadastro de animais depende da existência de um tutor. O formulário permite selecionar um tutor cadastrado.
- O sistema impede a exclusão de um tutor que ainda possui animais vinculados.
- Os dados da API são armazenados em memória e são perdidos quando o servidor é reiniciado.
- Os dados apresentados nas tabelas são inseridos como texto usando `textContent`, evitando interpretação de conteúdo HTML fornecido pelo usuário.