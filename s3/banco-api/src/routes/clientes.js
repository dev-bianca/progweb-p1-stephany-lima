
import { Router } from "express";
import * as clienteController from "../controllers/clienteController.js";

const router = Router();

router.get("/", clienteController.listar);
router.get("/:id", clienteController.buscar);
router.post("/", clienteController.cadastrar);
router.put("/:id", clienteController.atualizar);
router.delete("/:id", clienteController.excluir);

export default router;
