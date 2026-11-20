const elemento = (id) => document.getElementById(id);

function criarCelula(valor) {
  const td = document.createElement("td");
  td.textContent = valor ?? "";
  return td;
}

function criarBotao(texto, classe, acao) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = texto;
  botao.className = `btn btn-sm ${classe} me-1`;
  botao.addEventListener("click", acao);
  return botao;
}

function mostrarEstado(id, mensagem, erro = false) {
  const area = elemento(id);
  area.textContent = mensagem;
  area.className = erro
    ? "text-center text-danger py-3"
    : "text-center text-muted py-3";
}

export const petshopView = {
  mostrarTutores(tutores, acoes) {
    const corpo = elemento("listaTutores");
    const tabela = elemento("tabelaTutores");

    corpo.replaceChildren();

    if (!tutores.length) {
      tabela.classList.add("d-none");
      mostrarEstado("estadoTutores", "Nenhum tutor cadastrado.");
      return;
    }

    tutores.forEach((tutor) => {
      const linha = document.createElement("tr");

      linha.append(
        criarCelula(tutor.nome),
        criarCelula(tutor.telefone),
        criarCelula(tutor.email)
      );

      const acoesTd = document.createElement("td");

      acoesTd.append(
        criarBotao("Editar", "btn-warning", () => acoes.editar(tutor)),
        criarBotao("Excluir", "btn-danger", () => acoes.excluir(tutor))
      );

      linha.append(acoesTd);
      corpo.append(linha);
    });

    elemento("estadoTutores").textContent = "";
    tabela.classList.remove("d-none");
  },

  mostrarAnimais(animais, tutores, acoes) {
    const corpo = elemento("listaAnimais");
    const tabela = elemento("tabelaAnimais");

    corpo.replaceChildren();

    const select = elemento("animalTutor");
    const tutorSelecionado = select.value;

    select.replaceChildren();

    const opcaoInicial = document.createElement("option");
    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione um tutor";
    select.append(opcaoInicial);

    tutores.forEach((tutor) => {
      const opcao = document.createElement("option");
      opcao.value = tutor.id;
      opcao.textContent = tutor.nome;
      select.append(opcao);
    });

    select.value = tutorSelecionado;

    if (!animais.length) {
      tabela.classList.add("d-none");
      mostrarEstado("estadoAnimais", "Nenhum animal cadastrado.");
      return;
    }

    animais.forEach((animal) => {
      const tutor = tutores.find(
        (item) => item.id === animal.tutorId
      );

      const linha = document.createElement("tr");

      linha.append(
        criarCelula(animal.nome),
        criarCelula(animal.especie),
        criarCelula(animal.raca),
        criarCelula(tutor?.nome ?? "Tutor não encontrado")
      );

      const acoesTd = document.createElement("td");

      acoesTd.append(
        criarBotao("Editar", "btn-warning", () => acoes.editar(animal)),
        criarBotao("Excluir", "btn-danger", () => acoes.excluir(animal))
      );

      linha.append(acoesTd);
      corpo.append(linha);
    });

    elemento("estadoAnimais").textContent = "";
    tabela.classList.remove("d-none");
  },

  preencherTutor(tutor) {
    elemento("tutorId").value = tutor.id;
    elemento("tutorNome").value = tutor.nome;
    elemento("tutorTelefone").value = tutor.telefone;
    elemento("tutorEmail").value = tutor.email;
    elemento("btnSalvarTutor").textContent = "Salvar alterações";
    elemento("btnCancelarTutor").classList.remove("d-none");
  },

  limparTutor() {
    elemento("formTutor").reset();
    elemento("tutorId").value = "";
    elemento("btnSalvarTutor").textContent = "Cadastrar tutor";
    elemento("btnCancelarTutor").classList.add("d-none");
  },

  preencherAnimal(animal) {
    elemento("animalId").value = animal.id;
    elemento("animalNome").value = animal.nome;
    elemento("animalEspecie").value = animal.especie;
    elemento("animalRaca").value = animal.raca ?? "";
    elemento("animalNascimento").value = animal.dataNascimento ?? "";
    elemento("animalTutor").value = animal.tutorId;
    elemento("btnSalvarAnimal").textContent = "Salvar alterações";
    elemento("btnCancelarAnimal").classList.remove("d-none");
  },

  limparAnimal() {
    elemento("formAnimal").reset();
    elemento("animalId").value = "";
    elemento("btnSalvarAnimal").textContent = "Cadastrar animal";
    elemento("btnCancelarAnimal").classList.add("d-none");
  },

  estadoTutores(mensagem, erro = false) {
    elemento("tabelaTutores").classList.add("d-none");
    mostrarEstado("estadoTutores", mensagem, erro);
  },

  estadoAnimais(mensagem, erro = false) {
    elemento("tabelaAnimais").classList.add("d-none");
    mostrarEstado("estadoAnimais", mensagem, erro);
  },
};