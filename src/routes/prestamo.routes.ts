import { Router } from "express";
import { crearPrestamo, prestarEjemplar, devolverEjemplar } from "../controllers/prestamo.controller";

const router = Router();

router.post("/", crearPrestamo);               // Crea el préstamo
router.post("/agregar-ejemplar", prestarEjemplar);  // Añade ejemplar
router.patch("/devolver-ejemplar", devolverEjemplar); // Devuelve ejemplar

export default router;
