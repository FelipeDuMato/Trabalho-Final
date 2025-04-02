import PartidoDB from "../DataBase/partidoDB.js";

export default class Partido {
    #codigo;
    #nome;
    #sigla;

    constructor(codigo, nome, sigla) {
        // Se o código não for fornecido, ele será gerado automaticamente
        this.#codigo = codigo;
        this.#nome = nome;
        this.#sigla = sigla;
    }
    get codigo() {
        return this.#codigo;
    }
    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }
    
    get sigla() {
        return this.#sigla;
    }
    set sigla(novaSigla) {
        this.#sigla = novaSigla;
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "sigla": this.#sigla
        };
    }

    async gravar() {
        const partDB = new PartidoDB();
        //Codigo Gerado automaticamente
        //e atribuido ao atributo codigo
        this.codigo = await partDB.gravar(this);
    }

    async alterar() {
        const partDB = new PartidoDB();
        await partDB.atualizar(this);
    }

    async excluir() {
        const partDB = new PartidoDB();
        await partDB.excluir(this);
    }

    async listar() {
        const partDB = new PartidoDB();
        return await partDB.listar();
    }
}