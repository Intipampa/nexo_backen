import { Request, Response } from 'express';
import prisma from '../prisma/client';

// Obtener todos los libros
export const obtenerLibros = async (req: Request, res: Response) => {
  const { incluirInactivos } = req.query;
  try {
    const libros = await prisma.libro.findMany({
      where: incluirInactivos ? {} : { estado: true },
      include: {
        editorial: true,
        autores: { include: { autor: true } },
        generos: { include: { genero: true } },
        ejemplares: true
      },
      orderBy: { id: 'asc' }
    });
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener libros' });
  }
};

// Obtener libro por ID
export const obtenerLibroPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const libro = await prisma.libro.findUnique({
      where: { id: Number(id) },
      include: {
        editorial: true,
        autores: { include: { autor: true } },
        generos: { include: { genero: true } },
        ejemplares: true
      }
    });
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener libro' });
  }
};

// Crear libro con autores y géneros
export const crearLibro = async (req: Request, res: Response) => {
  const { titulo, anio, precio, editorialId, autores = [], generos = [] } = req.body;

  try {
    const nuevo = await prisma.libro.create({
      data: {
        titulo,
        anio: anio ? Number(anio) : null,
        precio: precio ? Number(precio) : null,
        editorialId: Number(editorialId),
        autores: {
          create: autores.map((autorId: number) => ({ autorId }))
        },
        generos: {
          create: generos.map((generoId: number) => ({ generoId }))
        }
      }
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear libro', detalle: error });
  }
};

// Editar libro y actualizar relaciones
export const editarLibro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, anio, precio, editorialId, autores = [], generos = [] } = req.body;

  try {
    const actualizado = await prisma.libro.update({
      where: { id: Number(id) },
      data: {
        titulo,
        anio,
        precio,
        editorialId,
        autores: {
          deleteMany: {},
          create: autores.map((autorId: number) => ({ autorId }))
        },
        generos: {
          deleteMany: {},
          create: generos.map((generoId: number) => ({ generoId }))
        }
      }
    });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar libro' });
  }
};

// Deshabilitar libro
export const deshabilitarLibro = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.libro.update({ where: { id: Number(id) }, data: { estado: false } });
    res.json({ mensaje: 'Libro deshabilitado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al deshabilitar libro' });
  }
};

// Habilitar libro
export const habilitarLibro = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.libro.update({ where: { id: Number(id) }, data: { estado: true } });
    res.json({ mensaje: 'Libro habilitado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al habilitar libro' });
  }
};
