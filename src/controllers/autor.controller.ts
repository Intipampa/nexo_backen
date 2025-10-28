import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const obtenerAutores = async (req: Request, res: Response) => {
  try {
    const { incluirInactivos } = req.query;
    const autores = await prisma.autor.findMany({
      where: incluirInactivos ? {} : { estado: true },
      orderBy: { id: 'asc' },
    });
    res.json(autores);
  } catch {
    res.status(500).json({ error: 'Error al obtener autores' });
  }
};

export const obtenerAutorPorId = async (req: Request, res: Response) => {
  try {
    const autor = await prisma.autor.findUnique({ where: { id: Number(req.params.id) } });
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(autor);
  } catch {
    res.status(500).json({ error: 'Error al obtener autor' });
  }
};

export const crearAutor = async (req: Request, res: Response) => {
  try {
    const autor = await prisma.autor.create({ data: req.body });
    res.status(201).json(autor);
  } catch {
    res.status(500).json({ error: 'Error al crear autor' });
  }
};

export const editarAutor = async (req: Request, res: Response) => {
  try {
    const autor = await prisma.autor.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(autor);
  } catch {
    res.status(500).json({ error: 'Error al editar autor' });
  }
};

export const deshabilitarAutor = async (req: Request, res: Response) => {
  try {
    const autor = await prisma.autor.update({
      where: { id: Number(req.params.id) },
      data: { estado: false },
    });
    res.json({ mensaje: `Autor ${autor.nombre} deshabilitado.` });
  } catch {
    res.status(500).json({ error: 'Error al deshabilitar autor' });
  }
};

export const habilitarAutor = async (req: Request, res: Response) => {
  try {
    const autor = await prisma.autor.update({
      where: { id: Number(req.params.id) },
      data: { estado: true },
    });
    res.json({ mensaje: `Autor ${autor.nombre} habilitado.` });
  } catch {
    res.status(500).json({ error: 'Error al habilitar autor' });
  }
};
