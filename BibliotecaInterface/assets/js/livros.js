document.addEventListener("DOMContentLoaded", () => {
  carregarBibliotecarios();
  carregarLivros();
});

const apiLivros = "http://localhost:8080/api/livros";
const apiBibliotecarios = "http://localhost:8080/api/bibliotecarios";

// Carrega bibliotecários para o select
function carregarBibliotecarios() {
  fetch(apiBibliotecarios)
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("bibliotecario");
      select.innerHTML = '<option value="">Selecione um bibliotecário</option>';
      data.forEach(biblio => {
        const option = document.createElement("option");
        option.value = biblio.id;
        option.textContent = biblio.nome;
        select.appendChild(option);
      });
    })
    .catch(() => {
      Swal.fire("Erro", "Não foi possível carregar os bibliotecários.", "error");
    });
}

// Carrega livros e adiciona na tabela
function carregarLivros() {
  fetch(apiLivros)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("tabelaLivrosCorpo");
      tbody.innerHTML = "";
      data.forEach(livro => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="border border-gray-300 px-2 py-1">${livro.id}</td>
          <td class="border border-gray-300 px-2 py-1">${livro.titulo}</td>
          <td class="border border-gray-300 px-2 py-1">${livro.genero}</td>
          <td class="border border-gray-300 px-2 py-1">${formatarData(livro.data_cadastro)}</td>
          <td class="border border-gray-300 px-2 py-1">${livro.status}</td>
          <td class="border border-gray-300 px-2 py-1">${livro.bibliotecario?.nome || "-"}</td>
          <td class="border border-gray-300 px-2 py-1 space-x-1">
            <button class="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded" onclick="editarLivro(${livro.id})">Editar</button>
            <button class="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-white" onclick="excluirLivro(${livro.id})">Excluir</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(() => {
      Swal.fire("Erro", "Não foi possível carregar os livros.", "error");
    });
}

// Formata data yyyy-mm-dd para dd/mm/yyyy
function formatarData(dataStr) {
  if (!dataStr) return "-";
  const d = new Date(dataStr);
  return d.toLocaleDateString("pt-BR");
}

// Salvar livro (POST ou PUT)
function salvarLivro(event) {
  event.preventDefault();

  const id = document.getElementById("livroId").value;
  const titulo = document.getElementById("titulo").value.trim();
  const genero = document.getElementById("genero").value.trim();
  const dataCadastro = document.getElementById("dataCadastro").value;
  const status = document.getElementById("status").value;
  const bibliotecarioId = document.getElementById("bibliotecario").value;

  if (!titulo || !genero || !dataCadastro || !status || !bibliotecarioId) {
    Swal.fire("Atenção", "Preencha todos os campos.", "warning");
    return;
  }

  const livro = {
    titulo,
    genero,
    data_cadastro: dataCadastro,
    status,
    bibliotecario: { id: parseInt(bibliotecarioId) }
  };

  const url = id ? `${apiLivros}/${id}` : apiLivros;
  const method = id ? "PUT" : "POST";

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(livro)
  })
  .then(res => {
    if (!res.ok) throw new Error("Erro ao salvar livro");
    return res.json();
  })
  .then(() => {
    Swal.fire("Sucesso", "Livro salvo com sucesso!", "success");
    resetarForm();
    carregarLivros();
  })
  .catch(() => {
    Swal.fire("Erro", "Não foi possível salvar o livro.", "error");
  });
}

// Editar livro (carregar dados no formulário)
function editarLivro(id) {
  fetch(`${apiLivros}/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Livro não encontrado");
      return res.json();
    })
    .then(livro => {
      document.getElementById("livroId").value = livro.id;
      document.getElementById("titulo").value = livro.titulo;
      document.getElementById("genero").value = livro.genero;
      document.getElementById("dataCadastro").value = livro.data_cadastro ? livro.data_cadastro.split("T")[0] : "";
      document.getElementById("status").value = livro.status;
      document.getElementById("bibliotecario").value = livro.bibliotecario?.id || "";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(() => {
      Swal.fire("Erro", "Não foi possível carregar os dados do livro.", "error");
    });
}

// Excluir livro
function excluirLivro(id) {
  Swal.fire({
    title: 'Tem certeza?',
    text: "Esta ação não poderá ser desfeita!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${apiLivros}/${id}`, { method: "DELETE" })
        .then(res => {
          if (!res.ok) throw new Error("Erro ao excluir");
          Swal.fire("Excluído!", "Livro excluído com sucesso.", "success");
          carregarLivros();
        })
        .catch(() => {
          Swal.fire("Erro", "Não foi possível excluir o livro.", "error");
        });
    }
  });
}

// Reseta o formulário para estado inicial
function resetarForm() {
  document.getElementById("formCadastroLivro").reset();
  document.getElementById("livroId").value = "";
}
