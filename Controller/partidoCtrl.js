import Partido from "../Model/modeloPartido.js";

export default class PartidoCtrl {
    
    gravar(req, res) {
        if (req.method === "POST" && req.is("application/json")) {
            const dados = req.body;
            const nome = dados.nome;
            const sigla = dados.sigla;

            if (nome && sigla) {
                const partido = new Partido(0, nome, sigla);
                partido.gravar().then(() => {
                    res.status(201).json(
                        {
                            "status" : true,
                            "mensagem" : "Partido gravado com sucesso!"
                        }
                    );
                }).catch((error) => {
                    res.status(500).json(
                        {
                            "status" : false,
                            "mensagem" : "Erro com o banco de dados! " + error
                        }
                    );
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

    alterar(req, res) {
        if (req.method === "PUT" || req.method === "PATCH" && req.is("application/json")) {
            const dados = req.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const sigla = dados.sigla;

            if (codigo && nome && sigla) {
                const partido = new Partido(codigo, nome, sigla);
                partido.alterar().then(() => {
                    res.status(200).json(
                        {
                            "status" : true,
                            "mensagem" : "Partido alterado com sucesso!"
                        }
                    );
                }).catch((error) => {
                    res.status(500).json(
                        {
                            "status" : false,
                            "mensagem" : "Erro com o banco de dados! " + error
                        }
                    );
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

    excluir(req, res) {
        if (req.method ==="DELETE" && req.is("application/json")) {
            const dados = req.body;
            const codigo = dados.codigo;

            if (codigo) {
                const partido = new Partido(codigo);
                partido.excluir().then(() => {
                    res.status(200).json(
                        {
                            "status" : true,
                            "mensagem" : "Partido excluído com sucesso!"
                        }
                    );
                }).catch((error) => {
                    res.status(500).json(
                        {
                            "status" : false,
                            "mensagem" : "Erro com o banco de dados! " + error
                        }
                    );
                })
            } else {
                res.status(400).json(
                    {
                        "status" : false,
                        "mensagem" : "Todos os campos devem ser informados!"
                    }
                )
            }
        }
        else {
            res.status(400).json(
                {
                    "status" : false,
                    "mensagem" : "Requisição inválida!"
                }
            )
        }
    }

    consultar(req, res) {
        if (req.method === "GET") {
            const partido = new Partido();
            partido.listar().then((listaPartidos) => {
                res.status(200).json(
                    {
                        "status" : true,
                        "partidos" : listaPartidos
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
                    "mensagem" : "Requisição inválida!"
                }
            )
        }
    }
}