# Projeto 1 — Programação Web (UEPB · 2026.2)

**Aluno(a):** Stephany Bianca Silva Lima  
**Disciplina:** Programação Web  
**Professor:** Rodrigo Alves Costa

## Sobre

Aplicação fullstack desenvolvida na disciplina de Programação Web, utilizando Node.js, Express, SQLite, Bootstrap e JavaScript puro.

O projeto tem como domínio um sistema de gerenciamento de pet shop, permitindo cadastrar e administrar tutores e animais. Ao longo das atividades, também foi desenvolvida uma API bancária independente para praticar conceitos de desenvolvimento backend, persistência de dados e integração com frontend.

## Estrutura do projeto

```text
projeto/
├── backend/                 # API do Pet Shop
├── frontend/                # Interface do Pet Shop
├── s1/                      # Atividades da Semana 1
├── s2/                      # Atividades da Semana 2
├── s3/
│   └── banco-api/           # API bancária
├── s4/
│   └── banco-frontend/      # Interface da API bancária
├── MODELAGEM.md
└── README.md
```

## Semana 1 — Programação Orientada a Objetos

Atividades práticas envolvendo os quatro pilares da Programação Orientada a Objetos (POO) em JavaScript.

## Semana 2 — Code Smells, SOLID e Modelagem

### Parte A — Identificação de Code Smells e violações SOLID

O arquivo `s2/S2_library-bad.js` contém comentários que identificam os code smells e as violações dos princípios SOLID encontrados no código de exemplo. O código original foi preservado, sem refatoração.

### Parte B — Modelagem

O arquivo `MODELAGEM.md` apresenta a modelagem conceitual de um sistema de gerenciamento de pet shop com quatro entidades: `Tutor`, `Animal`, `Servico` e `Agendamento`.

A documentação descreve os relacionamentos entre as entidades, as responsabilidades dos serviços e dos repositórios e a aplicação dos princípios SRP e DIP.

## Semana 3 — API REST com Express

Desenvolvimento de uma API bancária utilizando Node.js e Express, organizada em camadas para separar as responsabilidades da aplicação.

A API trabalha com o cadastro e o gerenciamento de clientes, utilizando controllers, services, models e routes.

## Semana 4 — Frontend e integração com API

Desenvolvimento de uma Single Page Application (SPA) para consumir a API bancária.

A interface utiliza HTML, CSS, Bootstrap e JavaScript puro, com organização do código em módulos e separação entre comunicação com a API, serviços, estado e elementos da interface.

## Semana 5 — Persistência com SQLite

Migração dos dados armazenados em memória para o banco de dados SQLite, utilizando o módulo nativo `node:sqlite` do Node.js e a classe `DatabaseSync`.

### Parte A — API bancária

- Criação e configuração do banco SQLite.
- Criação das tabelas `clientes` e `contas`.
- Utilização de chaves primárias e estrangeiras.
- Atualização dos models para executar operações SQL.
- Utilização de consultas parametrizadas.
- Preservação das regras de negócio e dos códigos HTTP da API.

### Parte B — API do Pet Shop

- Criação do banco SQLite para o Pet Shop.
- Criação das tabelas `tutores` e `animais`.
- Configuração do relacionamento entre tutores e animais.
- Atualização dos models para utilizar consultas SQL parametrizadas.
- Preservação da organização em camadas e das regras de negócio existentes.

A persistência permite que os registros permaneçam armazenados mesmo após o encerramento e a reinicialização dos servidores.

## Tecnologias e conceitos

- JavaScript
- Node.js
- Express
- SQLite (`node:sqlite`)
- HTML5 e CSS3
- Bootstrap 5
- APIs REST
- Single Page Application (SPA)
- Programação Orientada a Objetos
- Princípios SOLID
- Separação de responsabilidades
- Arquitetura em camadas
- Persistência de dados
- Git e GitHub

## Como executar o projeto

### Requisitos

- Node.js 22 ou superior.
- npm.
- Navegador atualizado.
- Visual Studio Code.
- Extensão Live Server para executar os frontends localmente.

### 1. API do Pet Shop

Abra um terminal na pasta `backend`:

```bash
cd backend
npm install
npm start
```

O servidor será iniciado em:

`http://localhost:3001`

Rotas principais:

- `GET /tutores`
- `GET /animais`

### 2. Frontend do Pet Shop

No Visual Studio Code:

1. Abra a pasta `frontend`.
2. Clique com o botão direito no arquivo `index.html`.
3. Selecione **Open with Live Server**.

O frontend será aberto no navegador e consumirá a API do Pet Shop na porta 3001.

### 3. API bancária

Abra outro terminal na raiz do projeto:

```bash
cd s3/banco-api
npm install
npm start
```

O servidor será iniciado em:

`http://localhost:3000`

### 4. Frontend bancário

No Visual Studio Code:

1. Abra a pasta `s4/banco-frontend`.
2. Clique com o botão direito no arquivo `index.html`.
3. Selecione **Open with Live Server**.

O frontend consumirá a API bancária configurada em `http://localhost:3000`.

### Observações

- As duas APIs podem ser executadas simultaneamente, pois utilizam portas diferentes.
- Os bancos SQLite são criados localmente durante a execução das aplicações.
- Os arquivos de banco de dados, dependências instaladas e arquivos de configuração local não devem ser enviados ao repositório.
- O Bootstrap é carregado por CDN, sendo necessária conexão com a internet para carregar seus arquivos.

## Autor

**Stephany Bianca Silva Lima**
Bacharelado em Ciência da Computação — UEPB
Disciplina: Programação Web — 2026.2