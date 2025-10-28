import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const obtenerGeneros = async (_req: Request, res: Response) => {
  try {
    const generos = await prisma.generoLiterario.findMany({ orderBy: { id: 'asc' } });
    res.json(generos);
  } catch {
    res.status(500).json({ error: 'Error al obtener géneros' });
  }
};

export const crearGenero = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  try {
    const genero = await prisma.generoLiterario.create({ data: { nombre } });
    res.status(201).json(genero);
  } catch {
    res.status(500).json({ error: 'Error al crear género literario' });
  }
};

export const editarGenero = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const genero = await prisma.generoLiterario.update({
      where: { id: Number(id) },
      data: { nombre },
    });
    res.json(genero);
  } catch {
    res.status(500).json({ error: 'Error al editar género' });
  }
};
