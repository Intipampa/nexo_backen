import { Router } from "express";
import {
  obtenerEjemplares,
  obtenerEjemplarPorId,
  crearEjemplar,
  editarEjemplar,
  deshabilitarEjemplar,
  habilitarEjemplar,
} from "../controllers/ejemplar.controller";

const router = Router();

router.get("/", obtenerEjemplares);
router.get("/:id", obtenerEjemplarPorId);
router.post("/", crearEjemplar);
router.put("/:id", editarEjemplar);
router.put("/:id/deshabilitar", deshabilitarEjemplar);
router.put("/:id/habilitar", habilitarEjemplar);

export default router;
