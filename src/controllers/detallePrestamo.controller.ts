import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const obtenerDetallesPrestamo = async (_req: Request, res: Response) => {
  try {
    const detalles = await prisma.detallePrestamo.findMany({
      include: { ejemplar: true, prestamo: true },
    });
    res.json(detalles);
  } catch {
    res.status(500).json({ error: 'Error al obtener detalles de préstamo' });
  }
};
