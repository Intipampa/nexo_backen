import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const obtenerSexos = async (_req: Request, res: Response) => {
  try {
    const sexos = await prisma.sexo.findMany();
    res.json(sexos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener sexos' });
  }
};
