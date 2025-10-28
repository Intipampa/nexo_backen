import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const obtenerPaises = async (_req: Request, res: Response) => {
  try {
    const paises = await prisma.pais.findMany();
    res.json(paises);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener países' });
  }
};
