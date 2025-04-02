export default class Candidato {
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

    constructor(cpf, tituloEleitor, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal) {
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

    toJSON() {
        return {
            "cpf": this.#cpf,
            "tituloEleitor": this.#tituloEleitor,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "numero": this.#numero,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "uf": this.#uf,
            "cep": this.#cep,
            "rendaMensal": this.#rendaMensal
        };
    }
}