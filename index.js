import express from "express";
import rotaCandidato from "./Routes/rotaCandidato.js";

const host = "localhost";
const porta = 3000;

const app = express();

app.use(express.json());

app.use("/candidatos", rotaCandidato);

app.listen(porta, host, () => {
    console.log(`Servidor rodando em: http://${host}:${porta}`)
})