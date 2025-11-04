import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Obtener todos los préstamos con sus relaciones básicas
export const getPrestamos = async (req: Request, res: Response): Promise<void> => {
  try {
    const prestamos = await prisma.prestamo.findMany({
      include: {
        usuario: true,
        detalles: {
          include: {
            ejemplar: {
              include: {
                libro: true,
              },
            },
          },
        },
        deuda: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    res.json(prestamos);
  } catch (error) {
    console.error('Error al obtener préstamos:', error);
    res.status(500).json({ error: 'Error al obtener préstamos' });
  }
};

// Crear un préstamo nuevo
export const createPrestamo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { usuarioId, ejemplarIds, fecha_prestamo, fecha_devolucion_esperada } = req.body;

    if (!usuarioId || !ejemplarIds?.length) {
      res.status(400).json({ error: 'Debe incluir usuario y al menos un ejemplar' });
      return;
    }

    const nuevoPrestamo = await prisma.prestamo.create({
      data: {
        usuarioId,
        fecha_prestamo: new Date(fecha_prestamo),
        fecha_devolucion_esperada: new Date(fecha_devolucion_esperada),
        detalles: {
          create: ejemplarIds.map((id: number) => ({
            ejemplar: { connect: { id } },
          })),
        },
      },
      include: {
        usuario: true,
        detalles: { include: { ejemplar: { include: { libro: true } } } },
      },
    });

    // Actualizar estado de ejemplares a "prestado"
    await prisma.ejemplar.updateMany({
      where: { id: { in: ejemplarIds } },
      data: { estadolibro: 'prestado' },
    });

    res.json(nuevoPrestamo);
  } catch (error) {
    console.error('Error al crear préstamo:', error);
    res.status(500).json({ error: 'Error al crear préstamo' });
  }
};

// Editar préstamo (solo fechas o usuario)
export const updatePrestamo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { usuarioId, fecha_prestamo, fecha_devolucion_esperada } = req.body;

    const prestamo = await prisma.prestamo.update({
      where: { id: Number(id) },
      data: {
        usuarioId,
        fecha_prestamo: new Date(fecha_prestamo),
        fecha_devolucion_esperada: new Date(fecha_devolucion_esperada),
      },
    });

    res.json(prestamo);
  } catch (error) {
    console.error('Error al actualizar préstamo:', error);
    res.status(500).json({ error: 'Error al actualizar préstamo' });
  }
};

// Eliminar préstamo (opcional: revertir estado de ejemplares)
export const deletePrestamo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Obtener ejemplares relacionados antes de eliminar
    const detalles = await prisma.detallePrestamo.findMany({
      where: { prestamoId: Number(id) },
      select: { ejemplarId: true },
    });

    await prisma.prestamo.delete({
      where: { id: Number(id) },
    });

    // Revertir ejemplares a "disponible"
    await prisma.ejemplar.updateMany({
      where: { id: { in: detalles.map((d) => d.ejemplarId) } },
      data: { estadolibro: 'disponible' },
    });

    res.json({ message: 'Préstamo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar préstamo:', error);
    res.status(500).json({ error: 'Error al eliminar préstamo' });
  }
};
