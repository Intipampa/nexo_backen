import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerLibros = async (req: Request, res: Response) => {
  
  try {
    const libros = await prisma.libro.findMany({
  
      include: {
        editorial: true,
        autores: {
          include: { autor: true },
        },
        generos: {
          include: { genero: true },
        },
      },
      orderBy: { id: 'asc' },
    });

    const librosConRelaciones = libros.map((libro) => ({
      id: libro.id,
      titulo: libro.titulo,
      anio: libro.anio,
      precio: libro.precio,
      imagen: libro.imagen,
      estado: libro.estado,
      editorial: libro.editorial.nombre,
      autores: libro.autores.map((a) => `${a.autor.nombre} ${a.autor.apellido}`),
      generos: libro.generos.map((g) => g.genero.nombre),
    }));

    res.json(librosConRelaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los libros', error });
  }
};

export const crearLibro = async (req: Request, res: Response) => {

  try {
    const { titulo, anio, precio, imagen, editorialId, autoresIds, generosIds } = req.body;

    const nuevoLibro = await prisma.libro.create({
      data: {
        titulo,
        anio,
        precio,
        imagen,
        editorialId,
        autores: {
          create: autoresIds.map((autorId: number) => ({ autorId })),
        },
        generos: {
          create: generosIds.map((generoId: number) => ({ generoId })),
        },
      },
    });

    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el libro', error });
  }
};

export const editarLibro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, anio, precio, imagen, editorialId, autoresIds, generosIds, estado } = req.body;

    await prisma.autorLibro.deleteMany({ where: { libroId: Number(id) } });
    await prisma.generoLibro.deleteMany({ where: { libroId: Number(id) } });

    const libroActualizado = await prisma.libro.update({
      where: { id: Number(id) },
      data: {
        titulo,
        anio,
        precio,
        imagen,
        editorialId,
        estado,
        autores: {
          create: autoresIds.map((autorId: number) => ({ autorId })),
        },
        generos: {
          create: generosIds.map((generoId: number) => ({ generoId })),
        },
      },
    });

    res.json(libroActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar el libro', error });
  }
};

export const cambiarEstadoLibro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const libro = await prisma.libro.findUnique({ where: { id: Number(id) } });

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    const libroActualizado = await prisma.libro.update({
      where: { id: Number(id) },
      data: { estado: !libro.estado },
    });

    res.json(libroActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cambiar el estado del libro', error });
  }
};
