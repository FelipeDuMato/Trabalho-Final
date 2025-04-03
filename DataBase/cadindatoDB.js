import conectar from "./conexao.js";
import Candidato from "../Model/modeloCadindato.js";

export default class CandidatoDB {
    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS candidato (
                numeroCandidato INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                cpf VARCHAR(14) NOT NULL,
                tituloEleitor VARCHAR(14) NOT NULL,
                nome VARCHAR(100) NOT NULL,
                endereco VARCHAR(100) NOT NULL,
                numero INT NOT NULL,
                bairro VARCHAR(50) NOT NULL,
                cidade VARCHAR(50) NOT NULL,
                uf CHAR(2) NOT NULL,
                cep VARCHAR(9) NOT NULL,
                rendaMensal DECIMAL(10, 2) NOT NULL,
                codigoPartido INT NOT NULL,
                CONSTRAINT FK_Partido FOREIGN KEY (codigoPartido) REFERENCES partido(codigo)
            )`;
            await conexao.execute(sql);
        } catch (error) {
            console.error("Erro ao criar a tabela candidato:", error);
        }
    }

    constructor() {
        this.init();
    }
    
    async gravar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `INSERT INTO candidato (cpf, tituloEleitor, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, codigoPartido) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const valores = [candidato.cpf,
                candidato.tituloEleitor,
                candidato.nome,
                candidato.endereco,
                candidato.numero,
                candidato.bairro,
                candidato.cidade,
                candidato.uf,
                candidato.cep,
                candidato.rendaMensal,
                candidato.codigoPartido
            ]
            const result = await conexao.execute(sql, valores)
            await conexao.release();
            return await result[0].insertId
        }
    }

    async atualizar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `UPDATE candidato SET cpf = ?, tituloEleitor = ?, nome = ?, endereco = ?, numero = ?, bairro = ?, cidade = ?, uf = ?, cep = ?, rendaMensal = ? WHERE numeroCandidato = ?`;
            const valores = [
                candidato.cpf,
                candidato.tituloEleitor,
                candidato.nome,
                candidato.endereco,
                candidato.numero,
                candidato.bairro,
                candidato.cidade,
                candidato.uf,
                candidato.cep,
                candidato.rendaMensal,
                candidato.numeroCandidato
            ];
            await conexao.execute(sql, valores);
            conexao.release();
        }
    }

    async excluir(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `DELETE FROM candidato WHERE numeroCandidato = ?`;
            await conexao.execute(sql, [candidato.numeroCandidato]);
            conexao.release();
        }
    }

    async listar() {
        const conexao = await conectar();
        const sql = ` SELECT * FROM candidato ORDER BY numeroCandidato`;
        const [registros, campos] = await conexao.execute(sql);
        conexao.release();
        let listaCandidatos = [];
        for (const registro of registros) {
            const candidato = new Candidato(
                registro.numeroCandidato,
                registro.cpf,
                registro.tituloEleitor,
                registro.nome,
                registro.endereco,
                registro.numero,
                registro.bairro,
                registro.cidade,
                registro.uf,
                registro.cep,
                registro.rendaMensal,
                registro.codigoPartido
            );
            listaCandidatos.push(candidato);
        }
        return listaCandidatos;
    }
}