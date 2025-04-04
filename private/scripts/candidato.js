//Função para mascarar campos
function mascararCpf(campo) {
    campo.value = campo.value.replace(/\D/g, '');
    campo.value = campo.value.replace(/(\d{3})(\d)/, '$1.$2');
    campo.value = campo.value.replace(/(\d{3})(\d)/, '$1.$2');
    campo.value = campo.value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

function mascararTituloEleitor(campo) {
    campo.value = campo.value.replace(/\D/g, '');
    campo.value = campo.value.replace(/(\d{4})(\d)/, '$1 $2');
    campo.value = campo.value.replace(/(\d{4})(\d)/, '$1 $2');
    campo.value = campo.value.replace(/(\d{4})(\d{1,2})$/, '$1 $2');
}

function mascararCep(campo) {
    campo.value = campo.value.replace(/\D/g, '');
    campo.value = campo.value.replace(/(\d{5})(\d)/, '$1-$2');
}
//--------------------------------------------------------------------------

const formCandidato = document.getElementById('formCandidato');

let acao = "cadastrar";

function manipularEnvio(evento) {
    if (!formCandidato.checkValidity()) {
        formCandidato.classList.add('was-validated');
    } else {
        if (acao === "atualizar") {
            mostrarTabelaCandidatos();
        }
        else if (acao === "excluir") {
            mostrarTabelaCandidatos();
        } else {
            enviarCandidato();
            formCandidato.reset();
            mostrarTabelaCandidatos();
        }
    }
    evento.preventDefault();
    evento.stopPropagation();
}


function pegarDados() {
    let codigo = null;
    if (acao === "atualizar" || acao === "excluir") {
        codigo = document.getElementById('codigo').value;
    }
    const cpf = document.getElementById('cpf').value;
    const tituloEleitor = document.getElementById('tituloEleitor').value;
    const nome = document.getElementById('nome').value;
    const renda = document.getElementById('renda').value;
    const endereco = document.getElementById('endereco').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const uf = document.getElementById('uf').value;
    const cep = document.getElementById('cep').value;
    const nomePartido = document.getElementById('nomePartido').value;
    const siglaPartido = document.getElementById('siglaPartido').value;

    return {
        "numeroCandidato" : codigo,
        "cpf": cpf,
        "tituloEleitor": tituloEleitor,
        "nome": nome,
        "rendaMensal": renda,
        "endereco": endereco,
        "numero": numero,
        "bairro": bairro,
        "cidade": cidade,
        "uf": uf,
        "cep": cep,
        "nomePartido": nomePartido,
        "siglaPartido": siglaPartido
    }
}

function enviarCandidato() {
    const dadosCandidato = pegarDados();
    fetch("http://localhost:3000/candidatos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosCandidato)
    }).then((res) =>{
        return res.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
            mostrarMensagem(dadosRecebidos.mensagem, "success");
            mostrarTabelaCandidatos();
        } else {
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }
    }).catch((error) =>{
        mostrarMensagem(error, "danger");
    })
}

function mostrarMensagem(mensagem, tipo = "success") {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
  ${mensagem}
</div>`;
setInterval(() => {
    divMensagem.innerHTML = '';
}, 5000);
}

function mostrarTabelaCandidatos() {
    fetch("http://localhost:3000/candidatos", {
        method: "GET"
    }).then((res) => {
        return res.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
            const candidatos = dadosRecebidos.candidatos;
            if (candidatos.length > 0) {
                const tabelaCandidatos = document.getElementById('espacoTabela');
                tabelaCandidatos.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados
                const tabela = document.createElement('table');
                tabela.classList.add('table', 'table-striped');
                const cabecalho = document.createElement('thead');
                const corpo = document.createElement('tbody');
                cabecalho.innerHTML = `
                <tr>
                <th>Código</th>
                <th>CPF</th>
                <th>Título de Eleitor</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Número</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>CEP</th>
                <th>Renda Mensal</th>
                <th>Código do Partido</th>
                <th>Editar</th>
                <th>Excluir</th>
                </tr>
                `;
                tabela.appendChild(cabecalho);
                for (let i = 0; i < candidatos.length; i++) {
                    const linha = document.createElement('tr');
                    linha.innerHTML = `
                    <td>${candidatos[i].numeroCandidato}</td>
                    <td>${candidatos[i].cpf}</td>
                    <td>${candidatos[i].tituloEleitor}</td>
                    <td>${candidatos[i].nome}</td>
                    <td>${candidatos[i].endereco}</td>
                    <td>${candidatos[i].numero}</td>
                    <td>${candidatos[i].bairro}</td>
                    <td>${candidatos[i].cidade}</td>
                    <td>${candidatos[i].uf}</td>
                    <td>${candidatos[i].cep}</td>
                    <td>${candidatos[i].rendaMensal}</td>
                    <td>${candidatos[i].codigoPartido}</td>
                    <td>
                    <button class="btn btn-warning" onclick="pegarCandidato(
                    '${candidatos[i].numeroCandidato}',
                    '${candidatos[i].cpf}',
                    '${candidatos[i].tituloEleitor}',
                    '${candidatos[i].nome}',
                    '${candidatos[i].endereco}',
                    '${candidatos[i].numero}',
                    '${candidatos[i].bairro}',
                    '${candidatos[i].cidade}',
                    '${candidatos[i].uf}',
                    '${candidatos[i].cep}',
                    '${candidatos[i].rendaMensal}',
                    '${candidatos[i].nomePartido}',
                    '${candidatos[i].siglaPartido}',
                    'atualizar')"><i class="bi bi-pencil"></i></button>
                    </td>
                    <td>
                    <button class="btn btn-danger" onclick="pegarCandidato(
                    '${candidatos[i].numeroCandidato}',
                    '${candidatos[i].cpf}',
                    '${candidatos[i].tituloEleitor}',
                    '${candidatos[i].nome}',
                    '${candidatos[i].endereco}',
                    '${candidatos[i].numero}',
                    '${candidatos[i].bairro}',
                    '${candidatos[i].cidade}',
                    '${candidatos[i].uf}',
                    '${candidatos[i].cep}',
                    '${candidatos[i].rendaMensal}',
                    '${candidatos[i].nomePartido}',
                    '${candidatos[i].siglaPartido}',
                    'excluir')"><i class="bi bi-trash"></i></button>
                    `;
                    corpo.appendChild(linha);
                }
                tabela.appendChild(corpo);
                tabelaCandidatos.appendChild(tabela);
            } else {
                mostrarMensagem("Nenhum candidato encontrado", "warning");
            }
        } else {
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }
    })
}

function pegarCandidato(codigo, cpf, tituloEleitor, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, nomePartido, siglaPartido, acaoEscolhida = "atualizar") {
    acao = acaoEscolhida;
    const espacoCodigo = document.getElementById('espacoInputCod');
    espacoCodigo.innerHTML = `				<div style="margin-left: 25%;" class="wrap-input100 validate-input" data-validate = "Coloque o Código">
					<input placeholder="Codigo" class="input100" type="text" name="codigo" id="codigo">
					<span class="focus-input100"></span>
				</div>`;
    document.getElementById('codigo').value = codigo;
    document.getElementById('codigo').disabled = true;
    document.getElementById('cpf').value = cpf;
    document.getElementById('cpf').focus();
    document.getElementById('tituloEleitor').value = tituloEleitor;
    document.getElementById('tituloEleitor').focus();
    document.getElementById('nome').value = nome;
    document.getElementById('nome').focus();
    document.getElementById('endereco').value = endereco;
    document.getElementById('endereco').focus();
    document.getElementById('numero').value = numero;
    document.getElementById('numero').focus();
    document.getElementById('bairro').value = bairro;
    document.getElementById('bairro').focus();
    document.getElementById('cidade').value = cidade;
    document.getElementById('cidade').focus();
    document.getElementById('uf').value = uf;
    document.getElementById('uf').focus();
    document.getElementById('cep').value = cep;
    document.getElementById('cep').focus();
    document.getElementById('renda').value = rendaMensal;
    document.getElementById('renda').focus();
    document.getElementById('nomePartido').value = nomePartido;
    document.getElementById('nomePartido').focus();
    document.getElementById('siglaPartido').value = siglaPartido;
    document.getElementById('siglaPartido').focus();
    document.getElementById('nomePartido').disabled = true;
    document.getElementById('siglaPartido').disabled = true;

    if (acao === "atualizar") {
        document.getElementById("botaoCadastrar").disabled = true;
        document.getElementById("botaoEditar").disabled = false;
        document.getElementById("botaoExcluir").disabled = true;
    } else if (acao === "excluir") {
        document.getElementById("botaoCadastrar").disabled = true;
        document.getElementById("botaoEditar").disabled = true;
        document.getElementById("botaoExcluir").disabled = false;
    }
    mostrarTabelaCandidatos();
}

function atualizarCandidato() {
    fetch("http://localhost:3000/candidatos", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pegarDados())
    }).then((res) => {
        return res.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
            mostrarMensagem(dadosRecebidos.mensagem, "success");
            formCandidato.reset();
            acao = "cadastrar";
            document.getElementById("botaoCadastrar").disabled = false;
            document.getElementById("botaoEditar").disabled = true;
            document.getElementById("botaoExcluir").disabled = true;
            const espacoCodigo = document.getElementById('espacoInputCod');
            espacoCodigo.innerHTML= ""
            document.getElementById('cpf').focus();
            document.getElementById('cpf').blur();
            document.getElementById('tituloEleitor').focus();
            document.getElementById('tituloEleitor').blur();
            document.getElementById('nome').focus();
            document.getElementById('nome').blur();
            document.getElementById('endereco').focus();
            document.getElementById('endereco').blur();
            document.getElementById('numero').focus();
            document.getElementById('numero').blur();
            document.getElementById('bairro').focus();
            document.getElementById('bairro').blur();
            document.getElementById('cidade').focus();
            document.getElementById('cidade').blur();
            document.getElementById('uf').focus();
            document.getElementById('uf').blur();
            document.getElementById('cep').focus();
            document.getElementById('cep').blur();
            document.getElementById('renda').focus();
            document.getElementById('renda').blur();
            document.getElementById('nomePartido').focus();
            document.getElementById('nomePartido').blur();
            document.getElementById('siglaPartido').focus();
            document.getElementById('siglaPartido').blur();
            mostrarTabelaCandidatos();
        } else {
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }
    })
    .catch((error) => {
        mostrarMensagem(error, "danger");
    })
}

function excluirCandidato() {
    fetch("http://localhost:3000/candidatos", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pegarDados())
    }).then((res) => {
        return res.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
            mostrarMensagem(dadosRecebidos.mensagem, "success");
            formCandidato.reset();
            acao = "cadastrar";
            document.getElementById("botaoCadastrar").disabled = false;
            document.getElementById("botaoEditar").disabled = true;
            document.getElementById("botaoExcluir").disabled = true;
            const espacoCodigo = document.getElementById('espacoInputCod');
            espacoCodigo.innerHTML= ""
            document.getElementById('cpf').focus();
            document.getElementById('cpf').blur();
            document.getElementById('tituloEleitor').focus();
            document.getElementById('tituloEleitor').blur();
            document.getElementById('nome').focus();
            document.getElementById('nome').blur();
            document.getElementById('endereco').focus();
            document.getElementById('endereco').blur();
            document.getElementById('numero').focus();
            document.getElementById('numero').blur();
            document.getElementById('bairro').focus();
            document.getElementById('bairro').blur();
            document.getElementById('cidade').focus();
            document.getElementById('cidade').blur();
            document.getElementById('uf').focus();
            document.getElementById('uf').blur();
            document.getElementById('cep').focus();
            document.getElementById('cep').blur();
            document.getElementById('renda').focus();
            document.getElementById('renda').blur();
            document.getElementById('nomePartido').focus();
            document.getElementById('nomePartido').blur();
            document.getElementById('siglaPartido').focus();
            document.getElementById('siglaPartido').blur();
            mostrarTabelaCandidatos();
        } else {
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }
    })
    .catch((error) => {
        mostrarMensagem(error, "danger");
    })
}

formCandidato.addEventListener('submit', manipularEnvio);

document.getElementById('botaoEditar').onclick = atualizarCandidato;
document.getElementById('botaoExcluir').onclick = excluirCandidato;

mostrarTabelaCandidatos();