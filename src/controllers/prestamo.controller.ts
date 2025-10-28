import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear préstamo general (sin ejemplares aún)
export const crearPrestamo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { usuarioId, fecha_devolucion_esperada } = req.body;

    const prestamo = await prisma.prestamo.create({
      data: {
        usuarioId,
        fecha_prestamo: new Date(),
        fecha_devolucion_esperada
      }
    });

    res.json(prestamo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Añadir ejemplar al préstamo
export const prestarEjemplar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prestamoId, ejemplarId } = req.body;

    await prisma.ejemplar.update({
      where: { id: ejemplarId },
      data: { estadolibro: "prestado" }
    });

    const detalle = await prisma.detallePrestamo.create({
      data: { prestamoId, ejemplarId }
    });

    res.json(detalle);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Devolver ejemplar
export const devolverEjemplar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ejemplarId } = req.body;

    await prisma.ejemplar.update({
      where: { id: ejemplarId },
      data: { estadolibro: "disponible" }
    });

    res.json({ msg: "Ejemplar devuelto correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
