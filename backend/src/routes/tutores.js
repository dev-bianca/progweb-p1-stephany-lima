import { Router } from "express";
import * as tutorController from "../controllers/tutorController.js";

const router = Router();

router.get("/", tutorController.listar);
router.get("/:id", tutorController.buscar);
router.post("/", tutorController.cadastrar);
router.put("/:id", tutorController.atualizar);
router.delete("/:id", tutorController.excluir);

export default router;