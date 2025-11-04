

import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Catálogo 1: Países ---
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

// --- Catálogo 2: Sexos ---
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

// 📚 --- Catálogo 3: Géneros Literarios (NUEVO) ---
export const getGenerosLiterarios = async (req: Request, res: Response) => {
    try {
        const generos = await prisma.generoLiterario.findMany({
            // Es buena práctica filtrar por estado si la tabla lo tiene
            where: { estado: true }, 
            select: { id: true, nombre: true },
            orderBy: { nombre: 'asc' }
        });
        res.json(generos); 
    } catch (error) {
        console.error('Error al obtener géneros literarios:', error);
        res.status(500).json({ error: 'Error del servidor.' });
    }
};

// 🏢 --- Catálogo 4: Editoriales (NUEVO) ---
export const getEditoriales = async (req: Request, res: Response) => {
    try {
        const editoriales = await prisma.editorial.findMany({
            // Filtrar solo editoriales activas
            where: { estado: true }, 
            select: { id: true, nombre: true },
            orderBy: { nombre: 'asc' }
        });
        res.json(editoriales); 
    } catch (error) {
        console.error('Error al obtener editoriales:', error);
        res.status(500).json({ error: 'Error del servidor.' });
    }
};