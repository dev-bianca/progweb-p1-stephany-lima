import { tutorService } from "./services/tutorService.js";
import { animalService } from "./services/animalService.js";
import { petshopView } from "./ui/petshopView.js";
import { mostrarAviso, limparAviso } from "./ui/aviso.js";

let tutores = [];
let animais = [];

async function carregarDados() {
  petshopView.estadoTutores("Carregando tutores...");
  petshopView.estadoAnimais("Carregando animais...");

  try {
    const [listaTutores, listaAnimais] = await Promise.all([
      tutorService.listar(),
      animalService.listar(),
    ]);

    tutores = listaTutores;
    animais = listaAnimais;

    atualizarInterface();
  } catch (erro) {
    petshopView.estadoTutores("Não foi possível carregar os tutores.", true);
    petshopView.estadoAnimais("Não foi possível carregar os animais.", true);

    mostrarAviso(erro.message, "danger");
  }
}

function atualizarInterface() {
  petshopView.mostrarTutores(tutores, {
    editar: editarTutor,
    excluir: excluirTutor,
  });

  petshopView.mostrarAnimais(animais, tutores, {
    editar: editarAnimal,
    excluir: excluirAnimal,
  });
}

// Cadastro e edição de tutores
document.getElementById("formTutor").addEventListener("submit", async (evento) => {
  evento.preventDefault();
  limparAviso();

  const id = document.getElementById("tutorId").value;

  const dados = {
    nome: document.getElementById("tutorNome").value,
    telefone: document.getElementById("tutorTelefone").value,
    email: document.getElementById("tutorEmail").value,
  };

  try {
    if (id) {
      await tutorService.atualizar(id, dados);
      mostrarAviso("Tutor atualizado com sucesso!", "success");
    } else {
      await tutorService.criar(dados);
      mostrarAviso("Tutor cadastrado com sucesso!", "success");
    }

    petshopView.limparTutor();
    await carregarDados();
  } catch (erro) {
    mostrarAviso(erro.message, "danger");
  }
});

function editarTutor(tutor) {
  petshopView.preencherTutor(tutor);
  document.getElementById("formTutor").scrollIntoView({ behavior: "smooth" });
}

async function excluirTutor(tutor) {
  const possuiAnimais = animais.some(
    (animal) => animal.tutorId === tutor.id
  );

  if (possuiAnimais) {
    mostrarAviso(
      "Não é possível excluir este tutor enquanto ele possuir animais cadastrados.",
      "danger"
    );
    return;
  }

  if (!confirm(`Deseja excluir o tutor ${tutor.nome}?`)) return;

  try {
    await tutorService.remover(tutor.id);
    mostrarAviso("Tutor excluído com sucesso!", "success");
    await carregarDados();
  } catch (erro) {
    mostrarAviso(erro.message, "danger");
  }
}

// Cadastro e edição de animais
document.getElementById("formAnimal").addEventListener("submit", async (evento) => {
  evento.preventDefault();
  limparAviso();

  const id = document.getElementById("animalId").value;

  const dados = {
    nome: document.getElementById("animalNome").value,
    especie: document.getElementById("animalEspecie").value,
    raca: document.getElementById("animalRaca").value,
    dataNascimento: document.getElementById("animalNascimento").value,
    tutorId: document.getElementById("animalTutor").value,
  };

  try {
    if (id) {
      await animalService.atualizar(id, dados);
      mostrarAviso("Animal atualizado com sucesso!", "success");
    } else {
      await animalService.criar(dados);
      mostrarAviso("Animal cadastrado com sucesso!", "success");
    }

    petshopView.limparAnimal();
    await carregarDados();
  } catch (erro) {
    mostrarAviso(erro.message, "danger");
  }
});

function editarAnimal(animal) {
  petshopView.preencherAnimal(animal);
  document.getElementById("formAnimal").scrollIntoView({ behavior: "smooth" });
}

async function excluirAnimal(animal) {
  if (!confirm(`Deseja excluir o animal ${animal.nome}?`)) return;

  try {
    await animalService.remover(animal.id);
    mostrarAviso("Animal excluído com sucesso!", "success");
    await carregarDados();
  } catch (erro) {
    mostrarAviso(erro.message, "danger");
  }
}

// Botões para cancelar edição
document.getElementById("btnCancelarTutor").addEventListener("click", () => {
  petshopView.limparTutor();
  limparAviso();
});

document.getElementById("btnCancelarAnimal").addEventListener("click", () => {
  petshopView.limparAnimal();
  limparAviso();
});

// Inicialização
carregarDados();