document.addEventListener("DOMContentLoaded", () => {
  carregarBibliotecarios();
  carregarLivros();

  document.getElementById("formCadastro").addEventListener("submit", salvarLivro);
  document.getElementById("btnCancelar").addEventListener("click", resetarFormulario);
});

function carregarBibliotecarios() {
  fetch("http://localhost:8080/api/bibliotecarios")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("idBibliotecario");
      select.innerHTML = '<option value="">Selecione um bibliotecário</option>';
      data.forEach(biblio => {
        select.innerHTML += `<option value="${biblio.id}">${biblio.nome}</option>`;
      });
    })
    .catch(() => {
      Swal.fire('Erro', 'Não foi possível carregar os bibliotecários', 'error');
    });
}

function carregarLivros() {
  fetch("http://localhost:8080/api/livros")
    .then(res => res.json())
    .then(data => addLinhasLivros(data))
    .catch(() => {
      Swal.fire('Erro', 'Não foi possível carregar os livros', 'error');
    });
}

function addLinhasLivros(livros) {
  const tabela = document.getElementById("tabelaCorpo");
  tabela.innerHTML = "";
  livros.forEach(livro => {
    tabela.innerHTML += `
      <tr>
        <td class="border border-gray-300 px-4 py-2">${livro.id || "-"}</td>
        <td class="border border-gray-300 px-4 py-2">${livro.titulo}</td>
        <td class="border border-gray-300 px-4 py-2">${livro.genero}</td>
        <td class="border border-gray-300 px-4 py-2">${new Date(livro.dataCadastro).toLocaleDateString()}</td>
        <td class="border border-gray-300 px-4 py-2">${livro.status}</td>
        <td class="border border-gray-300 px-4 py-2">${livro.bibliotecario?.nome || "-"}</td>
        <td class="border border-gray-300 px-4 py-2">
          <button class="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onclick="editarLivro(${livro.id})">Editar</button>
          <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deletarLivro(${livro.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function salvarLivro(event) {
  event.preventDefault();

  const id = document.getElementById("livroId").value;
  const titulo = document.getElementById("titulo").value.trim();
  const genero = document.getElementById("genero").value.trim();
  const dataCadastro = document.getElementById("dataCadastro").value;
  const status = document.getElementById("status").value;
  const idBibliotecario = document.getElementById("idBibliotecario").value;

  if (!titulo || !genero || !dataCadastro || !status || !idBibliotecario) {
    Swal.fire('Atenção', 'Preencha todos os campos', 'warning');
    return;
  }

  const livro = {
    titulo,
    genero,
    dataCadastro,
    status,
    bibliotecario: { id: Number(idBibliotecario) }
  };

  const url = id ? `http://localhost:8080/api/livros/${id}` : "http://localhost:8080/api/livros";
  const method = id ? "PUT" : "POST";

  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(livro),
  })
  .then(res => {
    if (!res.ok) throw new Error("Erro na API");
    return res.json();
  })
  .then(() => {
    Swal.fire('Sucesso', `Livro ${id ? 'atualizado' : 'cadastrado'} com sucesso!`, 'success');
    carregarLivros();
    resetarFormulario();
  })
  .catch(() => {
    Swal.fire('Erro', 'Não foi possível salvar o livro', 'error');
  });
}

function editarLivro(id) {
  fetch(`http://localhost:8080/api/livros/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Livro não encontrado");
      return res.json();
    })
    .then(livro => {
      document.getElementById("livroId").value = livro.id;
      document.getElementById("titulo").value = livro.titulo;
      document.getElementById("genero").value = livro.genero;
      document.getElementById("dataCadastro").value = livro.dataCadastro.split("T")[0];
      document.getElementById("status").value = livro.status;
      document.getElementById("idBibliotecario").value = livro.bibliotecario?.id || "";
    })
    .catch(() => {
      Swal.fire('Erro', 'Não foi possível carregar o livro para edição', 'error');
    });
}

function deletarLivro(id) {
  Swal.fire({
    title: 'Confirma exclusão?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:8080/api/livros/${id}`, {
        method: 'DELETE',
      })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao deletar");
        Swal.fire('Excluído', 'Livro excluído com sucesso', 'success');
        carregarLivros();
      })
      .catch(() => {
        Swal.fire('Erro', 'Não foi possível excluir o livro', 'error');
      });
    }
  });
}

function resetarFormulario() {
  document.getElementById("formCadastro").reset();
  document.getElementById("livroId").value = "";
}
