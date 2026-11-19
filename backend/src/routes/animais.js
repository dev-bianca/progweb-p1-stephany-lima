import { Router } from "express";
import * as animalController from "../controllers/animalController.js";

const router = Router();

router.get("/", animalController.listar);
router.get("/:id", animalController.buscar);
router.post("/", animalController.cadastrar);
router.put("/:id", animalController.atualizar);
router.delete("/:id", animalController.excluir);

export default router;