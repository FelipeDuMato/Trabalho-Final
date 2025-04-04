import Candidato from "../Model/modeloCadindato.js"
import ParidoDB from "../DataBase/partidoDB.js"

export default class CandidatoCtrl {
    
    async gravar(req, res){
        if (req.method === "POST" && req.is("application/json")) {
            const dados = req.body;
            const cpf = dados.cpf;
            const tituloEleitor = dados.tituloEleitor
            const nome = dados.nome;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;
            const rendaMensal = dados.rendaMensal;
            const nomePartido = dados.nomePartido;
            const siglaPartido = dados.siglaPartido;

            if (cpf && tituloEleitor && nome && endereco && numero && bairro && cidade && uf && cep && rendaMensal && nomePartido && siglaPartido) {
                const partiDB = new ParidoDB();
                const candidato = new Candidato(
                    0,
                    cpf, 
                    tituloEleitor, 
                    nome, 
                    endereco,
                    numero,
                    bairro,
                    cidade,
                    uf,
                    cep,
                    rendaMensal,
                    await partiDB.nomeSigla(nomePartido, siglaPartido)
                )
                candidato.gravar().then(() => {
                    res.status(201).json(
                        {
                            "status" : true,
                            "mensagem" : "Candidato gravado com sucesso!"
                        }
                    )
                }).catch((error) => {
                    res.status(500).json(
                        {
                            "status" : false,
                            "mensagem" : "Erro com o banco de dados! " + error
                        }
                    )
                })
            } else {
                res.status(400).json(
                    {
                        "status" : false,
                        "mensagem" : "Todos os campos devem ser informados!"
                    }
                )
            }
        } else {
            res.status(400).json(
                {
                    "status" : false,
                    "mensagem" : "Requisição inválida!"
                }
            )
        }
    }

    alterar(req, res){
        if (req.method === "PUT" || req.method === "PATCH" && req.is("application/json")) {
            const dados = req.body;
            const numeroCandidato = dados.numeroCandidato;
            const cpf = dados.cpf;
            const tituloEleitor = dados.tituloEleitor
            const nome = dados.nome;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;
            const rendaMensal = dados.rendaMensal;

            if (numeroCandidato && cpf && tituloEleitor && nome && endereco && numero && bairro && cidade && uf && cep && rendaMensal) {
                const candidato = new Candidato(
                    numeroCandidato,
                    cpf,
                    tituloEleitor,
                    nome,
                    endereco,
                    numero,
                    bairro,
                    cidade,
                    uf,
                    cep,
                    rendaMensal
                )

                candidato.atualizar().then(() => {
                    res.status(200).json(
                        {
                            "status" : true,
                            "mensagem" : "Candidato alterado com sucesso!"
                        }
                    )
                }).catch((error) => {
                    res.status(500).json(
                        {
                            "status" : false,
                            "mensagem" : "Erro com o banco de dados! " + error
                        }
                    )
                })
            } else {
                res.status(400).json(
                    {
                        "status" : false,
                        "mensagem" : "Todos os campos devem ser informados!"
                    }
                )
            }
        } else {
            res.status(400).json(
                {
                    "status" : false,
                    "mensagem" : "Requisição inválida!"
                }
            )
        }
    }

    excluir(req, res){
        if (req.method === "DELETE" && req.is("application/json")) {
            const dados = req.body;
            const numeroCandidato = dados.numeroCandidato

            if (numeroCandidato) {
                const candidato = new Candidato(numeroCandidato)
                candidato.excluir().then(() =>{
                    res.status(200).json(
                        {
                            "status" : true,
                            "mensagem" : "Candidato excluído com sucesso!"
                        }
                    )
                }).catch((error) => {
                    res.status(500).json(
                        {
                            "status" : false,
                            "mensagem" : "Erro com o banco de dados! " + error
                        }
                    )
                })
            } else {
                res.status(400).json(
                    {
                        "status" : false,
                        "mensagem" : "Todos os campos devem ser informados!"
                    }
                )
            }
        } else {
            res.status(400).json(
                {
                    "status" : false,
                    "mensagem" : "Requisição inválida"
                }
            )
        }
    }

    consultar(req, res){
        if (req.method === "GET") {
            const candidato = new Candidato();
            candidato.listar().then((listaCandidatos) => {
                res.status(200).json(
                    {
                        "status" : true,
                        "candidatos" : listaCandidatos
                    }
                )
            }).catch((error) =>{
                res.status(500).json(
                    {
                        "status" : false,
                        "mensagem" : "Erro com o banco de dados! " + error
                    }
                )
            })
        } else {
            res.status(400).json(
                {
                    "status" : false,
                    "mensagem" : "Requisição inválida!"
                }
            )
        }
    }
}