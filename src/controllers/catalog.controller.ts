// src/controllers/catalog.controller.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPaises = async (req: Request, res: Response) => {
    try {
        const paises = await prisma.pais.findMany({
            select: { id: true, nombre: true },
            orderBy: { nombre: 'asc' }
        });
        res.json(paises);
    } catch (error) {
        console.error('Error al obtener países:', error);
        res.status(500).json({ error: 'Error del servidor.' });
    }
};

export const getSexos = async (req: Request, res: Response) => {
    try {
        const sexos = await prisma.sexo.findMany({
            select: { id: true, nombre: true },
            orderBy: { nombre: 'asc' }
        });
        res.json(sexos); 
    } catch (error) {
        console.error('Error al obtener sexos:', error);
        res.status(500).json({ error: 'Error del servidor.' });
    }
};