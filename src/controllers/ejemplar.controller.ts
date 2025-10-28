import { Request, Response } from "express";
import prisma from "../prisma/client";

// Obtener todos los ejemplares
export const obtenerEjemplares = async (req: Request, res: Response) => {
  try {
    const { incluirInactivos } = req.query;
    const ejemplares = await prisma.ejemplar.findMany({
      where: incluirInactivos ? {} : { estado: true },
      include: { libro: true },
      orderBy: { id: "asc" },
    });
    res.json(ejemplares);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ejemplares" });
  }
};

// Obtener ejemplar por ID
export const obtenerEjemplarPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ejemplar = await prisma.ejemplar.findUnique({
      where: { id: Number(id) },
      include: { libro: true },
    });
    if (!ejemplar) return res.status(404).json({ error: "Ejemplar no encontrado" });
    res.json(ejemplar);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ejemplar" });
  }
};

// Crear ejemplar
export const crearEjemplar = async (req: Request, res: Response) => {
  const { libroId, estadolibro } = req.body;
  try {
    const nuevo = await prisma.ejemplar.create({
      data: { libroId, estadolibro },
    });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear ejemplar" });
  }
};

// Editar ejemplar
export const editarEjemplar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const actualizado = await prisma.ejemplar.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al editar ejemplar" });
  }
};

// Deshabilitar ejemplar
export const deshabilitarEjemplar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.ejemplar.update({
      where: { id: Number(id) },
      data: { estado: false },
    });
    res.json({ mensaje: "Ejemplar deshabilitado" });
  } catch (error) {
    res.status(500).json({ error: "Error al deshabilitar ejemplar" });
  }
};

// Habilitar ejemplar
export const habilitarEjemplar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.ejemplar.update({
      where: { id: Number(id) },
      data: { estado: true },
    });
    res.json({ mensaje: "Ejemplar habilitado" });
  } catch (error) {
    res.status(500).json({ error: "Error al habilitar ejemplar" });
  }
};
