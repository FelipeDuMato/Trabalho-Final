import CandidatoDB from "../DataBase/cadindatoDB.js";

export default class Candidato {
    #numeroCandidato;
    #cpf;
    #tituloEleitor;
    #nome;
    #endereco;
    #numero;
    #bairro;
    #cidade;
    #uf;
    #cep;
    #rendaMensal;
    #codigoPartido;
    #nomePartido;
    #siglaPartido;

    constructor(numeroCandidato, cpf, tituloEleitor, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, codigoPartido, nomePartido = '', siglaPartido = '') {
        this.#numeroCandidato = numeroCandidato;
        this.#cpf = cpf;
        this.#tituloEleitor = tituloEleitor;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
        this.#rendaMensal = rendaMensal;
        this.#codigoPartido = codigoPartido;
        this.#nomePartido = nomePartido;
        this.#siglaPartido = siglaPartido;
    }

    get numeroCandidato() {
        return this.#numeroCandidato;
    }
    set numeroCandidato(novoNumero) {
        this.#numeroCandidato = novoNumero;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }
    
    get tituloEleitor() {
        return this.#tituloEleitor;
    }
    set tituloEleitor(novoTitulo) {
        this.#tituloEleitor = novoTitulo;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }
    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get numero() {
        return this.#numero;
    }
    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    get bairro() {
        return this.#bairro;
    }
    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get cidade() {
        return this.#cidade;
    }
    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get uf() {
        return this.#uf;
    }
    set uf(novoUf) {
        this.#uf = novoUf;
    }

    get cep() {
        return this.#cep;
    }
    set cep(novoCep) {
        this.#cep = novoCep;
    }

    get rendaMensal() {
        return this.#rendaMensal;
    }
    set rendaMensal(novaRenda) {
        this.#rendaMensal = novaRenda;
    }

    get codigoPartido() {
        return this.#codigoPartido;
    }
    set codigoPartido(novoCodigo) {
        this.#codigoPartido = novoCodigo;
    }

    set nomePartido(novoNome) {
        this.#nomePartido = novoNome;
    }
    get nomePartido() {
        return this.#nomePartido;
    }

    set siglaPartido(novaSigla) {
        this.#siglaPartido = novaSigla;
    }
    get siglaPartido() {
        return this.#siglaPartido;
    }

    toJSON() {
        return {
            "numeroCandidato": this.#numeroCandidato,
            "cpf": this.#cpf,
            "tituloEleitor": this.#tituloEleitor,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "numero": this.#numero,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "uf": this.#uf,
            "cep": this.#cep,
            "rendaMensal": this.#rendaMensal,
            "codigoPartido": this.#codigoPartido,
            "nomePartido": this.#nomePartido,
            "siglaPartido": this.#siglaPartido
        };
    }

    async gravar() {
        const candiDB = new CandidatoDB();
        this.numeroCandidato = await candiDB.gravar(this);
    }

    async atualizar() {
        const candiDB = new CandidatoDB();
        await candiDB.atualizar(this)
    }

    async excluir() {
        const candiDB = new CandidatoDB();
        await candiDB.excluir(this)
    }

    async listar() {
        const candiDB = new CandidatoDB();
        return await candiDB.listar(this)
    }
}