import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const obtenerEditoriales = async (req: Request, res: Response) => {
  const { incluirInactivos } = req.query;
  try {
    const editoriales = await prisma.editorial.findMany({
      where: incluirInactivos ? {} : { estado: true },
      include: { libros: true },
      orderBy: { id: 'asc' }
    });
    res.json(editoriales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener editoriales' });
  }
};

export const obtenerEditorialPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const editorial = await prisma.editorial.findUnique({
      where: { id: Number(id) },
      include: { libros: true }
    });
    if (!editorial) return res.status(404).json({ error: 'Editorial no encontrada' });
    res.json(editorial);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener editorial' });
  }
};

export const crearEditorial = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  try {
    const nueva = await prisma.editorial.create({ data: { nombre } });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear editorial' });
  }
};

export const editarEditorial = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const actualizada = await prisma.editorial.update({
      where: { id: Number(id) },
      data
    });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar editorial' });
  }
};

export const deshabilitarEditorial = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.editorial.update({ where: { id: Number(id) }, data: { estado: false } });
    res.json({ mensaje: 'Editorial deshabilitada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al deshabilitar editorial' });
  }
};

export const habilitarEditorial = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.editorial.update({ where: { id: Number(id) }, data: { estado: true } });
    res.json({ mensaje: 'Editorial habilitada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al habilitar editorial' });
  }
};
