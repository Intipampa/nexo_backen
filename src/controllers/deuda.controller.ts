// controllers/deudaController.ts
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getDeudas = async (req: Request, res: Response) => {
  try {
    const deudas = await prisma.deuda.findMany({
      include: {
        prestamo: {
          include: {
            usuario: true,
          },
        },
      },
      orderBy: { fecha_creado: "desc" },
    });
    res.json(deudas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las deudas" });
  }
};

export const createDeuda = async (req: Request, res: Response) => {
  try {
    const { descripcion, monto, fecha_vencimiento, prestamoId } = req.body;

    const deuda = await prisma.deuda.create({
      data: {
        descripcion,
        monto: parseFloat(monto),
        fecha_vencimiento: new Date(fecha_vencimiento),
        prestamo: { connect: { id: prestamoId } },
      },
    });

    res.json(deuda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la deuda" });
  }
};

export const deleteDeuda = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.deuda.delete({ where: { id: Number(id) } });
    res.json({ message: "Deuda eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar deuda" });
  }
};
