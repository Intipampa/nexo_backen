import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const obtenerDeudas = async (_req: Request, res: Response) => {
  try {
    const deudas = await prisma.deuda.findMany({ include: { prestamo: true } });
    res.json(deudas);
  } catch {
    res.status(500).json({ error: 'Error al obtener deudas' });
  }
};

export const crearDeuda = async (req: Request, res: Response) => {
  const { descripcion, monto, fecha_vencimiento, prestamoId } = req.body;
  try {
    const deuda = await prisma.deuda.create({
      data: {
        descripcion,
        monto,
        fecha_vencimiento: new Date(fecha_vencimiento),
        prestamoId,
      },
    });
    res.status(201).json(deuda);
  } catch {
    res.status(500).json({ error: 'Error al crear deuda' });
  }
};
