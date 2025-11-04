import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// 🟢 Obtener todos los ejemplares
export const getEjemplares = async (req: Request, res: Response): Promise<void> => {
  try {
    const ejemplares = await prisma.ejemplar.findMany({
      include: {
        libro: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
    res.json(ejemplares);
  } catch (error) {
    console.error('Error al obtener ejemplares:', error);
    res.status(500).json({ error: 'Error al obtener ejemplares' });
  }
};

// 🟢 Crear un nuevo ejemplar
export const createEjemplar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { libroId, estadolibro } = req.body;

    if (!libroId) {
      res.status(400).json({ error: 'Debe especificar un libro' });
      return;
    }

    const nuevoEjemplar = await prisma.ejemplar.create({
      data: {
        libroId,
        estadolibro: estadolibro || 'disponible',
      },
      include: {
        libro: true,
      },
    });

    res.json(nuevoEjemplar);
  } catch (error) {
    console.error('Error al crear ejemplar:', error);
    res.status(500).json({ error: 'Error al crear ejemplar' });
  }
};

// 🟢 Actualizar ejemplar
export const updateEjemplar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { libroId, estadolibro, estado } = req.body;

    const ejemplar = await prisma.ejemplar.update({
      where: { id: Number(id) },
      data: {
        libroId,
        estadolibro,
        estado,
      },
      include: {
        libro: true,
      },
    });

    res.json(ejemplar);
  } catch (error) {
    console.error('Error al actualizar ejemplar:', error);
    res.status(500).json({ error: 'Error al actualizar ejemplar' });
  }
};

// 🟢 Eliminar ejemplar (borrado lógico)
export const deleteEjemplar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const ejemplar = await prisma.ejemplar.update({
      where: { id: Number(id) },
      data: { estado: false },
    });

    res.json({ message: 'Ejemplar eliminado correctamente', ejemplar });
  } catch (error) {
    console.error('Error al eliminar ejemplar:', error);
    res.status(500).json({ error: 'Error al eliminar ejemplar' });
  }
};
