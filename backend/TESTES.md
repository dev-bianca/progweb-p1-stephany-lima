# Testes da API do Pet Shop

Os testes foram realizados utilizando o Thunder Client, com o servidor executando em `http://localhost:3000`.

## Resultados dos testes

| Nº | Método | Endpoint | Descrição | Status esperado | Resultado |
|---|---|---|---|---|---|
| 1 | GET | `/` | Verificar funcionamento da API | 200 | Aprovado |
| 2 | POST | `/tutores` | Cadastrar tutor | 201 | Aprovado |
| 3 | GET | `/tutores` | Listar tutores | 200 | Aprovado |
| 4 | GET | `/tutores/1` | Buscar tutor por ID | 200 | Aprovado |
| 5 | POST | `/tutores` | Tentar cadastrar e-mail duplicado | 409 | Aprovado |
| 6 | POST | `/tutores` | Cadastrar tutor sem e-mail | 400 | Aprovado |
| 7 | POST | `/animais` | Cadastrar animal com tutor existente | 201 | Aprovado |
| 8 | POST | `/animais` | Cadastrar animal com tutor inexistente | 422 | Aprovado |
| 9 | GET | `/animais?tutorId=1` | Filtrar animais por tutor | 200 | Aprovado |
| 10 | GET | `/animais/1` | Buscar animal por ID | 200 | Aprovado |
| 11 | PUT | `/animais/1` | Atualizar animal | 200 | Aprovado |
| 12 | DELETE | `/animais/1` | Excluir animal | 204 | Aprovado |
| 13 | GET | `/animais/1` | Buscar animal excluído | 404 | Aprovado |

## Regras de negócio verificadas

- Nome, telefone e e-mail são obrigatórios para cadastrar tutores.
- Não é permitido cadastrar dois tutores com o mesmo e-mail.
- Nome, espécie e tutorId são obrigatórios para cadastrar animais.
- Um animal só pode ser cadastrado se o tutor informado existir.
- É possível filtrar os animais pelo ID do tutor.

## Conclusão

Todos os testes realizados apresentaram os resultados esperados, demonstrando o funcionamento das operações CRUD, das validações e do relacionamento entre tutores e animais.