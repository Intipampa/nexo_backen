import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const obtenerComentarios = async (_req: Request, res: Response) => {
  try {
    const comentarios = await prisma.comentario.findMany({
      include: { usuario: true, libro: true },
    });
    res.json(comentarios);
  } catch {
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};

export const crearComentario = async (req: Request, res: Response) => {
  const { descripcion, puntuacion, usuarioId, libroId } = req.body;
  try {
    const comentario = await prisma.comentario.create({
      data: { descripcion, puntuacion, usuarioId, libroId },
    });
    res.status(201).json(comentario);
  } catch {
    res.status(500).json({ error: 'Error al crear comentario' });
  }
};
