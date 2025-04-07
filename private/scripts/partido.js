const formPartido = document.getElementById("formPartido");

let acao = "cadastrar";

function manipularEnvio(evento) {
    if (!formPartido.checkValidity()) {
        formPartido.classList.add("was-validated");
    } else {
        if (acao === "atualizar") {
            mostrarTabelaPartidos();
        } else if (acao === "excluir") {
            mostrarTabelaPartidos();
        } else {
            enviarPartido();
            formPartido.reset();
        }
    }
    evento.preventDefault();
    evento.stopPropagation();
}

function pegarDados() {
    let codigo = null;
    if (acao === "atualizar" || acao === "excluir") {
        codigo = document.getElementById("codigo").value
    }
    const nomePartido = document.getElementById("nomePartido").value;
    const siglaPartido = document.getElementById("siglaPartido").value;

    return {
        "codigo" : codigo,
        "nome" : nomePartido,
        "sigla" : siglaPartido
    }
}

function mostrarMensagem(mensagem, tipo = "success") {
    const divMensagem = document.getElementById("mensagem");
    divMensagem.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
  ${mensagem}
</div>`;
setInterval(() =>{
    divMensagem.innerHTML = ``;
}, 5000);
}

function enviarPartido() {
    const dadosPartidos = pegarDados();
    fetch("http://localhost:3000/partidos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosPartidos)
    }).then((res) => {
        return res.json()
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
            mostrarMensagem(dadosRecebidos.mensagem, "success");
            mostrarTabelaPartidos();
        } else {
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }
    }).catch((error) => {
        mostrarMensagem(error, "danger");
    })
}

function mostrarTabelaPartidos() {
    fetch("http://localhost:3000/partidos", {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
            const partidos = dadosRecebidos.partidos;
            if (partidos.length > 0) {
                const tabelaPartidos = document.getElementById("tabelaPartidos");
                tabelaPartidos.innerHTML = "";
                const tabela = document.createElement("table");
                tabela.classList.add("table", "table-striped");
                const cabecalho = document.createElement("thead");
                const corpo = document.createElement("tbody");
                cabecalho.innerHTML = `
                <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Sigla</th>
                <th>Editar</th>
                <th>Excluir</th>
                </tr>`
                tabela.appendChild(cabecalho);
                for (let i = 0; i < partidos.length; i++) {
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                    <td>${partidos[i].codigo}</td>
                    <td>${partidos[i].nome}</td>
                    <td>${partidos[i].sigla}</td>
                    <td><button class="btn btn-warning" onclick="pegarPartido('${partidos[i].codigo}', '${partidos[i].nome}', '${partidos[i].sigla}', 'atualizar')"><i class="bi bi-pencil"></button></td>
                    <td><button class="btn btn-danger" onclick="pegarPartido('${partidos[i].codigo}', '${partidos[i].nome}', '${partidos[i].sigla}', 'excluir')"><i class="bi bi-trash"></button></td>`;
                    corpo.appendChild(linha);
                }
                tabela.appendChild(corpo);
                tabelaPartidos.appendChild(tabela);
            } else {
                mostrarMensagem("Nenhum partido encontrado.", "warning");
            }
        } else {
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }
    })
}

function pegarPartido(codigo, nome, sigla, acaoEscolhida = "atualizar") {
    acao = acaoEscolhida;
    const espacoCodigo = document.getElementById("espacoCodigo");
    espacoCodigo.classList.add('wrap-input100', 'validate-input')
    espacoCodigo.innerHTML = `<input class="input100" type="text" name="codigo" id="codigo" placeholder="Código">
						<span class="focus-input100"></span>`
    document.getElementById("codigo").value = codigo;
    document.getElementById("codigo").disabled = true;
    document.getElementById("nomePartido").value = nome;
    document.getElementById("nomePartido").focus();
    document.getElementById("siglaPartido").value = sigla;
    document.getElementById("siglaPartido").focus();

    if (acao === "atualizar") {
        document.getElementById("botaoCadastrar").disabled = true;
        document.getElementById("botaoAtualizar").disabled = false;
        document.getElementById("botaoExcluir").disabled = true;
    } else if (acao === "excluir") {
        document.getElementById("botaoCadastrar").disabled = true;
        document.getElementById("botaoAtualizar").disabled = true;
        document.getElementById("botaoExcluir").disabled = false;
    }
}

function atualizarPartido() {
    fetch("http://localhost:3000/partidos", {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(pegarDados())
    }).then((res) => {
        return res.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
            mostrarMensagem(dadosRecebidos.mensagem, "success");
            formPartido.reset();
            acao = "cadastrar"
            document.getElementById("botaoCadastrar").disabled = false;
            document.getElementById("botaoAtualizar").disabled = true;
            document.getElementById("botaoExcluir").disabled = true;
            const espacoCodigo = document.getElementById("espacoCodigo");
            espacoCodigo.classList.remove('wrap-input100', 'validate-input')
            espacoCodigo.innerHTML = ""
            document.getElementById("nomePartido").focus();
            document.getElementById("siglaPartido").focus();
            document.getElementById("nomePartido").blur();
            document.getElementById("siglaPartido").blur();
            mostrarTabelaPartidos();
        } else {
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }
    }).catch((error) => {
        mostrarMensagem(error, "danger");
    })
}

function excluirPartido() {
    fetch("http://localhost:3000/partidos", {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(pegarDados())
    }).then((res) => {
        return res.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
            mostrarMensagem(dadosRecebidos.mensagem, "success");
            formPartido.reset();
            acao = "cadastrar";
            document.getElementById("botaoCadastrar").disabled = false;
            document.getElementById("botaoAtualizar").disabled = true;
            document.getElementById("botaoExcluir").disabled = true;
            const espacoCodigo = document.getElementById("espacoCodigo");
            espacoCodigo.classList.remove('wrap-input100', 'validate-input')
            espacoCodigo.innerHTML = ""
            document.getElementById("nomePartido").focus();
            document.getElementById("siglaPartido").focus();
            document.getElementById("nomePartido").blur();
            document.getElementById("siglaPartido").blur();
            mostrarTabelaPartidos();
        } else {
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }
    }).catch((error) => {
        mostrarMensagem(error, "danger");
    })
}

formPartido.addEventListener("submit", manipularEnvio);

document.getElementById("botaoAtualizar").onclick = atualizarPartido;
document.getElementById("botaoExcluir").onclick = excluirPartido;

mostrarTabelaPartidos();