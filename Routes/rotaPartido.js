import { Router } from "express";
import PartidoCtrl from "../Controller/partidoCtrl.js"

const rotaPartido = Router();
const partCtrl = new PartidoCtrl();

rotaPartido.get("/", partCtrl.consultar);
rotaPartido.post("/", partCtrl.gravar);
rotaPartido.put("/", partCtrl.alterar);
rotaPartido.patch("/", partCtrl.alterar);
rotaPartido.delete("/", partCtrl.excluir);

export default rotaPartido;