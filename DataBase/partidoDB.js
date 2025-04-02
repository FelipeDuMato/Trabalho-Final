import conectar from './conexao.js';
import Partido from '../Model/cadastro-partido.js';

export default class PartidoDB {
    async init() {
        try {
        const conexao = await conectar();
        const sql = `CREATE TABLE IF NOT EXISTS partido (
            codigo INTEGER PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(60) NOT NULL,
            sigla VARCHAR(4) NOT NULL
        );`
        await conexao.execute(sql);
        }catch (error) {
            console.error('Erro ao criar a tabela partido:', error);
        }
    }
    
    constructor() {
        this.init();
    }

    async gravar(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = 'INSERT INTO partido (nome, sigla) VALUES (?, ?)';
            const valores = [partido.nome, partido.sigla];
            const result = await conexao.execute(sql, valores);
            await conexao.release();
            return await result[0].insertId;
        }
    }

    async atualizar(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = 'UPDATE partido SET nome = ?, sigla = ? WHERE codigo = ?';
            const valores = [partido.nome, partido.sigla, partido.codigo];
            await conexao.execute(sql, valores);
            await conexao.release();
        }
    }

    async excluir(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = 'DELETE FROM partido WHERE codigo = ?';
            await conexao.execute(sql, [partido.codigo]);
            await conexao.release();
        }
    }

    async listar() {
        const conexao = await conectar();
        const sql = 'SELECT * FROM partido ORDER BY codigo';
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaPartidos = [];
        for (const registro of registros) {
            const partido = new CadastroPartido(registro.codigo, registro.nome, registro.sigla);
            listaPartidos.push(partido);
        }
        return listaPartidos;
    }
};